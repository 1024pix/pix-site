import { config } from '../environment'

export const availableLocales = [
  {
    code: 'fr',
    file: 'fr.js',
    domain: config.domain.international,
    name: 'International Français',
    icon: 'globe-europe.svg',
  },
  {
    code: 'en',
    file: 'en.js',
    domain: config.domain.international,
    name: 'International English',
    icon: 'globe-europe.svg',
  },
  {
    code: 'fr-fr',
    file: 'fr-fr.js',
    domain: config.domain.french,
    name: 'France',
    icon: 'flag-fr.svg',
  },
]
export const localization = {
  menu: [
    {
      name: 'international',
      icon: 'globe-europe.svg',
      children: [
        {
          name: 'french',
          localeCode: 'fr',
          icon: 'globe-europe.svg',
        },
        {
          name: 'english',
          localeCode: 'en',
          icon: 'globe-europe.svg',
        },
      ],
    },
    {
      name: 'france',
      localeCode: 'fr-fr',
      icon: 'flag-fr.svg',
    },
  ],
  menuForMobile: [],
  locales: availableLocales,
  localesForCurrentSite: getLocalesForCurrentSite(),
}

localization.menuForMobile = localization.menu.flatMap(
  (menuItem) => menuItem.children || menuItem
)

export function getLocalesForCurrentSite() {
  if (config.isFrenchDomain) {
    return [{ code: 'fr-fr', file: 'fr-fr.js' }]
  }

  return availableLocales.filter((locale) => locale.code !== 'fr-fr')
}
