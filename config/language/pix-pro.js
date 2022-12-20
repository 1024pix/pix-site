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
          sub: null,
        },
        {
          name: 'english',
          lang: 'en-gb',
          icon: 'icon',
          target: '/en-gb',
          sub: null,
        },
      ],
    },
    {
      name: 'france',
      lang: 'fr-fr',
      icon: 'flag-fr.svg',
      target: '/',
      sub: null,
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
