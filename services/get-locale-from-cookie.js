import { getCookie } from '~/services/cookie'
import { localization } from '~/config/localization'

export function getLocaleFromCookie() {
  try {
    const chosenLocale = getCookie('locale')

    if (!chosenLocale) return null

    let canonicalChosenLocale = Intl.getCanonicalLocales(chosenLocale)[0]

    if (canonicalChosenLocale === 'en-GB') {
      canonicalChosenLocale = 'en'
    }

    const canonicalCurrentLocales = localization.localesForCurrentSite.map(
      ({ code }) => Intl.getCanonicalLocales(code)[0]
    )

    if (!canonicalCurrentLocales.includes(canonicalChosenLocale)) return null

    return canonicalChosenLocale.toLowerCase()
  } catch (error) {
    return null
  }
}
