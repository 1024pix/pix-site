import { localization } from '~/config/localization'

export function getLocaleFromCookie() {
  const localeCookie = document.cookie
    .split('; ')
    .find((item) => item.startsWith('locale'))

  console.log('document', document)

  console.log({ localeCookie })

  if (!localeCookie) return null

  try {
    const chosenLocale = localeCookie.split('=')[1]

    console.log({ chosenLocale })

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
