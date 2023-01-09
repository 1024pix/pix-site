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
    code: 'en-gb',
    file: 'en-gb.js',
    domain: config.domain.international,
    name: 'International English',
    icon: 'globe-europe.svg',
  },
  {
    code: 'fr-be',
    file: 'fr-be.js',
    domain: config.domain.international,
    name: 'FWB',
    icon: 'flag-be.svg',
  },
  {
    code: 'fr-fr',
    file: 'fr-fr.js',
    domain: config.domain.french,
    name: 'France',
    icon: 'flag-fr.svg',
  },
]

export const language = {
  menu: [
    {
      name: 'international',
      icon: 'globe-europe.svg',
      subtitle: null,
      children: [
        {
          name: 'french',
          localeCode: 'fr',
          icon: 'icon',
          subtitle: null,
        },
        {
          name: 'english',
          localeCode: 'en-gb',
          icon: 'icon',
          subtitle: null,
        },
      ],
    },
    {
      name: 'france',
      localeCode: 'fr-fr',
      icon: 'flag-fr.svg',
      subtitle: null,
    },
    {
      name: 'fwb-acronym',
      localeCode: 'fr-be',
      icon: 'flag-be.svg',
      subtitle: 'fwb',
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
