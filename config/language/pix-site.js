import { config } from '../environment'

export const availableLocales = [
  {
    code: 'fr',
    file: 'fr.js',
  },
  {
    code: 'en-gb',
    file: 'en-gb.js',
  },
  {
    code: 'fr-be',
    file: 'fr-be.js',
  },
  {
    code: 'fr-fr',
    file: 'fr-fr.js',
  },
]

export const language = {
  menu: [
    {
      name: 'international',
      icon: 'globe-europe.svg',
      target: null,
      sub: null,
      children: [
        {
          name: 'french',
          lang: 'fr',
          icon: 'icon',
          target: '/fr',
          domain: config.domain.international,
          sub: null,
        },
        {
          name: 'english',
          lang: 'en-gb',
          icon: 'icon',
          target: '/en-gb',
          domain: config.domain.international,
          sub: null,
        },
      ],
    },
    {
      name: 'france',
      lang: 'fr-fr',
      icon: 'flag-fr.svg',
      target: '/',
      domain: config.domain.french,
      sub: null,
    },
    {
      name: 'fwb-acronym',
      lang: 'fr-be',
      icon: 'flag-be.svg',
      target: '/fr-be',
      domain: config.domain.international,
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
