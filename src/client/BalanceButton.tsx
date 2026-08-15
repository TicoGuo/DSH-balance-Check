/**
 * BalanceButton: a compact "余额" control in the composer's right row that
 * expands into a popover showing the account balance plus consumption and token
 * usage, with a recharge action. Clicking queries the host /balance route once;
 * the API key and platform token stay server-side. Click-outside / Escape dismisses.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import css from './BalanceButton.module.css'

/** One currency bucket returned by the host /balance route. */
export interface BalanceInfo {
  currency: string
  total_balance: string
  granted_balance: string
  topped_up_balance: string
}

/** Aggregated cost + token totals for the current day / week / month. */
export interface UsageInfo {
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
  model: string
  tokens: number
  cost: number
  requests: number
}

/** Masked view of the configured credentials (empty per field when unset). */
export interface ConfiguredCredentials {
  apiKey: string
  userToken: string
}

/** Host /balance response (ok + balance/usage/models, or a failure message). */
export type BalanceResponse =
  | {
      ok: true
      is_available: boolean
      balance?: BalanceInfo
      usage?: UsageInfo
      models?: ModelUsageInfo[]
      configured: ConfiguredCredentials
      usage_note?: string
    }
  | { ok: false; error: string }

/** Props supplied through the slot's injected business face. */
export interface BalanceButtonProps {
  queryBalance: () => Promise<BalanceResponse>
  openRecharge: () => void
}

/** Currency symbol for a code; DeepSeek is CNY-first, USD is the only other used. */
function symbolFor(code: string | undefined): string {
  return code === 'USD' ? '$' : '¥'
}

/** Format a cost figure with its currency symbol, or an em dash when absent. */
function money(value: number | undefined, code: string | undefined): string {
  if (value === undefined || !Number.isFinite(value)) return '—'
  return `${symbolFor(code)}${value.toFixed(2)}`
}

/** Format a token count with thousands separators, or an em dash when absent. */
function tokens(value: number | undefined): string {
  if (value === undefined) return '—'
  return Math.round(value).toLocaleString()
}

