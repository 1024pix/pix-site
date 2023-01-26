import { config } from '../config/environment'

export default function ({ app }) {
  app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale) => {
    _setLocaleCookie(newLocale)
  }
}

function _setLocaleCookie(locale) {
  document.cookie = `locale=${locale}; path=/; domain=${config.siteDomain}; max-age=31536000`
}
