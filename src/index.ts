/**
 * DeepSeek account balance + usage check, host half.
 *
 * Registers a `GET /balance` route on the web server that resolves the DeepSeek
 * API key through the credentials seam (`.credentials.yaml` / environment) and
 * proxies the account balance from DeepSeek's `/user/balance` endpoint. The key
 * never leaves the host: the browser only receives the derived balance view.
 *
 * When a platform `DEEPSEEK_USER_TOKEN` is configured (the `userToken` stored in
 * localStorage after signing in to platform.deepseek.com), the same route also
 * aggregates DeepSeek's private dashboard usage endpoints — `/api/v0/usage/amount`
 * and `/api/v0/usage/cost` — into today / this-week / this-month cost and token
 * totals. Those endpoints authenticate with the platform token, never the API key,
 * and are undocumented, so their shape may change without notice; a failure there
 * degrades to the balance-only view rather than failing the route.
 *
 * The plugin also registers the `balance-check` settings namespace so the web
 * plugin-configuration surface can render a "余额显示" card whose base-URL field
 * edits this plugin's configuration and whose key fields write the two credential
 * references through the credentials domain.
 *
 * The route accepts a `?usage=0` query to serve a lightweight mode used by the
 * configuration card: masked credentials only, no network calls — opening the
 * card must not trigger the platform usage aggregation.
 * @module @ticoguo/dsh-balance-check
 */
import type { Context } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import type {} from '@deepseek-ai/dsh-host-webserver'
import { credentialRef } from '@deepseek-ai/dsh-credentials'
import { launchEnvironmentOf } from '@deepseek-ai/dsh-launch-environment'
import { installSettingsSection, settingsNamespace } from '@deepseek-ai/dsh-settings'

/** Cordis plugin name used by loader diagnostics. */
export const name = 'balance-check'

/** Required service: the HTTP route registry. */
export const inject = ['webServer']

/** Credential reference carrying the DeepSeek API key. */
const API_KEY_ENV = 'DEEPSEEK_API_KEY'

/**
 * Credential references carrying the DeepSeek platform session token. Unlike the
 * API key this is the web dashboard's `userToken`, not an `sk-` secret. Both
 * spellings are accepted: `DEEPSEEK_USER_TOKEN` first, then the ecosystem alias
 * `DEEPSEEK_PLATFORM_TOKEN`.
 */
const USER_TOKEN_ENV = 'DEEPSEEK_USER_TOKEN'
const PLATFORM_TOKEN_ENV = 'DEEPSEEK_PLATFORM_TOKEN'

/** Balance endpoint base; a custom DEEPSEEK_BASE_URL may override it (trailing `/v1` stripped). */
const DEFAULT_BASE_URL = 'https://api.deepseek.com'

/** DeepSeek platform dashboard base for the private usage endpoints. */
const PLATFORM_BASE_URL = 'https://platform.deepseek.com'

/** Platform auth failure codes (same envelope codes used by the dashboard). */
const PLATFORM_AUTH_CODES = new Set([40002, 40003])

/** Timeout for every outbound DeepSeek call; a hung endpoint must not stall the route forever. */
const REQUEST_TIMEOUT_MS = 10_000

/**
 * Plugin configuration. Every field is optional; `baseURL` is also exposed to
 * the plugin-configuration surface through the `balance-check` settings
 * namespace, where it outranks the `DEEPSEEK_BASE_URL` environment variable.
 */
export interface Config {
  /** DeepSeek API base URL; empty inherits `DEEPSEEK_BASE_URL`, then the default. */
  baseURL?: string
  /** DeepSeek platform recharge page; empty uses the client default (`platform.deepseek.com/top_up`). */
  rechargeURL?: string
}

/** Schemastery schema resolving this plugin's configuration. */
export const Config: z<Config> = z.object({
  baseURL: z.string(),
  rechargeURL: z.string(),
})

/** Settings namespace carrying this plugin's configurable fields. */
export const BALANCE_CHECK_SETTINGS_NAMESPACE = settingsNamespace('balance-check')

/** One currency bucket from the DeepSeek balance payload. */
export interface BalanceInfo {
  currency: string
  total_balance: string
  granted_balance: string
  topped_up_balance: string
}

/** Aggregated cost + token totals for the current day / week / month. */
export interface UsageInfo {
  /** Currency code of the cost figures (e.g. `CNY`). */
  currency: string
  today_cost: number
  week_cost: number
  month_cost: number
  today_tokens: number
  week_tokens: number
  month_tokens: number
}

