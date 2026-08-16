/**
 * The balance-check plugin-configuration card. It mirrors the shared plugin
 * card chrome (Settings → Plugins → Plugin configuration) visually, but is
 * self-contained: a third-party client plugin cannot value-import the
 * settings-plugins card components (the client bundle purity gate), so this
 * card owns its disclosure, controls, and styles.
 *
 * The two controls are credentials only: each shows the MASKED configured value
 * read from the host /balance route, with a password input that stages a
 * replacement. The endpoint and recharge-page overrides are not user fields and
 * are intentionally not rendered.
 */

import { useState } from 'react'
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import { IconChevronDownOutline14 } from '@deepseek-ai/dsh-client-ui-primitives'
// Type-only: pulls the `settings.plugin.item` SlotMap declaration this card
// registers into (the settings-plugins section owns that slot's contract).
import type {} from '@deepseek-ai/dsh-client-ui-settings-plugins/client'
import type { BalanceCardFace, BalanceSecretState } from './balance-card-controller.ts'
import css from './BalanceCard.module.css'

/** Props the renderer binds for the balance-check card. */
export type BalanceCardProps =
  PropsRuntime<'settings.plugin.item'>
  & PropsLocale<'balance-check'>
  & InjectFace<BalanceCardFace>

/** The console snippet that prints the platform login token. */
const USER_TOKEN_SNIPPET = "JSON.parse(localStorage.getItem('userToken')).value"

/** One write-only credential control: masked value + replacement input. */
function SecretField(props: {
  id: string
  label: string
  hint: string
  configuredLabel: string
  unconfiguredLabel: string
  replaceHint: string
  state: BalanceSecretState
  onEdit: (text: string) => void
}) {
  const disabled = !props.state.writable
  return (
    <div className={css.field}>
      <div className={css.head}>
        <label className={css.label} htmlFor={props.id}>{props.label}</label>
        <span className={css.badges}>
          <span className={props.state.configured ? css.badge : css.badgeMuted}>
            {props.state.configured ? props.configuredLabel : props.unconfiguredLabel}
          </span>
        </span>
      </div>
      {props.state.configured && (
        <div className={css.masked} aria-label={props.configuredLabel}>{props.state.masked}</div>
      )}
      <input
        id={props.id}
        className={css.input}
        type="password"
        autoComplete="off"
        value={props.state.text}
        placeholder={props.replaceHint}
        disabled={disabled}
        onChange={(event) => { props.onEdit(event.target.value) }}
      />
      <p className={css.hint}>{props.hint}</p>
    </div>
  )
}

/** Render the balance-check card. */
export function BalanceCard(props: BalanceCardProps) {
  const { t } = props
  const state = props.useCard(snapshot => snapshot)
  const [open, setOpen] = useState(false)
  if (!state.available) return null
  const title = t('cardTitle')
  const canSave = state.dirty && !state.saving

  return (
    <li className={open ? `${css.card} ${css.cardOpen}` : css.card}>
      <button
        type="button"
        className={css.header}
        aria-expanded={open}
        onClick={() => { setOpen(!open) }}
      >
        <span className={css.headText}>
          <span className={css.name}>{title}</span>
          <span className={css.description}>{t('cardDescription')}</span>
        </span>
        {state.dirty ? <span className={css.pending}>{t('unsaved')}</span> : null}
        <IconChevronDownOutline14 className={open ? css.chevronOpen : css.chevron} />
      </button>

      {open && (
        <div className={css.body}>
          <SecretField
            id="balance-check-api-key"
            label={t('apiKey')}
            hint={t('apiKeyHint')}
            configuredLabel={t('configured')}
            unconfiguredLabel={t('unconfigured')}
            replaceHint={t('replaceKey')}
            state={state.apiKey}
            onEdit={(text) => { props.edit('apiKey', text) }}
          />
          <SecretField
            id="balance-check-user-token"
            label={t('userToken')}
            hint={t('userTokenHint')}
            configuredLabel={t('configured')}
            unconfiguredLabel={t('unconfigured')}
            replaceHint={t('replaceToken')}
            state={state.userToken}
            onEdit={(text) => { props.edit('userToken', text) }}
          />

          <section className={css.howto}>
            <h4 className={css.howtoTitle}>{t('howToTitle')}</h4>
            <p className={css.howtoStep}>{t('howToStep1')}</p>
            <code className={css.code}>{USER_TOKEN_SNIPPET}</code>
            <p className={css.howtoStep}>{t('howToStep2')}</p>
          </section>

          <div className={css.footer}>
            {state.failed ? <p className={css.failed} role="status">{t('failed')}</p> : null}
            <button
              type="button"
              className={css.discard}
              disabled={!state.dirty || state.saving}
              onClick={props.discard}
            >
              {t('discard')}
            </button>
            <button
              type="button"
              className={css.save}
              disabled={!canSave}
              onClick={props.save}
            >
              {t(state.saving ? 'saving' : 'save')}
            </button>
          </div>
        </div>
      )}
    </li>
  )
}
