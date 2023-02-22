import { config } from '../config/environment'

export default function (context) {
  const { app, isDev } = context
  app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale) => {
    _setLocaleCookie(newLocale, isDev)
  }
}

function _setLocaleCookie(locale, isDev) {
  const localeCookieProperties = [
    `locale=${locale}`,
    'path=/',
    'max-age=31536000',
    'SameSite=Strict',
  ]
  if (!isDev) {
    localeCookieProperties.push(`domain=${config.siteDomain}`)
  }

  document.cookie = localeCookieProperties.join('; ')
}
