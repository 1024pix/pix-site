import { availableLocale } from '~/config/language'
import { config } from '~/config/environment'

jest.mock('~/config/environment', () => {
  return {
    config: {
      isFrenchDomain: true,
      isPixSite: true,
    },
  }
})

describe('#availableLocale', () => {
  describe('when site is Pix Pro', () => {
    beforeEach(() => {
      config.isPixSite = false
    })

    const testCases = [{ siteDomain: 'pix.fr' }, { siteDomain: 'pix.org' }]

    testCases.forEach(({ siteDomain }) => {
      it(`should return only fr-fr when siteDomain: ${siteDomain}`, () => {
        const expectedLocales = [
          {
            code: 'fr-fr',
            file: 'fr-fr.js',
          },
        ]

        expect(availableLocale()).toEqual(expectedLocales)
      })
    })
  })

  describe('when site is Pix Site', () => {
    beforeEach(() => {
      config.isPixSite = true
    })

    it(`should return only fr-fr when siteDomain is pix.fr`, () => {
      config.isFrenchDomain = true

      const expectedLocales = [
        {
          code: 'fr-fr',
          file: 'fr-fr.js',
        },
      ]

      expect(availableLocale()).toEqual(expectedLocales)
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

      expect(availableLocale()).toEqual(expectedLocales)
    })
  })
})
