import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
export type { BalanceResponse, BalanceInfo, UsageInfo, ModelUsageInfo, ConfiguredCredentials } from './BalanceButton.tsx';
/** Required services (cordis fiber inject). */
export declare const inject: string[];
/**
 * Client plugin body: mount the balance button and the plugin-configuration card.
 * @param ctx - client root context.
 */
export declare function apply(ctx: ClientContext): void;
//# sourceMappingURL=index.d.ts.map