/** One model's aggregated tokens / cost / request count for the current month. */
export interface ModelUsageInfo {
  /** Model name reported by the platform (e.g. `deepseek-chat`). */
  model: string
  /** Token count, summed over the current month. */
  tokens: number
  /** Cost, summed over the current month. */
  cost: number
  /** Request count, summed over the current month. */
  requests: number
}

/** Masked view of the configured credentials, for the configuration card. */
export interface ConfiguredCredentials {
  /** Masked API key, or the empty string when none is configured. */
  apiKey: string
  /** Masked platform token, or the empty string when none is configured. */
  userToken: string
}

/** The JSON body this route returns to the browser. */
export type BalanceResponse =
  | {
      ok: true
      is_available: boolean
      balance?: BalanceInfo
      usage?: UsageInfo
      /** Per-model month breakdown, sorted by token count descending. */
      models?: ModelUsageInfo[]
      /** Masked configured credentials (empty string per field when unset). */
      configured: ConfiguredCredentials
      /** Present when detailed usage could not be produced (no token / failed). */
      usage_note?: string
    }
  | { ok: false; error: string }

/** Resolve the balance-query base URL (settings first, then env, then the default). */
function balanceBaseURL(ctx: Context, config: Config): string {
  const fromConfig = config.baseURL
  if (fromConfig !== undefined && fromConfig.length > 0) {
    return fromConfig.replace(/\/+$/, '').replace(/\/v1$/, '')
  }
  const override = launchEnvironmentOf(ctx).get('DEEPSEEK_BASE_URL')?.value
  if (override !== undefined && override.length > 0) {
    return override.replace(/\/+$/, '').replace(/\/v1$/, '')
  }
  return DEFAULT_BASE_URL
}

/** Resolve one credential reference: credentials seam first, ambient environment second. */
async function resolveSecret(ctx: Context, envName: string): Promise<string | undefined> {
  const ref = credentialRef(envName)
  const credentials = ctx.get('credentials')
  if (credentials !== undefined) {
    const resolved = await credentials.resolve(ref)
    if (resolved !== undefined && resolved.value.length > 0) return resolved.value
  }
  return launchEnvironmentOf(ctx).get(ref)?.value
}

/** Resolve the platform session token once: `DEEPSEEK_USER_TOKEN`, then the ecosystem alias. */
async function resolvePlatformToken(ctx: Context): Promise<string | undefined> {
  const userToken = await resolveSecret(ctx, USER_TOKEN_ENV)
  if (userToken !== undefined && userToken.length > 0) return userToken
  return resolveSecret(ctx, PLATFORM_TOKEN_ENV)
}

/** Parse a numeric string defensively; a missing/invalid value reads as zero. */
function toNumber(value: string | undefined): number {
  if (value === undefined) return 0
  const parsed = Number(value.trim())
  return Number.isFinite(parsed) ? parsed : 0
}

/** Round to four decimals (DeepSeek cost amounts carry up to four places). */
function round4(value: number): number {
  return Math.round((Math.max(0, value) + Number.EPSILON) * 10000) / 10000
}

/** Mask a secret for display: keep a short prefix + suffix, hide the middle. */
function maskSecret(value: string | undefined): string {
  if (value === undefined || value.length === 0) return ''
  if (value.length <= 10) return '****'
  return `${value.slice(0, 5)}****${value.slice(-4)}`
}

/** One balance fetch outcome: either the parsed view or a failure message. */
interface BalanceFetchResult {
  is_available: boolean
  balance?: BalanceInfo
  error?: string
}

/** GET the DeepSeek `/user/balance` endpoint with a timeout. */
async function fetchBalance(url: string, apiKey: string): Promise<BalanceFetchResult> {
  let response: Response
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
  } catch (error) {
    return {
      is_available: false,
      error: `无法连接 DeepSeek 接口：${error instanceof Error ? error.message : String(error)}`,
    }
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    const detail = body.length > 0 ? `：${body.slice(0, 200)}` : ''
    return { is_available: false, error: `DeepSeek 接口返回 ${response.status}${detail}` }
  }

  const data = (await response.json()) as {
    is_available?: boolean
    balance_infos?: BalanceInfo[]
  }
  return { is_available: data.is_available ?? false, balance: data.balance_infos?.[0] }
}

