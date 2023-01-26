import {
  removeHostIfCurrentSite,
  getPathLocale,
  isCurrentLocaleURL,
} from '~/components/PixPrismicLink'
import { SITES_PRISMIC_TAGS } from '~/services/available-sites'

describe('Component: PixPrismicLink', () => {
  describe('#removeHostIfCurrentSite', () => {
    let locale

    describe('when current site is pix.fr', () => {
      beforeEach(() => {
        process.env.SITE = SITES_PRISMIC_TAGS.PIX_SITE
        locale = 'fr-fr'
      })

      it('should remove host from URLs for https://pix.fr', () => {
        const urls = [
          ['https://pix.fr/', '/'],
          ['https://pix.fr/pourquoi', '/pourquoi'],
          [
            'https://pix.fr/la/totale?foo=bar#la-precision',
            '/la/totale?foo=bar#la-precision',
          ],
        ]

        for (const [url, expected] of urls) {
          expect(removeHostIfCurrentSite(url, locale)).toBe(expected)
        }
      })

      it('should not remove host from URLs outside of https://pix.fr', () => {
        const urls = [
          'https://pro.pix.fr/',
          'https://pro.pix.fr/une-page-de-pro',
          'https://pix.org/fr',
          'https://pix.org/fr/une-page-si-t-es-pas-en-france',
          'https://pix.org/fr-be',
          'https://pix.org/fr-be/une-fois',
          'https://pix.org/en',
          'https://pix.org/en/tea-time',
          'https://google.com/',
        ]

        for (const url of urls) {
          expect(removeHostIfCurrentSite(url, locale)).toBe(url)
        }
      })
    })

    describe('when current site is pix.org', () => {
      beforeEach(() => {
        process.env.SITE = SITES_PRISMIC_TAGS.PIX_SITE
        locale = 'fr'
      })

      it('should remove host from URLs for https://pix.org', () => {
        const urls = [
          ['https://pix.org/', '/'],
          ['https://pix.org/fr', '/fr'],
          ['https://pix.org/fr/pourquoi', '/fr/pourquoi'],
          [
            'https://pix.org/fr/la/totale?foo=bar#la-precision',
            '/fr/la/totale?foo=bar#la-precision',
          ],
          ['https://pix.org/fr-be/une-fois', '/fr-be/une-fois'],
          ['https://pix.org/en/tea-time', '/en/tea-time'],
        ]

        for (const [url, expected] of urls) {
          expect(removeHostIfCurrentSite(url, locale)).toBe(expected)
        }
      })

      it('should not remove host from URLs outside of https://pix.org', () => {
        const urls = [
          'https://pro.pix.fr/',
          'https://pro.pix.fr/une-page-de-pro',
          'https://pix.fr',
          'https://pix.fr/une-page-de-la-france',
          'https://google.com/',
        ]

        for (const url of urls) {
          expect(removeHostIfCurrentSite(url, locale)).toBe(url)
        }
      })
    })

    describe('when current site is pro.pix.fr', () => {
      beforeEach(() => {
        process.env.SITE = SITES_PRISMIC_TAGS.PIX_PRO
        locale = 'fr-fr'
      })

      it('should remove host from URLs under https://pro.pix.fr', () => {
        const urls = [
          ['https://pro.pix.fr/', '/'],
          ['https://pro.pix.fr/une-page-de-pro', '/une-page-de-pro'],
        ]

        for (const [url, expected] of urls) {
          expect(removeHostIfCurrentSite(url, locale)).toBe(expected)
        }
      })

      it('should not remove host from URLs outside of https://pro.pix.fr', () => {
        const urls = [
          'https://pix.fr',
          'https://pix.fr/une-page-de-la-france',
          'https://pix.org/',
          'https://pix.org/fr',
          'https://pix.org/fr/pourquoi',
          'https://pix.org/fr-be/une-fois',
          'https://pix.org/en/tea-time',
          'https://google.com/',
        ]

        for (const url of urls) {
          expect(removeHostIfCurrentSite(url, locale)).toBe(url)
        }
      })
    })

    describe('when current site is pro.pix.org', () => {
      beforeEach(() => {
        process.env.SITE = SITES_PRISMIC_TAGS.PIX_PRO
        locale = 'fr'
      })

      it('should remove host from URLs under https://pro.pix.org', () => {
        const urls = [
          ['https://pro.pix.org/', '/'],
          ['https://pro.pix.org/une-page-de-pro', '/une-page-de-pro'],
        ]

        for (const [url, expected] of urls) {
          expect(removeHostIfCurrentSite(url, locale)).toBe(expected)
        }
      })

      it('should not remove host from URLs outside of https://pro.pix.org', () => {
        const urls = [
          'https://pix.fr',
          'https://pix.fr/une-page-de-la-france',
          'https://pix.org/',
          'https://pix.org/fr',
          'https://pix.org/fr/pourquoi',
          'https://pix.org/fr-be/une-fois',
          'https://pix.org/en/tea-time',
          'https://google.com/',
        ]

        for (const url of urls) {
          expect(removeHostIfCurrentSite(url, locale)).toBe(url)
        }
      })
    })
  })

  describe('#getPathLocale', () => {
    let $i18n

    beforeEach(() => {
      $i18n = {
        localeCodes: ['fr-fr', 'fr', 'fr-be', 'en'],
        defaultLocale: 'fr-fr',
      }
    })

    it('should extract the locale from the given path', () => {
      const paths = [
        ['/fr', 'fr'],
        ['/fr-be', 'fr-be'],
        ['/en', 'en'],
        ['/fr/path', 'fr'],
        ['/fr-be/path', 'fr-be'],
        ['/en/path', 'en'],
        ['/fr/path/subpath', 'fr'],
        ['/fr-be/path/subpath', 'fr-be'],
        ['/en/path/subpath', 'en'],
      ]

      for (const [path, expectedLocale] of paths) {
        expect(getPathLocale(path, $i18n)).toBe(expectedLocale)
      }
    })

    it("should return undefined if the given path doesn't contain a locale", () => {
      const paths = ['/', '/path', '/en-us']

      for (const path of paths) {
        expect(getPathLocale(path, $i18n)).toBeUndefined()
      }
    })

    it('should return undefined if the given path contains default locale', () => {
      const paths = ['/fr-fr', '/fr-fr/path', '/fr-fr/path/subpath']

      for (const path of paths) {
        expect(getPathLocale(path, $i18n)).toBeUndefined()
      }
    })
  })

  describe('#isCurrentLocaleURL', () => {
    let $i18n

    describe('pix.fr', () => {
      beforeEach(() => {
        $i18n = {
          localeCodes: ['fr-fr'],
          defaultLocale: 'fr-fr',
        }
      })

      it('should return false if the given URL is absolute', () => {
        const urls = [
          'https://pix.fr',
          'https://pix.fr/une-page',
          'https://pix.org/fr',
          'https://google.com/',
        ]

        for (const url of urls) {
          expect(isCurrentLocaleURL(url, $i18n)).toBe(false)
        }
      })

      describe('when current locale is fr-fr', () => {
        beforeEach(() => {
          $i18n.locale = 'fr-fr'
        })

        it('should return true everytime', () => {
          const urls = [
            '/',
            '/une-page',
            '/path/subpath',
            '/fr-ca/tabernacle',
            '/fr',
            '/en',
            '/fr/une-page',
            '/en/path/subpath',
          ]

          for (const url of urls) {
            expect(isCurrentLocaleURL(url, $i18n)).toBe(true)
          }
        })
      })
    })

    describe('pix.org', () => {
      beforeEach(() => {
        $i18n = {
          localeCodes: ['fr', 'fr-be', 'en'],
          defaultLocale: 'fr',
        }
      })

      it('should return false if the given URL is absolute', () => {
        const urls = [
          'https://pix.fr',
          'https://pix.fr/une-page',
          'https://pix.org/fr',
          'https://google.com/',
        ]

        for (const url of urls) {
          expect(isCurrentLocaleURL(url, $i18n)).toBe(false)
        }
      })

      describe('when current locale is fr', () => {
        beforeEach(() => {
          $i18n.locale = 'fr'
        })

        it('should return true if the given URL is in fr', () => {
          const urls = [
            '/fr',
            '/fr/une-page',
            '/fr/path/subpath',
            '/fr/fr-ca/tabernacle',
          ]

          for (const url of urls) {
            expect(isCurrentLocaleURL(url, $i18n)).toBe(true)
          }
        })

        it('should return false if the given URL is outside of fr', () => {
          const urls = ['/fr-be', '/en', '/fr-be/une-page', '/en/path/subpath']

          for (const url of urls) {
            expect(isCurrentLocaleURL(url, $i18n)).toBe(false)
          }
        })
      })

      describe('when current locale is fr-be', () => {
        beforeEach(() => {
          $i18n.locale = 'fr-be'
        })

        it('should return true if the given URL is in fr-be', () => {
          const urls = ['/fr-be', '/fr-be/une-fois', '/fr-be/path/subpath']

          for (const url of urls) {
            expect(isCurrentLocaleURL(url, $i18n)).toBe(true)
          }
        })

        it('should return false if the given URL is outside of fr-be', () => {
          const urls = [
            '/',
            '/une-page',
            '/path/subpath',
            '/fr',
            '/en',
            '/fr/une-page',
            '/en/path/subpath',
          ]

          for (const url of urls) {
            expect(isCurrentLocaleURL(url, $i18n)).toBe(false)
          }
        })
      })
    })
  })
})
