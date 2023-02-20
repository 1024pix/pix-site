import { getBaseUrl } from '~/config/url'

describe('getBaseUrl', () => {
  describe('when in client side', () => {
    it('should return a formatted base url', () => {
      // given
      const expectedBaseUrl = 'http://localhost:7000'
      const host = 'localhost:7000'
      const context = {
        isDev: false,
        req: {
          headers: {
            host,
          },
        },
      }

      process.server = false
      Object.defineProperty(window, 'location', {
        writable: true,
        value: { origin: expectedBaseUrl },
      })

      // when
      const result = getBaseUrl(context)

      // then
      expect(result).toEqual(expectedBaseUrl)
    })
  })
  describe('when in server side', () => {
    describe('when in dev mode', () => {
      it('should return a formatted base url with http protocol', () => {
        const expectedBaseUrlInDevMode = 'http://localhost:7000'
        const host = 'localhost:7000'
        const isDev = true
        const context = {
          isDev,
          req: {
            headers: {
              host,
            },
          },
        }

        process.server = true

        // when
        const result = getBaseUrl(context)

        // then
        expect(result).toEqual(expectedBaseUrlInDevMode)
      })
    })
    describe('when in production mode', () => {
      it('should return a formatted base url with https protocol', () => {
        const expectedBaseUrlInProdMode = 'https://localhost:7000'
        const host = 'localhost:7000'
        const isDev = false
        const context = {
          isDev,
          req: {
            headers: {
              host,
            },
          },
        }

        process.server = true

        // when
        const result = getBaseUrl(context)

        // then
        expect(result).toEqual(expectedBaseUrlInProdMode)
      })
    })
  })
})