/** Query the DeepSeek account balance and project it into a browser-safe view. */
async function queryBalance(ctx: Context, config: Config): Promise<BalanceResponse> {
  const apiKey = await resolveSecret(ctx, API_KEY_ENV)
  if (apiKey === undefined || apiKey.length === 0) {
    return {
      ok: false,
      error: '未配置 DeepSeek API Key：请在 设置 → 插件 → 插件配置 → 余额显示 中填写，或设置 DEEPSEEK_API_KEY 环境变量',
    }
  }

  const url = `${balanceBaseURL(ctx, config)}/user/balance`
  // Resolve the platform token exactly once per request; it feeds both the
  // usage aggregation and the masked view returned to the browser.
  const platformToken = await resolvePlatformToken(ctx)

  // Balance and usage are independent — run them concurrently. Detailed usage
  // stays best-effort: a missing token or a platform failure must never turn a
  // healthy balance read into an error (queryUsage swallows its own failures).
  const [balanceResult, usageResult] = await Promise.all([
    fetchBalance(url, apiKey),
    queryUsage(ctx, new Date(), platformToken),
  ])

  if (balanceResult.error !== undefined) {
    return { ok: false, error: balanceResult.error }
  }

  return {
    ok: true,
    is_available: balanceResult.is_available,
    ...(balanceResult.balance === undefined ? {} : { balance: balanceResult.balance }),
    ...(usageResult.usage === undefined ? {} : { usage: usageResult.usage }),
    ...(usageResult.models === undefined ? {} : { models: usageResult.models }),
    configured: {
      apiKey: maskSecret(apiKey),
      userToken: maskSecret(platformToken),
    },
    ...(usageResult.note === undefined ? {} : { usage_note: usageResult.note }),
  }
}

/** Masked credentials only — the configuration card's lightweight read, no network. */
async function queryConfiguredOnly(ctx: Context): Promise<BalanceResponse> {
  const apiKey = await resolveSecret(ctx, API_KEY_ENV)
  const platformToken = await resolvePlatformToken(ctx)
  return {
    ok: true,
    is_available: false,
    configured: {
      apiKey: maskSecret(apiKey),
      userToken: maskSecret(platformToken),
    },
  }
}

// ── usage aggregation (platform dashboard endpoints) ──────────────────────────

/** One token/cost bucket under a model. */
interface UsageItem {
  type?: string
  amount?: string
}

/** Per-model usage buckets (token counts for amount, cost figures for cost). */
interface ModelUsage {
  model?: string
  usage?: UsageItem[]
}

/** One day of per-model buckets. */
interface DayUsage {
  date?: string
  data?: ModelUsage[]
}

/** `biz_data` of the `/usage/amount` response. */
interface AmountBizData {
  total?: ModelUsage[]
  days?: DayUsage[]
}

/** One `biz_data` element of the `/usage/cost` response. */
interface CostBizData {
  total?: ModelUsage[]
  days?: DayUsage[]
  currency?: string
}

/** Envelope shared by both platform usage endpoints. */
interface PlatformResponse<T> {
  code?: number
  msg?: string
  data?: { biz_code?: number; biz_msg?: string; biz_data?: T }
}

/**
 * UTC `yyyy-MM-dd` for a date. The platform's usage endpoints key their daily
 * buckets by UTC date, so "today" must be the UTC date — the server's local
 * zone (e.g. UTC+8) would otherwise read a bucket the platform has not filled.
 */
function dateString(date: Date): string {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** UTC start of the week containing `date` (Monday). */
function startOfWeek(date: Date): Date {
  const result = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
  const mondayOffset = (result.getUTCDay() + 6) % 7
  result.setUTCDate(result.getUTCDate() - mondayOffset)
  return result
}

/** UTC start of the month containing `date`. */
function startOfMonth(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
}

/** `{ month, year }` set covering the current week + current month (one or two entries), in UTC. */
function monthsNeeded(now: Date): Array<{ month: number; year: number }> {
  const current = { month: now.getUTCMonth() + 1, year: now.getUTCFullYear() }
  const weekStart = startOfWeek(now)
  const previous = { month: weekStart.getUTCMonth() + 1, year: weekStart.getUTCFullYear() }
  if (previous.year === current.year && previous.month === current.month) return [current]
  return [previous, current]
}

/** Reject a non-zero platform envelope, translating auth codes into a clear message. */
function assertPlatformOk(envelope: PlatformResponse<unknown>): void {
  if (envelope.code !== undefined && envelope.code !== 0) {
    throw new Error(PLATFORM_AUTH_CODES.has(envelope.code)
      ? '平台登录态已失效，请重新获取 DEEPSEEK_USER_TOKEN'
      : `用量接口返回 code ${envelope.code}`)
  }
  const bizCode = envelope.data?.biz_code
  if (bizCode !== undefined && bizCode !== 0) {
    throw new Error(PLATFORM_AUTH_CODES.has(bizCode)
      ? '平台登录态已失效，请重新获取 DEEPSEEK_USER_TOKEN'
      : `用量接口返回 biz_code ${bizCode}`)
  }
}

/** GET one platform endpoint with the bearer token. */
async function platformGet(
  token: string,
  path: string,
  month: number,
  year: number,
): Promise<unknown> {
  const url = new URL(path, PLATFORM_BASE_URL)
  url.searchParams.set('month', String(month))
  url.searchParams.set('year', String(year))
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'x-app-version': '1.0.0',
      Origin: 'https://platform.deepseek.com',
      Referer: 'https://platform.deepseek.com/usage',
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })
  if (!response.ok) {
    throw new Error(`用量接口返回 HTTP ${response.status}`)
  }
  return await response.json()
}

