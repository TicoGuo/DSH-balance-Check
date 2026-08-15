/**
 * Locale bundles for the balance-check card and its controls. The namespace is
 * `balance-check`, declared on the card's slot registration; the browser locale
 * service resolves it against these dictionaries.
 */

/** Locale keys the balance-check card renders. */
export type BalanceLocaleKey =
  | 'cardTitle' | 'cardDescription'
  | 'apiKey' | 'apiKeyHint'
  | 'userToken' | 'userTokenHint'
  | 'configured' | 'unconfigured'
  | 'replaceKey' | 'replaceToken'
  | 'howToTitle' | 'howToStep1' | 'howToStep2'
  | 'save' | 'saving' | 'discard' | 'unsaved' | 'failed'

/** English copy. */
export const en: Record<BalanceLocaleKey, string> = {
  cardTitle: 'Balance display',
  cardDescription: 'Shows the DeepSeek account balance beside the composer, plus cost and token usage.',
  apiKey: 'DeepSeek API Key',
  apiKeyHint: 'Starts with "sk-". Create one at https://platform.deepseek.com/api_keys. Type a new value to replace the current key.',
  userToken: 'Platform user token',
  userTokenHint: 'The login token from platform.deepseek.com, used only for cost and token usage. Type a new value to replace the current token.',
  configured: 'Configured',
  unconfigured: 'Not configured',
  replaceKey: 'Type a new key to replace',
  replaceToken: 'Type a new token to replace',
  howToTitle: 'How to get the user token',
  howToStep1: 'Sign in at https://platform.deepseek.com, then open the browser console (F12) and run:',
  howToStep2: 'Copy the printed value (the text between the quotes) into the field above.',
  save: 'Save',
  saving: 'Saving…',
  discard: 'Discard',
  unsaved: 'Unsaved',
  failed: 'The deployment did not accept these values; they were left for you to correct.',
}

/** Simplified Chinese copy. */
export const zh: Record<BalanceLocaleKey, string> = {
  cardTitle: '余额显示',
  cardDescription: '在输入框旁显示 DeepSeek 账户余额，并展示消费金额与 Tokens 用量。',
  apiKey: 'DeepSeek API Key',
  apiKeyHint: '以 "sk-" 开头，在 https://platform.deepseek.com/api_keys 创建。输入新值即可替换当前密钥。',
  userToken: '平台登录态 Token',
  userTokenHint: 'platform.deepseek.com 的登录态令牌，仅用于消费金额与 Tokens 用量。输入新值即可替换当前 token。',
  configured: '已配置',
  unconfigured: '未配置',
  replaceKey: '输入新密钥以替换',
  replaceToken: '输入新 token 以替换',
  howToTitle: '如何获取平台登录态 token',
  howToStep1: '登录 https://platform.deepseek.com 后，打开浏览器控制台（F12），执行：',
  howToStep2: '把打印出来的值（引号中间的纯文本）复制到上方输入框。',
  save: '保存',
  saving: '保存中…',
  discard: '放弃修改',
  unsaved: '未保存',
  failed: '本部署没有接受这些值，已保留供你修改。',
}

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** Balance-check card and control copy. */
    'balance-check': BalanceLocaleKey
  }
}
