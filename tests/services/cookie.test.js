import { getCookie, setCookie } from '~/services/cookie'

jest.mock('~/config/environment', () => ({
  config: {
    siteDomain: 'pix.org',
  },
}))

describe('Services | Cookie', () => {
  beforeEach(() => {
    let cookieJar = ''

    jest.spyOn(document, 'cookie', 'set').mockImplementation((cookie) => {
      cookieJar = cookie
    })
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => cookieJar)
  })
  describe('#getCookie', () => {
    describe('When name in parameter is undefined', () => {
      it('returns null', () => {
        // given & when
        const result = getCookie(null)

        // then
        expect(result).toBeNull()
      })
    })

    describe('When there is no cookie with name in parameter', () => {
      it('returns null', () => {
        // given
        const name = 'foo2'
        document.cookie = 'foo=bar'

        // when
        const result = getCookie(name)

        // then
        expect(result).toBeNull()
      })
    })

    describe('When there is an existing cookie', () => {
      it('returns cookie value', () => {
        // given
        const name = 'foo'
        document.cookie = 'foo=bar'

        // when
        const result = getCookie(name)

        // then
        expect(result).toEqual('bar')
      })
    })
  })

  describe('#setCookie', () => {
    describe('When in development mode', () => {
      it('creates cookie in the cookie storage', () => {
        // given
        document.cookie = ''
        const name = 'test'
        const value = 'test2'
        const isDev = true

        // when
        setCookie(name, value, isDev)

        // then
        expect(document.cookie).toEqual(
          `${name}=${value}; path=/; max-age=31536000; SameSite=Strict`
        )
      })
    })
    describe('When in production mode', () => {
      it('creates cookie in the cookie storage with domain attribute', () => {
        // given
        document.cookie = ''
        const name = 'test'
        const value = 'test2'
        const isDev = false

        // when
        setCookie(name, value, isDev)

        // then
        expect(document.cookie).toEqual(
          `${name}=${value}; path=/; max-age=31536000; SameSite=Strict; domain=pix.org`
        )
      })
    })
  })
})
