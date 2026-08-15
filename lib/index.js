import z from "@deepseek-ai/schemastery";
import { credentialRef } from "@deepseek-ai/dsh-credentials";
import { launchEnvironmentOf } from "@deepseek-ai/dsh-launch-environment";
import { installSettingsSection, settingsNamespace } from "@deepseek-ai/dsh-settings";
//#region lib/types/index.js
/** Cordis plugin name used by loader diagnostics. */
const name = "balance-check";
/** Required service: the HTTP route registry. */
const inject = ["webServer"];
/** Credential reference carrying the DeepSeek API key. */
const API_KEY_ENV = "DEEPSEEK_API_KEY";
/**
* Credential references carrying the DeepSeek platform session token. Unlike the
* API key this is the web dashboard's `userToken`, not an `sk-` secret. Both
* spellings are accepted: `DEEPSEEK_USER_TOKEN` first, then the ecosystem alias
* `DEEPSEEK_PLATFORM_TOKEN`.
*/
const USER_TOKEN_ENV = "DEEPSEEK_USER_TOKEN";
const PLATFORM_TOKEN_ENV = "DEEPSEEK_PLATFORM_TOKEN";
/** Balance endpoint base; a custom DEEPSEEK_BASE_URL may override it (trailing `/v1` stripped). */
const DEFAULT_BASE_URL = "https://api.deepseek.com";
/** DeepSeek platform dashboard base for the private usage endpoints. */
const PLATFORM_BASE_URL = "https://platform.deepseek.com";
/** Platform auth failure codes (same envelope codes used by the dashboard). */
const PLATFORM_AUTH_CODES = new Set([40002, 40003]);
/** Schemastery schema resolving this plugin's configuration. */
const Config = z.object({
	baseURL: z.string(),
	rechargeURL: z.string()
});
/** Settings namespace carrying this plugin's configurable fields. */
const BALANCE_CHECK_SETTINGS_NAMESPACE = settingsNamespace("balance-check");
/** Resolve the balance-query base URL (settings first, then env, then the default). */
function balanceBaseURL(ctx, config) {
	const fromConfig = config.baseURL;
	if (fromConfig !== void 0 && fromConfig.length > 0) return fromConfig.replace(/\/+$/, "").replace(/\/v1$/, "");
	const override = launchEnvironmentOf(ctx).get("DEEPSEEK_BASE_URL")?.value;
	if (override !== void 0 && override.length > 0) return override.replace(/\/+$/, "").replace(/\/v1$/, "");
	return DEFAULT_BASE_URL;
}
/** Resolve one credential reference: credentials seam first, ambient environment second. */
async function resolveSecret(ctx, envName) {
	const ref = credentialRef(envName);
	const credentials = ctx.get("credentials");
	if (credentials !== void 0) {
		const resolved = await credentials.resolve(ref);
		if (resolved !== void 0 && resolved.value.length > 0) return resolved.value;
	}
	return launchEnvironmentOf(ctx).get(ref)?.value;
}
/** Parse a numeric string defensively; a missing/invalid value reads as zero. */
function toNumber(value) {
	if (value === void 0) return 0;
	const parsed = Number(value.trim());
	return Number.isFinite(parsed) ? parsed : 0;
}
/** Round to four decimals (DeepSeek cost amounts carry up to four places). */
function round4(value) {
	return Math.round((Math.max(0, value) + Number.EPSILON) * 1e4) / 1e4;
}
/** Mask a secret for display: keep a short prefix + suffix, hide the middle. */
function maskSecret(value) {
	if (value === void 0 || value.length === 0) return "";
	if (value.length <= 10) return "****";
	return `${value.slice(0, 5)}****${value.slice(-4)}`;
}
/** Query the DeepSeek account balance and project it into a browser-safe view. */
async function queryBalance(ctx, config) {
	const apiKey = await resolveSecret(ctx, API_KEY_ENV);
	if (apiKey === void 0 || apiKey.length === 0) return {
		ok: false,
		error: "未配置 DeepSeek API Key：请在 设置 → 插件 → 插件配置 → 余额显示 中填写，或设置 DEEPSEEK_API_KEY 环境变量"
	};
	const url = `${balanceBaseURL(ctx, config)}/user/balance`;
	let response;
	try {
		response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				Accept: "application/json"
			}
		});
	} catch (error) {
		return {
			ok: false,
			error: `无法连接 DeepSeek 接口：${error instanceof Error ? error.message : String(error)}`
		};
	}
	if (!response.ok) {
		const body = await response.text().catch(() => "");
		const detail = body.length > 0 ? `：${body.slice(0, 200)}` : "";
		return {
			ok: false,
			error: `DeepSeek 接口返回 ${response.status}${detail}`
		};
	}
	const data = await response.json();
	const balance = data.balance_infos?.[0];
	const usageResult = await queryUsage(ctx, /* @__PURE__ */ new Date());
	const userToken = await resolveSecret(ctx, USER_TOKEN_ENV);
	const platformToken = userToken === void 0 || userToken.length === 0 ? await resolveSecret(ctx, PLATFORM_TOKEN_ENV) : userToken;
	return {
		ok: true,
		is_available: data.is_available ?? false,
		...balance === void 0 ? {} : { balance },
		...usageResult.usage === void 0 ? {} : { usage: usageResult.usage },
		...usageResult.models === void 0 ? {} : { models: usageResult.models },
		configured: {
			apiKey: maskSecret(apiKey),
			userToken: maskSecret(platformToken)
		},
		...usageResult.note === void 0 ? {} : { usage_note: usageResult.note }
	};
}
/**
* UTC `yyyy-MM-dd` for a date. The platform's usage endpoints key their daily
* buckets by UTC date, so "today" must be the UTC date — the server's local
* zone (e.g. UTC+8) would otherwise read a bucket the platform has not filled.
*/
function dateString(date) {
	return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}
