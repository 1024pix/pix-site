import { config } from '../config/environment'

export default function (context) {
  const { app, isDev } = context
  app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale) => {
    _setLocaleCookie(newLocale, isDev)
  }
}

function _setLocaleCookie(locale, isDev) {
  let canonicalName = Intl.getCanonicalLocales(locale)?.[0]

  if (canonicalName === 'en-GB') {
    canonicalName = 'en'
  }

  const localeCookieProperties = [
    `locale=${canonicalName}`,
    'path=/',
    'max-age=31536000',
    'SameSite=Strict',
  ]
  if (!isDev) {
    localeCookieProperties.push(`domain=${config.siteDomain}`)
  }

  document.cookie = localeCookieProperties.join('; ')
}
