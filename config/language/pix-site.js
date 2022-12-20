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
    code: 'fr-be',
    file: 'fr-be.js',
    domain: config.domain.international,
  },
  {
    code: 'fr-fr',
    file: 'fr-fr.js',
    domain: config.domain.french,
  },
]

export const language = {
  menu: [
    {
      name: 'international',
      icon: 'globe-europe.svg',
      sub: null,
      children: [
        {
          name: 'french',
          lang: 'fr',
          icon: 'icon',
          sub: null,
        },
        {
          name: 'english',
          lang: 'en-gb',
          icon: 'icon',
          sub: null,
        },
      ],
    },
    {
      name: 'france',
      lang: 'fr-fr',
      icon: 'flag-fr.svg',
      sub: null,
    },
    {
      name: 'fwb-acronym',
      lang: 'fr-be',
      icon: 'flag-be.svg',
      sub: 'fwb',
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
