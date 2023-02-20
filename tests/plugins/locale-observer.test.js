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

  describe('when user switch locale', () => {
    describe('when not isDev', () => {
      describe('when no cookie', () => {
        it('saves locale cookie', () => {
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
            'locale=en-gb; path=/; max-age=31536000; domain=pix.org'
          )
        })
      })

      describe('when cookie', () => {
        it('saves locale cookie', () => {
          // given
          document.cookie = 'locale=en-gb; path=/; max-age=31536000'
          const oldLocale = 'en-gb'
          const newLocale = 'fr'
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
            'locale=fr; path=/; max-age=31536000; domain=pix.org'
          )
        })
      })
    })
  })

  describe('when isDev', () => {
    describe('when no cookie', () => {
      it('saves locale cookie', () => {
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
          'locale=en-gb; path=/; max-age=31536000'
        )
      })
    })

    describe('when cookie', () => {
      it('saves locale cookie', () => {
        // given
        document.cookie = 'locale=en-gb; path=/; max-age=31536000'
        const oldLocale = 'en-gb'
        const newLocale = 'fr'
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
        expect(document.cookie).toEqual('locale=fr; path=/; max-age=31536000')
      })
    })
  })
})
