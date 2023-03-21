import { localization } from '~/config/localization'

export function getLocaleFromCookie() {
  const localeCookie = document.cookie
    .split('; ')
    .find((item) => item.startsWith('locale'))

  if (!localeCookie) return null

  try {
    const chosenLocale = localeCookie.split('=')[1]

    if (!chosenLocale) return null

    let canonicalChosenLocale = Intl.getCanonicalLocales(chosenLocale)[0]

    if (canonicalChosenLocale === 'en') {
      canonicalChosenLocale = 'en-GB'
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
