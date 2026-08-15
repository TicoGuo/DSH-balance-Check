/**
 * Balance check plugin, browser half.
 *
 * Registers two contributions:
 *  1. a compact "余额" button in the composer's right control row
 *     (`conversation.input.right`, just left of the send button) that fetches
 *     the host `/balance` route — the API key stays server-side — and renders
 *     the account balance in a popover;
 *  2. a "余额显示" card in the Settings → Plugins → Plugin configuration
 *     section (`settings.plugin.item`) that explains the plugin and writes the
 *     DeepSeek API key and platform token through the credentials domain.
 */
import type { ConnectionHandle } from '@deepseek-ai/dsh-client-connection/client'
// Type-only: pulls the locale plugin's Context merge (ctx.locale).
import type {} from '@deepseek-ai/dsh-client-locale/client'
// Type-only: pulls the ui-conversation SlotMap merge (the input.right seat).
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
// Type-only: the settings shell's ctx.settingsScope Context merge.
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
// Type-only: the settings-plugins section's `settings.plugin.item` SlotMap merge.
import type {} from '@deepseek-ai/dsh-client-ui-settings-plugins/client'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { BalanceButton, type BalanceResponse } from './BalanceButton.tsx'
import { BalanceCard } from './BalanceCard.tsx'
import { BalanceCardController, BALANCE_NS } from './balance-card-controller.ts'
import { en, zh } from './locales.ts'

export type { BalanceResponse, BalanceInfo, UsageInfo, ModelUsageInfo, ConfiguredCredentials } from './BalanceButton.tsx'

/** Dictionary namespace owned by this plugin's card. */
const NS = 'balance-check'

/** Required services (cordis fiber inject). */
export const inject = ['slots', 'locale', 'connection', 'settingsScope']

/** Query the host balance route (the API key never reaches the browser). */
async function queryBalance(): Promise<BalanceResponse> {
  const response = await fetch('/balance', {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) {
    return { ok: false, error: `查询失败（HTTP ${response.status}）` }
  }
  return (await response.json()) as BalanceResponse
}

/**
 * Client plugin body: mount the balance button and the plugin-configuration card.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContext): void {
  const { api } = ctx.get('connection') as ConnectionHandle
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-balance-check: card dictionaries')

  const card = new BalanceCardController(
    ctx.settingsScope.bind({ namespace: BALANCE_NS }),
    api,
    queryBalance,
  )

  ctx.slots.inject('conversation.input.right', () => ctx.slots.register({
    name: 'conversation.input.right',
    id: 'balance-check',
    order: 0,
    inject: () => ({ queryBalance, openRecharge: () => card.openRecharge() }),
  }, BalanceButton))

  ctx.slots.inject('settings.plugin.item', () => ctx.slots.register({
    name: 'settings.plugin.item',
    id: 'balance-check',
    order: 30,
    locale: NS,
    inject: () => card.inject(),
  }, BalanceCard))
}
