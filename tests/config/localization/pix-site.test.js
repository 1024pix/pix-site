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
        code: 'en-gb',
        file: 'en-gb.js',
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
        subtitle: null,
        children: [
          {
            name: 'french',
            localeCode: 'fr',
            icon: 'icon',
            subtitle: null,
          },
          {
            name: 'english',
            localeCode: 'en-gb',
            icon: 'icon',
            subtitle: null,
          },
        ],
      },
      {
        name: 'fwb-acronym',
        localeCode: 'fr-be',
        icon: 'flag-be.svg',
        subtitle: 'fwb',
      },
      {
        name: 'france',
        localeCode: 'fr-fr',
        icon: 'flag-fr.svg',
        subtitle: null,
      },
    ]

    // when & then
    expect(localization.menu).toEqual(expectedResult)
  })
})
