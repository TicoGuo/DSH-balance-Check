/**
 * The balance-check card's form. It is credentials-only: the DeepSeek API key
 * and platform token are the two write-only controls. The card shows each
 * configured secret as a MASKED string read from the host /balance route (the
 * literal never rides a response), and writes a new value through the
 * credentials domain. The endpoint and recharge-page overrides stay out of the
 * card — they are deployment-level settings, not user fields.
 *
 * Self-contained on purpose: a third-party client plugin may not value-import
 * the settings-plugins card chrome (the client bundle purity gate), so the form
 * lives here.
 */

import type { IApiClient } from '@deepseek-ai/dsh-client-connection/client'
import type { SettingsScope, SnapshotStore } from '@deepseek-ai/dsh-client-runtime/client'
import { createSnapshotStore } from '@deepseek-ai/dsh-client-runtime/client'
import type { BalanceResponse } from './BalanceButton.tsx'

/** Settings namespace the host plugin registers for this card. */
export const BALANCE_NS = 'balance-check'

/** Credential reference carrying the DeepSeek API key. */
export const API_KEY_REF = 'DEEPSEEK_API_KEY'

/** Credential reference carrying the DeepSeek platform session token. */
export const USER_TOKEN_REF = 'DEEPSEEK_USER_TOKEN'

/** Default DeepSeek platform recharge page (opens in a new tab). */
export const DEFAULT_RECHARGE_URL = 'https://platform.deepseek.com/top_up'

/** The balance-check settings section (endpoint + recharge-page overrides). */
export interface BalanceSettings {
  /** DeepSeek API base URL; blank inherits DEEPSEEK_BASE_URL, then the default. */
  baseURL?: string
  /** DeepSeek platform recharge page; blank uses {@link DEFAULT_RECHARGE_URL}. */
  rechargeURL?: string
}

/** One secret control: its masked value plus its draft and configured state. */
export interface BalanceSecretState {
  /** Masked configured value (empty when unset). */
  masked: string
  /** Whether any layer supplies a value for it. */
  configured: boolean
  /** Whether `credentials.set` can affect it; false disables the control. */
  writable: boolean
  /** Draft text the control renders (blank until typed). */
  text: string
}

/** What the balance-check card renders. */
export interface BalanceCardState {
  /** False while the namespace is not served to this client; the card renders nothing. */
  available: boolean
  /** Whether the form holds edits that a save would write. */
  dirty: boolean
  /** Whether a save is crossing the wire. */
  saving: boolean
  /** Whether the last save did not land as staged. */
  failed: boolean
  /** The DeepSeek API key control. */
  apiKey: BalanceSecretState
  /** The platform token control. */
  userToken: BalanceSecretState
}

/** The registration-side face the card's slot entry injects. */
export interface BalanceCardFace {
  hooks: {
    /** Card snapshot bound by the renderer as useCard. */
    card: SnapshotStore<BalanceCardState>
  }
  /** Stage draft text for one secret field. */
  edit: (field: 'apiKey' | 'userToken', text: string) => void
  /** Write every staged edit, then re-seed from what the Host accepted. */
  save: () => void
  /** Drop every staged edit. */
  discard: () => void
}

/** Bridges the credentials domain and the host /balance route onto the card. */
export class BalanceCardController {
  private readonly staged = new Map<string, string>()
  private readonly store: SnapshotStore<BalanceCardState>
  private apiKeyMasked = ''
  private userTokenMasked = ''
  private apiKeyWritable = true
  private userTokenWritable = true
  private saving = false
  private failed = false

  /**
   * @param scope - the bound settings scope for the `balance-check` namespace.
   * @param api - wire face used for the credentials this card writes.
   * @param queryBalance - fetches the host /balance route (masked credentials).
   */
  constructor(
    private readonly scope: SettingsScope<BalanceSettings>,
    private readonly api: Pick<IApiClient, 'credentials'>,
    private readonly queryBalance: () => Promise<BalanceResponse>,
  ) {
    this.store = createSnapshotStore(this.projection())
    scope.subscribe(() => {
      this.publish()
    })
    void this.readConfigured()
  }

  /** Read the masked configured values and each credential's writability. */
  private async readConfigured(): Promise<void> {
    try {
      const balance = await this.queryBalance()
      if (balance.ok) {
        this.apiKeyMasked = balance.configured.apiKey
        this.userTokenMasked = balance.configured.userToken
      }
    } catch (_balanceReadFailure) {
      // The card stays usable: controls show "unconfigured" and writes still reach the Host.
    }
    try {
      const described = await this.api.credentials.describe({ refs: [API_KEY_REF, USER_TOKEN_REF] })
      if (described.result.ok) {
        const views = described.result.value.credentials
        this.apiKeyWritable = views[API_KEY_REF]?.writable ?? true
        this.userTokenWritable = views[USER_TOKEN_REF]?.writable ?? true
      }
    } catch (_credentialReadFailure) {
      // Keep the default writable=true; the Host is what refuses a real write.
    }
    this.publish()
  }

  /** Build the face the card's slot registration injects. */
  inject(): BalanceCardFace {
    return {
      hooks: { card: this.store },
      edit: (field, text) => {
        this.staged.set(field, text)
        this.failed = false
        this.publish()
      },
      save: () => { void this.save() },
      discard: () => {
        if (this.staged.size === 0 && !this.failed) return
        this.staged.clear()
        this.failed = false
        this.publish()
      },
    }
  }

  /** The current recharge page URL: the configured override, else the default. */
  rechargeURL(): string {
    const override = this.scope.getSnapshot().value?.rechargeURL
    return typeof override === 'string' && override.length > 0 ? override : DEFAULT_RECHARGE_URL
  }

  /** Open the DeepSeek recharge page in a new tab. */
  openRecharge(): void {
    window.open(this.rechargeURL(), '_blank', 'noopener,noreferrer')
  }

  private projection(): BalanceCardState {
    return {
      // The card is credentials-only: it writes through the credentials domain,
      // not the balance-check settings namespace. Gating on the settings-scope
      // status would hide it on stock DSH builds whose apiproxy whitelist does
      // not expose third-party namespaces (WEB_SETTINGS_NAMESPACES). Render it
      // whenever the client plugin is composed; a missing credentials service
      // degrades to per-field "failed" instead of hiding the whole card.
      available: true,
      dirty: this.staged.size > 0,
      saving: this.saving,
      failed: this.failed,
      apiKey: this.secretState('apiKey', this.apiKeyMasked, this.apiKeyWritable),
      userToken: this.secretState('userToken', this.userTokenMasked, this.userTokenWritable),
    }
  }

  private secretState(field: 'apiKey' | 'userToken', masked: string, writable: boolean): BalanceSecretState {
    return {
      masked,
      configured: masked.length > 0,
      writable,
      text: this.staged.get(field) ?? '',
    }
  }

  /** Write every staged edit, then re-read from what the Host accepted. */
  private async save(): Promise<void> {
    if (this.staged.size === 0 || this.saving) return
    this.saving = true
    this.failed = false
    this.publish()

    let landed = true
    for (const [field, text] of this.staged) {
      const value = text.trim()
      if (value === '') continue
      const ref = field === 'apiKey' ? API_KEY_REF : USER_TOKEN_REF
      try {
        await this.api.credentials.set({ ref, value })
      } catch (_credentialWriteFailure) {
        landed = false
      }
    }
    if (landed) this.staged.clear()
    this.saving = false
    this.failed = !landed
    await this.readConfigured()
    this.publish()
  }

  private publish(): void {
    this.store.set(this.projection())
  }
}
