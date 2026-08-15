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
 * @module @ticoguo/dsh-balance-check
 */
import type { Context } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
/** Cordis plugin name used by loader diagnostics. */
export declare const name = "balance-check";
/** Required service: the HTTP route registry. */
export declare const inject: string[];
/**
 * Plugin configuration. Every field is optional; `baseURL` is also exposed to
 * the plugin-configuration surface through the `balance-check` settings
 * namespace, where it outranks the `DEEPSEEK_BASE_URL` environment variable.
 */
export interface Config {
    /** DeepSeek API base URL; empty inherits `DEEPSEEK_BASE_URL`, then the default. */
    baseURL?: string;
    /** DeepSeek platform recharge page; empty uses the client default (`platform.deepseek.com/top_up`). */
    rechargeURL?: string;
}
/** Schemastery schema resolving this plugin's configuration. */
export declare const Config: z<Config>;
/** Settings namespace carrying this plugin's configurable fields. */
export declare const BALANCE_CHECK_SETTINGS_NAMESPACE: import("@deepseek-ai/dsh-settings").SettingsNamespace;
/** One currency bucket from the DeepSeek balance payload. */
export interface BalanceInfo {
    currency: string;
    total_balance: string;
    granted_balance: string;
    topped_up_balance: string;
}
/** Aggregated cost + token totals for the current day / week / month. */
export interface UsageInfo {
    /** Currency code of the cost figures (e.g. `CNY`). */
    currency: string;
    today_cost: number;
    week_cost: number;
    month_cost: number;
    today_tokens: number;
    week_tokens: number;
    month_tokens: number;
}
/** One model's aggregated tokens / cost / request count for the current month. */
export interface ModelUsageInfo {
    /** Model name reported by the platform (e.g. `deepseek-chat`). */
    model: string;
    /** Token count, summed over the current month. */
    tokens: number;
    /** Cost, summed over the current month. */
    cost: number;
    /** Request count, summed over the current month. */
    requests: number;
}
/** Masked view of the configured credentials, for the configuration card. */
export interface ConfiguredCredentials {
    /** Masked API key, or the empty string when none is configured. */
    apiKey: string;
    /** Masked platform token, or the empty string when none is configured. */
    userToken: string;
}
/** The JSON body this route returns to the browser. */
export type BalanceResponse = {
    ok: true;
    is_available: boolean;
    balance?: BalanceInfo;
    usage?: UsageInfo;
    /** Per-model month breakdown, sorted by token count descending. */
    models?: ModelUsageInfo[];
    /** Masked configured credentials (empty string per field when unset). */
    configured: ConfiguredCredentials;
    /** Present when detailed usage could not be produced (no token / failed). */
    usage_note?: string;
} | {
    ok: false;
    error: string;
};
/**
 * Register the `balance-check` settings namespace and mount the `/balance` route.
 * @param ctx - plugin context carrying the web-server (and, when composed, the settings service).
 * @param config - resolved plugin configuration (schema defaults applied).
 */
export declare function apply(ctx: Context, config?: Config): void;
//# sourceMappingURL=index.d.ts.map