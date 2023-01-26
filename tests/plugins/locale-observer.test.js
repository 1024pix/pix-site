import localeObserver from '~/plugins/locale-observer'

describe('Plugins | locale-observer', () => {
  beforeEach(() => {
    let cookieJar = ''

    jest.spyOn(document, 'cookie', 'set').mockImplementation((cookie) => {
      cookieJar = cookie
    })
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => cookieJar)
  })

  describe('when user switch locale', () => {
    describe('when no cookie', () => {
      it('save locale cookie', () => {
        // given
        document.cookie = ''
        const oldLocale = ''
        const newLocale = 'en'
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
        expect(document.cookie).toEqual('locale=en; path=/; max-age=31536000')
      })
    })

    describe('when cookie', () => {
      it('save locale cookie', () => {
        // given
        document.cookie = 'locale=en; path=/; max-age=31536000'
        const oldLocale = 'en'
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
        expect(document.cookie).toEqual('locale=fr; path=/; max-age=31536000')
      })
    })
  })
})
