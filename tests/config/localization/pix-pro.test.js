import {
  getLocalesForCurrentSite,
  localization,
} from '~/config/localization/pix-pro'
import { config } from '~/config/environment'

jest.mock('~/config/environment', () => {
  return {
    config: {
      isFrenchDomain: true,
      domain: {
        french: 'pix.fr',
        international: 'pix.org',
      },
    },
  }
})

describe('#getLocalesForCurrentSite', () => {
  it(`should return only fr-fr when siteDomain is pix.fr`, () => {
    config.isFrenchDomain = true

    const expectedLocales = [
      {
        code: 'fr-fr',
        file: 'fr-fr.js',
      },
    ]

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
        code: 'en',
        file: 'en.js',
      },
    ]

    expect(
      getLocalesForCurrentSite().map(({ code, file }) => {
        return { code, file }
      })
    ).toEqual(expectedLocales)
  })
})

describe('#localization', () => {
  describe('Desktop menu', function () {
    it('return all menu entries for pix-pro', () => {
      // when & then
      const expectedResult = [
        {
          name: 'international',
          icon: 'globe-europe.svg',
          children: [
            {
              name: 'french',
              localeCode: 'fr',
              icon: 'globe-europe.svg',
            },
            {
              name: 'english',
              localeCode: 'en',
              icon: 'globe-europe.svg',
            },
          ],
        },
        {
          name: 'france',
          localeCode: 'fr-fr',
          icon: 'flag-fr.svg',
        },
      ]
      expect(localization.menu).toEqual(expectedResult)
    })
  })

  describe('Mobile menu', function () {
    it('returns all menu entries for pix-pro', () => {
      // when & then
      const expectedResult = [
        {
          name: 'french',
          localeCode: 'fr',
          icon: 'globe-europe.svg',
        },
        {
          name: 'english',
          localeCode: 'en',
          icon: 'globe-europe.svg',
        },
        {
          name: 'france',
          localeCode: 'fr-fr',
          icon: 'flag-fr.svg',
        },
      ]
      expect(localization.menuForMobile).toEqual(expectedResult)
    })
  })
})