/** One day folded to its token and cost totals. */
interface DailyTotals {
  tokens: number
  cost: number
}

/** Sum token buckets (skipping the `REQUEST` counter) from amount day entries. */
function foldAmounts(days: DayUsage[] | undefined, map: Map<string, DailyTotals>): void {
  for (const day of days ?? []) {
    if (day.date === undefined) continue
    let entry = map.get(day.date)
    if (entry === undefined) {
      entry = { tokens: 0, cost: 0 }
      map.set(day.date, entry)
    }
    for (const model of day.data ?? []) {
      for (const item of model.usage ?? []) {
        if ((item.type ?? '').toUpperCase() === 'REQUEST') continue
        entry.tokens += toNumber(item.amount)
      }
    }
  }
}

/** Sum cost buckets (skipping the `REQUEST` counter) from cost day entries. */
function foldCosts(days: DayUsage[] | undefined, map: Map<string, DailyTotals>): void {
  for (const day of days ?? []) {
    if (day.date === undefined) continue
    let entry = map.get(day.date)
    if (entry === undefined) {
      entry = { tokens: 0, cost: 0 }
      map.set(day.date, entry)
    }
    for (const model of day.data ?? []) {
      for (const item of model.usage ?? []) {
        if ((item.type ?? '').toUpperCase() === 'REQUEST') continue
        entry.cost += toNumber(item.amount)
      }
    }
  }
}

/** Sum daily totals over the inclusive `[start, end]` date range. */
function sumRange(map: Map<string, DailyTotals>, start: Date, end: Date): DailyTotals {
  let tokens = 0
  let cost = 0
  const last = dateString(end)
  const cursor = new Date(start)
  for (let guard = 0; guard < 40; guard += 1) {
    const entry = map.get(dateString(cursor))
    if (entry !== undefined) {
      tokens += entry.tokens
      cost += entry.cost
    }
    if (dateString(cursor) === last) break
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }
  return { tokens: Math.round(tokens), cost: round4(cost) }
}

/** One model folded to its token / cost / request totals. */
interface ModelTotals {
  tokens: number
  cost: number
  requests: number
}

/**
 * Sum amount + cost buckets per model across the CURRENT month's days only.
 * When the running week crosses a month boundary `monthsNeeded` fetches two
 * months; folding every fetched day would leak the previous month's usage into
 * the "本月" breakdown, so days outside `monthPrefix` (e.g. `2025-01`) are
 * skipped here. The today/week/month totals are unaffected — `sumRange` already
 * filters by date.
 */
function foldModels(amountDays: DayUsage[], costDays: DayUsage[], monthPrefix: string): ModelUsageInfo[] {
  const inMonth = (day: DayUsage): boolean => day.date?.startsWith(monthPrefix) === true
  const map = new Map<string, ModelTotals>()
  const entryFor = (name: string): ModelTotals => {
    let entry = map.get(name)
    if (entry === undefined) {
      entry = { tokens: 0, cost: 0, requests: 0 }
      map.set(name, entry)
    }
    return entry
  }
  for (const day of amountDays) {
    if (!inMonth(day)) continue
    for (const model of day.data ?? []) {
      if (model.model === undefined) continue
      const entry = entryFor(model.model)
      for (const item of model.usage ?? []) {
        if ((item.type ?? '').toUpperCase() === 'REQUEST') entry.requests += toNumber(item.amount)
        else entry.tokens += toNumber(item.amount)
      }
    }
  }
  for (const day of costDays) {
    if (!inMonth(day)) continue
    for (const model of day.data ?? []) {
      if (model.model === undefined) continue
      const entry = entryFor(model.model)
      for (const item of model.usage ?? []) {
        if ((item.type ?? '').toUpperCase() === 'REQUEST') continue
        entry.cost += toNumber(item.amount)
      }
    }
  }
  return [...map.entries()]
    .map(([model, totals]) => ({
      model,
      tokens: Math.round(totals.tokens),
      cost: round4(totals.cost),
      requests: Math.round(totals.requests),
    }))
    .filter((entry) => entry.tokens > 0 || entry.cost > 0 || entry.requests > 0)
    .sort((a, b) => b.tokens - a.tokens)
}

