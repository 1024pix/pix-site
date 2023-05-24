import { getCookie, setCookie } from '~/services/cookie'

export default function (context) {
  const { app, isDev } = context
  app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale) => {
    _setLocaleCookie(newLocale, isDev)
  }

  _handleLocaleCookie(isDev)
}

function _setLocaleCookie(locale, isDev) {
  const canonicalName = Intl.getCanonicalLocales(locale)?.[0]
  setCookie('locale', canonicalName, isDev)
}

function _handleLocaleCookie(isDev) {
  const localeCookie = getCookie('locale')

  if (!localeCookie) return

  try {
    if (Intl.getCanonicalLocales(localeCookie)[0] === 'en-GB') {
      setCookie('locale', 'en', isDev)
    }
  } catch (error) {}
}
