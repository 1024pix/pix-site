import {
  getLocalesForCurrentSite,
  localization,
} from '~/config/localization/pix-site'
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
        code: 'en',
        file: 'en.js',
      },
      {
        code: 'fr-be',
        file: 'fr-be.js',
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
  it('should return all menu entries for pix-site', () => {
    // given
    const expectedResult = [
      {
        name: 'international',
        icon: 'globe-europe.svg',
        children: [
          {
            name: 'french',
            localeCode: 'fr',
            icon: 'icon',
          },
          {
            name: 'english',
            localeCode: 'en',
            icon: 'icon',
          },
        ],
      },
      {
        name: 'fwb',
        localeCode: 'fr-be',
        icon: 'flag-be.svg',
      },
      {
        name: 'france',
        localeCode: 'fr-fr',
        icon: 'flag-fr.svg',
      },
    ]

    // when & then
    expect(localization.menu).toEqual(expectedResult)
  })

  it('should return all locales', () => {
    // given
    const expectedResult = [
      {
        code: 'fr',
        prismicLang: 'fr',
        file: 'fr.js',
        domain: config.domain.international,
        name: 'International Français',
        icon: 'globe-europe.svg',
      },
      {
        code: 'en',
        prismicLang: 'en-gb',
        file: 'en.js',
        domain: config.domain.international,
        name: 'International English',
        icon: 'globe-europe.svg',
      },
      {
        code: 'fr-be',
        prismicLang: 'fr-be',
        file: 'fr-be.js',
        domain: config.domain.international,
        name: 'Fédération Wallonie-Bruxelles',
        icon: 'flag-be.svg',
      },
      {
        code: 'fr-fr',
        prismicLang: 'fr-fr',
        file: 'fr-fr.js',
        domain: config.domain.french,
        name: 'France',
        icon: 'flag-fr.svg',
      },
    ]

    // when & then
    expect(localization.locales).toEqual(expectedResult)
  })
})
