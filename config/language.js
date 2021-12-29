export const languageMenu = [
  {
    name: 'international',
    icon: 'globe-europe.svg',
    target: false,
    sub: null,
    children: [
      {
        name: 'french',
        lang: 'fr-fr',
        icon: 'icon',
        target: true,
        sub: null,
      },
      {
        name: 'english',
        lang: 'en-gb',
        icon: 'icon',
        target: true,
        sub: null,
      },
    ],
  },
  {
    name: 'france',
    lang: 'fr',
    icon: 'flag-fr.svg',
    target: true,
    sub: null,
  },
  {
    name: 'fwb-acronym',
    lang: 'fr-be',
    icon: 'flag-be.svg',
    target: true,
    sub: 'fwb',
  },
]
