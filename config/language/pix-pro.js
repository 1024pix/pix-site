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
          isOnPixOrg: true,
          sub: null,
        },
        {
          name: 'english',
          lang: 'en-gb',
          icon: 'icon',
          target: '/en-gb',
          isOnPixOrg: true,
          sub: null,
        },
      ],
    },
    {
      name: 'france',
      lang: 'fr-fr',
      icon: 'flag-fr.svg',
      target: '/',
      isOnPixOrg: false,
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