/** Aggregate DeepSeek platform usage into today / week / month totals. */
async function queryUsage(
  ctx: Context,
  now: Date,
  platformToken?: string,
): Promise<{ usage?: UsageInfo; models?: ModelUsageInfo[]; note?: string }> {
  const token = platformToken ?? await resolvePlatformToken(ctx)
  if (token === undefined || token.length === 0) {
    return {
      note: '未配置 DEEPSEEK_USER_TOKEN，无法显示消费与 Tokens 用量（余额不受影响）。'
        + '该 token 是 platform.deepseek.com 登录后 localStorage 中的 userToken。',
    }
  }

  const months = monthsNeeded(now)
  const amountResponses: Array<PlatformResponse<AmountBizData>> = []
  const costResponses: Array<PlatformResponse<CostBizData[]>> = []
  try {
    await Promise.all([
      ...months.map(async (m) => {
        const payload = (await platformGet(token, '/api/v0/usage/amount', m.month, m.year)) as PlatformResponse<AmountBizData>
        assertPlatformOk(payload)
        amountResponses.push(payload)
      }),
      ...months.map(async (m) => {
        const payload = (await platformGet(token, '/api/v0/usage/cost', m.month, m.year)) as PlatformResponse<CostBizData[]>
        assertPlatformOk(payload)
        costResponses.push(payload)
      }),
    ])
  } catch (error) {
    return { note: `用量接口查询失败：${error instanceof Error ? error.message : String(error)}` }
  }

  const amountDays = amountResponses.flatMap((response) => response.data?.biz_data?.days ?? [])
  const costBizData = costResponses.flatMap((response) => response.data?.biz_data ?? [])
  const costDays = costBizData.flatMap((biz) => biz.days ?? [])
  const currency = costBizData.find((biz) => biz.currency !== undefined)?.currency ?? 'CNY'

  const daily = new Map<string, DailyTotals>()
  foldAmounts(amountDays, daily)
  foldCosts(costDays, daily)

  const today = sumRange(daily, now, now)
  const week = sumRange(daily, startOfWeek(now), now)
  const month = sumRange(daily, startOfMonth(now), now)

  return {
    usage: {
      currency,
      today_cost: today.cost,
      week_cost: week.cost,
      month_cost: month.cost,
      today_tokens: today.tokens,
      week_tokens: week.tokens,
      month_tokens: month.tokens,
    },
    models: foldModels(amountDays, costDays, dateString(now).slice(0, 7)),
  }
}

/**
 * Register the `balance-check` settings namespace and mount the `/balance` route.
 * @param ctx - plugin context carrying the web-server (and, when composed, the settings service).
 * @param config - resolved plugin configuration (schema defaults applied).
 */
export function apply(ctx: Context, config: Config = {}): void {
  // The settings scope feeds the web plugin-configuration card; when no settings
  // service is mounted the plugin keeps working from the composition entry alone.
  let current: () => Config = () => config
  installSettingsSection(ctx, BALANCE_CHECK_SETTINGS_NAMESPACE, Config, config, {
    setSource: (source) => {
      current = source
    },
    onChange: () => {},
  })

  ctx.effect(() => {
    const disposeRoute = ctx.webServer.register({
      kind: 'exact',
      path: '/balance',
      handler: (req, res) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') {
          res.writeHead(405, { 'content-type': 'application/json; charset=utf-8' })
          res.end(JSON.stringify({ ok: false, error: 'method not allowed' }))
          return
        }
        // HEAD carries no body — answer without any outbound work.
        if (req.method === 'HEAD') {
          res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' })
          res.end()
          return
        }
        // `?usage=0` serves the configuration card's lightweight read (masked
        // credentials only); the card must not trigger the usage aggregation.
        const query = new URL(req.url ?? '/', 'http://localhost').searchParams
        const usageFlag = query.get('usage')
        const lightweight = usageFlag === '0' || usageFlag === 'false'
        void (async () => {
          try {
            const result = lightweight
              ? await queryConfiguredOnly(ctx)
              : await queryBalance(ctx, current())
            res.writeHead(200, {
              'content-type': 'application/json; charset=utf-8',
              'cache-control': 'no-store',
            })
            res.end(JSON.stringify(result))
          } catch (error) {
            res.writeHead(500, { 'content-type': 'application/json; charset=utf-8' })
            res.end(JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) }))
          }
        })()
      },
    })
    return () => {
      disposeRoute()
    }
  }, 'balance-check: /balance route')
}
