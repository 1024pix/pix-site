import { setCookie } from '~/services/cookie'

export default function (context) {
  const { app, isDev } = context
  app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale) => {
    _setLocaleCookie(newLocale, isDev)
  }
}

function _setLocaleCookie(locale, isDev) {
  const canonicalName = Intl.getCanonicalLocales(locale)?.[0]
  setCookie('locale', canonicalName, isDev)
}
