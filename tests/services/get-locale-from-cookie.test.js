const { getLocaleFromCookie } = require('~/services/get-locale-from-cookie')

jest.mock('~/config/environment', () => {
  return {
    config: {
      isPixSite: true,
      domain: {
        french: 'pix.fr',
        international: 'pix.org',
      },
    },
  }
})

describe('getLocaleFromCookie', () => {
  beforeEach(() => {
    let cookieJar = ''

    jest.spyOn(document, 'cookie', 'set').mockImplementation((cookie) => {
      cookieJar = cookie
    })
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => cookieJar)
  })
  describe('when there is no cookie', () => {
    test('returns no locale', () => {
      // given
      document.cookie = ''
      // when
      const chosenLocale = getLocaleFromCookie()

      // then
      expect(chosenLocale).toBe(null)
    })
  })

  describe('when there is a locale cookie', () => {
    describe('with value being only one subtag', () => {
      test('returns the proper locale', () => {
        // given
        document.cookie = 'foo=bar; locale=fr'

        // when
        const chosenLocale = getLocaleFromCookie()

        // then
        expect(chosenLocale).toBe('fr')
      })
    })

    describe('with value equal to en-GB or in lowercase format', () => {
      const locales = ['en-GB', 'en-gb']

      locales.forEach((locale) => {
        test('returns the proper locale', () => {
          // given
          document.cookie = `foo=bar; locale=${locale}`

          // when
          const chosenLocale = getLocaleFromCookie()

          // then
          expect(chosenLocale).toBe('en')
        })
      })
    })

    describe('with value being in canonical BCP 47 format', () => {
      test('returns the proper locale in lowercase', () => {
        // given
        document.cookie = 'foo=bar; locale=fr-BE'

        // when
        const chosenLocale = getLocaleFromCookie()

        // then
        expect(chosenLocale).toBe('fr-be')
      })
    })

    describe('in lowercase', () => {
      test('returns the proper locale', () => {
        // given
        document.cookie = 'foo=bar; locale=fr-be'
        // when
        const chosenLocale = getLocaleFromCookie()

        // then
        expect(chosenLocale).toBe('fr-be')
      })
    })
  })

  describe('with a crafted cookie', () => {
    test('cookie value is ignored', () => {
      // given
      document.cookie = 'foo=bar; locale=1234-crafted-cookie'

      // when
      const chosenLocale = getLocaleFromCookie()

      // then
      expect(chosenLocale).toBe(null)
    })
  })
})
