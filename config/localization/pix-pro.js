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
          icon: 'icon',
        },
        {
          name: 'english',
          localeCode: 'en',
          icon: 'icon',
        },
      ],
    },
    {
      name: 'france',
      localeCode: 'fr-fr',
      icon: 'flag-fr.svg',
    },
  ],
  locales: availableLocales,
  localesForCurrentSite: getLocalesForCurrentSite(),
}

export function getLocalesForCurrentSite() {
  if (config.isFrenchDomain) {
    return [{ code: 'fr-fr', file: 'fr-fr.js' }]
  }

  return availableLocales.filter((locale) => locale.code !== 'fr-fr')
}
