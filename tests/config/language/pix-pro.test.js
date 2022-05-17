import { availableLocale } from '~/config/language/pix-pro'
import { config } from '~/config/environment'

jest.mock('~/config/environment', () => {
  return {
    config: {
      isFrenchDomain: true,
    },
  }
})

describe('#availableLocale', () => {
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
        code: 'en-gb',
        file: 'en-gb.js',
      },
    ]

    expect(availableLocale()).toEqual(expectedLocales)
  })
})
