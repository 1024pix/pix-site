import { SITES_PRISMIC_TAGS } from '../services/available-sites'

export const language = {
  menu: [
    {
      name: 'international',
      icon: 'globe-europe.svg',
      target: false,
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
      lang: '',
      icon: 'flag-fr.svg',
      target: 'https://www.pix.fr',
      sub: null,
    },
    {
      name: 'fwb-acronym',
      lang: 'fr-be',
      icon: 'flag-be.svg',
      target: '/fr-be',
      sub: 'fwb',
    },
  ],
  locales:
    process.env.SITE === SITES_PRISMIC_TAGS.PIX_PRO
      ? [
          {
            code: 'fr-fr',
            file: 'fr-fr.js',
          },
        ]
      : [
          {
            code: 'fr-fr',
            file: 'fr-fr.js',
          },
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
        ],
}