/** UTC start of the week containing `date` (Monday). */
function startOfWeek(date) {
	const result = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
	const mondayOffset = (result.getUTCDay() + 6) % 7;
	result.setUTCDate(result.getUTCDate() - mondayOffset);
	return result;
}
/** UTC start of the month containing `date`. */
function startOfMonth(date) {
	return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}
/** `{ month, year }` set covering the current week + current month (one or two entries), in UTC. */
function monthsNeeded(now) {
	const current = {
		month: now.getUTCMonth() + 1,
		year: now.getUTCFullYear()
	};
	const weekStart = startOfWeek(now);
	const previous = {
		month: weekStart.getUTCMonth() + 1,
		year: weekStart.getUTCFullYear()
	};
	if (previous.year === current.year && previous.month === current.month) return [current];
	return [previous, current];
}
/** Reject a non-zero platform envelope, translating auth codes into a clear message. */
function assertPlatformOk(envelope) {
	if (envelope.code !== void 0 && envelope.code !== 0) throw new Error(PLATFORM_AUTH_CODES.has(envelope.code) ? "平台登录态已失效，请重新获取 DEEPSEEK_USER_TOKEN" : `用量接口返回 code ${envelope.code}`);
	const bizCode = envelope.data?.biz_code;
	if (bizCode !== void 0 && bizCode !== 0) throw new Error(PLATFORM_AUTH_CODES.has(bizCode) ? "平台登录态已失效，请重新获取 DEEPSEEK_USER_TOKEN" : `用量接口返回 biz_code ${bizCode}`);
}
/** GET one platform endpoint with the bearer token. */
async function platformGet(token, path, month, year) {
	const url = new URL(path, PLATFORM_BASE_URL);
	url.searchParams.set("month", String(month));
	url.searchParams.set("year", String(year));
	const response = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
			"x-app-version": "1.0.0",
			Origin: "https://platform.deepseek.com",
			Referer: "https://platform.deepseek.com/usage"
		}
	});
	if (!response.ok) throw new Error(`用量接口返回 HTTP ${response.status}`);
	return await response.json();
}
/** Sum token buckets (skipping the `REQUEST` counter) from amount day entries. */
function foldAmounts(days, map) {
	for (const day of days ?? []) {
		if (day.date === void 0) continue;
		let entry = map.get(day.date);
		if (entry === void 0) {
			entry = {
				tokens: 0,
				cost: 0
			};
			map.set(day.date, entry);
		}
		for (const model of day.data ?? []) for (const item of model.usage ?? []) {
			if ((item.type ?? "").toUpperCase() === "REQUEST") continue;
			entry.tokens += toNumber(item.amount);
		}
	}
}
/** Sum cost buckets (skipping the `REQUEST` counter) from cost day entries. */
function foldCosts(days, map) {
	for (const day of days ?? []) {
		if (day.date === void 0) continue;
		let entry = map.get(day.date);
		if (entry === void 0) {
			entry = {
				tokens: 0,
				cost: 0
			};
			map.set(day.date, entry);
		}
		for (const model of day.data ?? []) for (const item of model.usage ?? []) {
			if ((item.type ?? "").toUpperCase() === "REQUEST") continue;
			entry.cost += toNumber(item.amount);
		}
	}
}
/** Sum daily totals over the inclusive `[start, end]` date range. */
function sumRange(map, start, end) {
	let tokens = 0;
	let cost = 0;
	const last = dateString(end);
	const cursor = new Date(start);
	for (let guard = 0; guard < 40; guard += 1) {
		const entry = map.get(dateString(cursor));
		if (entry !== void 0) {
			tokens += entry.tokens;
			cost += entry.cost;
		}
		if (dateString(cursor) === last) break;
		cursor.setUTCDate(cursor.getUTCDate() + 1);
	}
	return {
		tokens: Math.round(tokens),
		cost: round4(cost)
	};
}
/** Sum amount + cost buckets per model across every fetched day (the current month). */
function foldModels(amountDays, costDays) {
	const map = /* @__PURE__ */ new Map();
	const entryFor = (name) => {
		let entry = map.get(name);
		if (entry === void 0) {
			entry = {
				tokens: 0,
				cost: 0,
				requests: 0
			};
			map.set(name, entry);
		}
		return entry;
	};
	for (const day of amountDays) for (const model of day.data ?? []) {
		if (model.model === void 0) continue;
		const entry = entryFor(model.model);
		for (const item of model.usage ?? []) if ((item.type ?? "").toUpperCase() === "REQUEST") entry.requests += toNumber(item.amount);
		else entry.tokens += toNumber(item.amount);
	}
	for (const day of costDays) for (const model of day.data ?? []) {
		if (model.model === void 0) continue;
		const entry = entryFor(model.model);
		for (const item of model.usage ?? []) {
			if ((item.type ?? "").toUpperCase() === "REQUEST") continue;
			entry.cost += toNumber(item.amount);
		}
	}
	return [...map.entries()].map(([model, totals]) => ({
		model,
		tokens: Math.round(totals.tokens),
		cost: round4(totals.cost),
		requests: Math.round(totals.requests)
	})).filter((entry) => entry.tokens > 0 || entry.cost > 0 || entry.requests > 0).sort((a, b) => b.tokens - a.tokens);
}
/** Aggregate DeepSeek platform usage into today / week / month totals. */
async function queryUsage(ctx, now) {
	const userToken = await resolveSecret(ctx, USER_TOKEN_ENV);
	const platformToken = userToken === void 0 || userToken.length === 0 ? await resolveSecret(ctx, PLATFORM_TOKEN_ENV) : userToken;
	if (platformToken === void 0 || platformToken.length === 0) return { note: "未配置 DEEPSEEK_USER_TOKEN，无法显示消费与 Tokens 用量（余额不受影响）。该 token 是 platform.deepseek.com 登录后 localStorage 中的 userToken。" };
	const token = platformToken;
	const months = monthsNeeded(now);
	const amountResponses = [];
	const costResponses = [];
	try {
		await Promise.all([...months.map(async (m) => {
			const payload = await platformGet(token, "/api/v0/usage/amount", m.month, m.year);
			assertPlatformOk(payload);
			amountResponses.push(payload);
		}), ...months.map(async (m) => {
			const payload = await platformGet(token, "/api/v0/usage/cost", m.month, m.year);
			assertPlatformOk(payload);
			costResponses.push(payload);
		})]);
	} catch (error) {
		return { note: `用量接口查询失败：${error instanceof Error ? error.message : String(error)}` };
	}
	const amountDays = amountResponses.flatMap((response) => response.data?.biz_data?.days ?? []);
	const costBizData = costResponses.flatMap((response) => response.data?.biz_data ?? []);
	const costDays = costBizData.flatMap((biz) => biz.days ?? []);
	const currency = costBizData.find((biz) => biz.currency !== void 0)?.currency ?? "CNY";
	const daily = /* @__PURE__ */ new Map();
	foldAmounts(amountDays, daily);
	foldCosts(costDays, daily);
	const today = sumRange(daily, now, now);
	const week = sumRange(daily, startOfWeek(now), now);
	const month = sumRange(daily, startOfMonth(now), now);
	return {
		usage: {
			currency,
			today_cost: today.cost,
			week_cost: week.cost,
			month_cost: month.cost,
			today_tokens: today.tokens,
			week_tokens: week.tokens,
			month_tokens: month.tokens
		},
		models: foldModels(amountDays, costDays)
	};
}
/**
* Register the `balance-check` settings namespace and mount the `/balance` route.
* @param ctx - plugin context carrying the web-server (and, when composed, the settings service).
* @param config - resolved plugin configuration (schema defaults applied).
*/
function apply(ctx, config = {}) {
	let current = () => config;
	installSettingsSection(ctx, BALANCE_CHECK_SETTINGS_NAMESPACE, Config, config, {
		setSource: (source) => {
			current = source;
		},
		onChange: () => {}
	});
	ctx.effect(() => {
		const disposeRoute = ctx.webServer.register({
			kind: "exact",
			path: "/balance",
			handler: (req, res) => {
				if (req.method !== "GET" && req.method !== "HEAD") {
					res.writeHead(405, { "content-type": "application/json; charset=utf-8" });
					res.end(JSON.stringify({
						ok: false,
						error: "method not allowed"
					}));
					return;
				}
				(async () => {
					try {
						const result = await queryBalance(ctx, current());
						res.writeHead(200, {
							"content-type": "application/json; charset=utf-8",
							"cache-control": "no-store"
						});
						res.end(JSON.stringify(result));
					} catch (error) {
						res.writeHead(500, { "content-type": "application/json; charset=utf-8" });
						res.end(JSON.stringify({
							ok: false,
							error: error instanceof Error ? error.message : String(error)
						}));
					}
				})();
			}
		});
		return () => {
			disposeRoute();
		};
	}, "balance-check: /balance route");
}
//#endregion
export { BALANCE_CHECK_SETTINGS_NAMESPACE, Config, apply, inject, name };
