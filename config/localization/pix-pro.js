import { config } from '../environment'

export const availableLocales = [
  {
    code: 'fr',
    file: 'fr.js',
    domain: config.domain.international,
  },
  {
    code: 'en-gb',
    file: 'en-gb.js',
    domain: config.domain.international,
  },
  {
    code: 'fr-fr',
    file: 'fr-fr.js',
    domain: config.domain.french,
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
          localeCode: 'en-gb',
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
