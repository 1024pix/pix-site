import { getLocalesForCurrentSite, language } from '~/config/language/pix-site'
import { config } from '~/config/environment'

jest.mock('~/config/environment', () => {
  return {
    config: {
      isFrenchDomain: true,
    },
  }
})

describe('#getLocalesForCurrentSite', () => {
  it(`should return only fr-fr when siteDomain is pix.fr`, () => {
    config.isFrenchDomain = true

    const expectedLocales = [{ code: 'fr-fr', file: 'fr-fr.js' }]

    expect(getLocalesForCurrentSite()).toEqual(expectedLocales)
  })

  it(`should return all locales except fr-fr when siteDomain is pix.org`, () => {
    config.isFrenchDomain = false

    const expectedLocales = [
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
    ]

    expect(getLocalesForCurrentSite()).toEqual(expectedLocales)
  })
})

describe('#language', () => {
  it('should return all menu entries for pix-site', () => {
    // given
    const expectedResult = [
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
      {
        name: 'fwb-acronym',
        lang: 'fr-be',
        icon: 'flag-be.svg',
        target: '/fr-be',
        isOnPixOrg: true,
        sub: 'fwb',
      },
    ]

    // when & then
    expect(language.menu).toEqual(expectedResult)
  })
})
