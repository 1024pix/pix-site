import localeObserver from '~/plugins/locale-observer'

jest.mock('~/config/environment', () => ({
  config: {
    siteDomain: 'pix.org',
  },
}))

describe('Plugins | locale-observer', () => {
  beforeEach(() => {
    let cookieJar = ''

    jest.spyOn(document, 'cookie', 'set').mockImplementation((cookie) => {
      cookieJar = cookie
    })
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => cookieJar)
  })

  describe('when in development mode', () => {
    describe('when user choose a locale', () => {
      it('saves locale in the cookie storage', () => {
        // given
        document.cookie = ''
        const oldLocale = ''
        const newLocale = 'fr-be'
        const context = {
          isDev: true,
          app: {
            i18n: {},
          },
          route: {
            path: '/',
          },
        }

        // when
        localeObserver(context)
        context.app.i18n.onBeforeLanguageSwitch(oldLocale, newLocale)

        // then
        expect(document.cookie).toEqual(
          'locale=fr-BE; path=/; max-age=31536000; SameSite=Strict'
        )
      })
    })

    describe('when user switch locale', () => {
      it('saves locale cookie', () => {
        // given
        document.cookie = 'locale=fr; path=/; max-age=31536000; SameSite=Strict'
        const oldLocale = 'fr'
        const newLocale = 'fr-be'
        const context = {
          isDev: true,
          app: {
            i18n: {},
          },
          route: {
            path: '/',
          },
        }

        // when
        localeObserver(context)
        context.app.i18n.onBeforeLanguageSwitch(oldLocale, newLocale)

        // then
        expect(document.cookie).toEqual(
          'locale=fr-BE; path=/; max-age=31536000; SameSite=Strict'
        )
      })
    })

    describe('when user choose "en-gb" as locale', () => {
      it('saves locale cookie with "en" value in the cookie storage', () => {
        // given
        document.cookie = ''
        const oldLocale = ''
        const newLocale = 'en-gb'
        const context = {
          isDev: true,
          app: {
            i18n: {},
          },
          route: {
            path: '/',
          },
        }

        // when
        localeObserver(context)
        context.app.i18n.onBeforeLanguageSwitch(oldLocale, newLocale)

        // then
        expect(document.cookie).toEqual(
          'locale=en; path=/; max-age=31536000; SameSite=Strict'
        )
      })
    })
  })

  describe('when in production mode', () => {
    describe('when user choose a locale', () => {
      it('saves locale in the cookie storage', () => {
        // given
        document.cookie = ''
        const oldLocale = ''
        const newLocale = 'fr-be'
        const context = {
          app: {
            i18n: {},
          },
          route: {
            path: '/',
          },
        }

        // when
        localeObserver(context)
        context.app.i18n.onBeforeLanguageSwitch(oldLocale, newLocale)

        // then
        expect(document.cookie).toEqual(
          'locale=fr-BE; path=/; max-age=31536000; SameSite=Strict; domain=pix.org'
        )
      })
    })

    describe('when user switch locale', () => {
      it('saves locale cookie', () => {
        // given
        document.cookie = 'locale=fr; path=/; max-age=31536000; SameSite=Strict'
        const oldLocale = 'fr'
        const newLocale = 'fr-be'
        const context = {
          app: {
            i18n: {},
          },
          route: {
            path: '/',
          },
        }

        // when
        localeObserver(context)
        context.app.i18n.onBeforeLanguageSwitch(oldLocale, newLocale)

        // then
        expect(document.cookie).toEqual(
          'locale=fr-BE; path=/; max-age=31536000; SameSite=Strict; domain=pix.org'
        )
      })
    })

    describe('when user choose "en-gb" as locale', () => {
      it('saves locale cookie with "en" value in the cookie storage', () => {
        // given
        document.cookie = ''
        const oldLocale = ''
        const newLocale = 'en-gb'
        const context = {
          app: {
            i18n: {},
          },
          route: {
            path: '/',
          },
        }

        // when
        localeObserver(context)
        context.app.i18n.onBeforeLanguageSwitch(oldLocale, newLocale)

        // then
        expect(document.cookie).toEqual(
          'locale=en; path=/; max-age=31536000; SameSite=Strict; domain=pix.org'
        )
      })
    })
  })
})
