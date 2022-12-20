import { getLocalesForCurrentSite, language } from '~/config/language/pix-pro'
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
        code: 'en-gb',
        file: 'en-gb.js',
      },
    ]

    expect(
      getLocalesForCurrentSite().map(({ code, file }) => {
        return { code, file }
      })
    ).toEqual(expectedLocales)
  })
})

describe('#language', () => {
  it('should return all menu entries for pix-pro', () => {
    // given
    const expectedResult = [
      {
        name: 'international',
        icon: 'globe-europe.svg',
        sub: null,
        children: [
          {
            name: 'french',
            lang: 'fr',
            icon: 'icon',
            sub: null,
          },
          {
            name: 'english',
            lang: 'en-gb',
            icon: 'icon',
            sub: null,
          },
        ],
      },
      {
        name: 'france',
        lang: 'fr-fr',
        icon: 'flag-fr.svg',
        sub: null,
      },
    ]

    // when & then
    expect(language.menu).toEqual(expectedResult)
  })
})