/** Render the balance button + popover. */
export function BalanceButton({ queryBalance, openRecharge }: BalanceButtonProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BalanceResponse | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)

  // Dismiss on outside pointer and Escape while open.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent): void => {
      if (rootRef.current !== null && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setResult(await queryBalance())
    } catch (error) {
      setResult({ ok: false, error: error instanceof Error ? error.message : String(error) })
    } finally {
      setLoading(false)
    }
  }, [queryBalance])

  // Load once on mount so the button can show the balance amount directly,
  // without requiring a click first.
  useEffect(() => {
    void load()
  }, [load])

  const toggle = useCallback(() => {
    if (open) {
      setOpen(false)
      return
    }
    setOpen(true)
    // Refresh on every open so the popover always shows the latest data.
    void load()
  }, [open, load])

  const refresh = useCallback(() => {
    void load()
  }, [load])

  const balance = result?.ok === true ? result.balance : undefined
  const usage = result?.ok === true ? result.usage : undefined
  const models = result?.ok === true ? result.models : undefined
  const usageNote = result?.ok === true ? result.usage_note : undefined
  const usageHint = usageNote ?? (usage === undefined
    ? '未获取到用量数据：请重启 dsh 服务，并在 .credentials.yaml 配置 DEEPSEEK_USER_TOKEN 后即可显示消费金额与 Tokens 用量。'
    : undefined)
  const isAvailable = result?.ok === true ? result.is_available : false

  const balanceCode = balance?.currency
  const usageCode = usage?.currency
  const totalBalance = balance === undefined ? undefined : Number(balance.total_balance)

  return (
    <div ref={rootRef} className={css.root}>
      <button
        type="button"
        className={css.trigger}
        onClick={toggle}
        aria-label="查询余额"
        aria-expanded={open}
        title="查询余额"
      >
        <span className={css.label}>
          {totalBalance !== undefined && Number.isFinite(totalBalance)
            ? `${symbolFor(balanceCode)}${totalBalance.toFixed(2)}`
            : '…'}
        </span>
      </button>
      {open && (
        <div className={css.popover} role="dialog" aria-label="账户余额与用量">
          {result === null && <div className={css.state}>查询中…</div>}
          {result !== null && result.ok === false && (
            <div className={css.error}>{result.error}</div>
          )}
          {result !== null && result.ok === true && (
            balance !== undefined || usage !== undefined || usageHint !== undefined
              ? (
                <div className={css.body}>
                  <div className={css.head}>
                    <span className={isAvailable ? css.available : css.unavailable}>
                      {isAvailable ? '可用' : '不可用'}
                    </span>
                    <div className={css.headRight}>
                      <span className={css.currency}>{balanceCode ?? usageCode}</span>
                      <button
                        type="button"
                        className={css.recharge}
                        onClick={openRecharge}
                        aria-label="充值"
                        title="前往 DeepSeek 官网充值（新标签页打开）"
                      >
                        <span className={css.rechargePlus} aria-hidden="true">+</span>
                        <span>充值</span>
                      </button>
                      <button
                        type="button"
                        className={css.refresh}
                        onClick={refresh}
                        disabled={loading}
                        aria-label="刷新"
                        title="刷新"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="13"
                          height="13"
                          aria-hidden
                          className={loading ? css.spin : undefined}
                        >
                          <path
                            d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {balance !== undefined && (
                    <section className={css.section}>
                      <h4 className={css.sectionTitle}>余额</h4>
                      <dl className={css.rows}>
                        <div className={css.row}>
                          <dt>总余额</dt>
                          <dd className={css.total}>{money(totalBalance, balanceCode)}</dd>
                        </div>
                        <div className={css.row}>
                          <dt>充值余额</dt>
                          <dd>{money(Number(balance.topped_up_balance), balanceCode)}</dd>
                        </div>
                        <div className={css.row}>
                          <dt>赠送余额</dt>
                          <dd>{money(Number(balance.granted_balance), balanceCode)}</dd>
                        </div>
                      </dl>
                    </section>
                  )}

                  <section className={css.section}>
                    <h4 className={css.sectionTitle}>消费金额</h4>
                    <dl className={css.rows}>
                      <div className={css.row}>
                        <dt>今日</dt>
                        <dd>{money(usage?.today_cost, usageCode)}</dd>
                      </div>
                      <div className={css.row}>
                        <dt>本周</dt>
                        <dd>{money(usage?.week_cost, usageCode)}</dd>
                      </div>
                      <div className={css.row}>
                        <dt>本月</dt>
                        <dd>{money(usage?.month_cost, usageCode)}</dd>
                      </div>
                    </dl>
                  </section>

                  <section className={css.section}>
                    <h4 className={css.sectionTitle}>Tokens 用量</h4>
                    <dl className={css.rows}>
                      <div className={css.row}>
                        <dt>今日</dt>
                        <dd>{tokens(usage?.today_tokens)}</dd>
                      </div>
                      <div className={css.row}>
                        <dt>本周</dt>
                        <dd>{tokens(usage?.week_tokens)}</dd>
                      </div>
                      <div className={css.row}>
                        <dt>本月</dt>
                        <dd>{tokens(usage?.month_tokens)}</dd>
                      </div>
                    </dl>
                  </section>

                  {models !== undefined && models.length > 0 && (
                    <section className={css.section}>
                      <h4 className={css.sectionTitle}>模型明细（本月）</h4>
                      <div className={css.models}>
                        {models.map((model) => (
                          <div className={css.modelRow} key={model.model}>
                            <div className={css.modelHead}>
                              <span className={css.modelName}>{model.model}</span>
                              <span className={css.modelRequests}>{model.requests} 次</span>
                            </div>
                            <div className={css.modelStats}>
                              <span>{tokens(model.tokens)} tokens</span>
                              <span>{money(model.cost, usageCode)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {usageHint !== undefined && <div className={css.note}>{usageHint}</div>}

                  <div className={css.rechargeHint}>
                    余额不足？点上方「充值」前往 DeepSeek 官网充值。
                  </div>
                </div>
              )
              : (
                <div className={css.state}>接口未返回余额信息</div>
              )
          )}
        </div>
      )}
    </div>
  )
}
