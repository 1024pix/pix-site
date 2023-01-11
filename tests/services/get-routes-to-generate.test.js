import prismic from '@prismicio/client'
import getRoutesToGenerate from '@/services/get-routes-to-generate'
import { config } from '~/config/environment'
jest.mock('@prismicio/client')
jest.mock('~/config/environment', () => {
  return {
    config: {
      site: 'pix-site',
      siteDomain: 'pix.fr',
      prismic: { apiEndpoint: 'https://prismic.example.net' },
    },
  }
})
jest.mock('~/config/localization', () => {
  return {
    localization: {
      localesForCurrentSite: [{ code: 'fr-fr' }],
    },
  }
})

describe('#getRoutesToGenerate', () => {
  let prismicDocPredicatesAt
  let prismicDocPredicatesNot

  beforeEach(() => {
    prismic.Predicates.at = jest
      .fn()
      .mockReturnValue(Symbol('prismic-predicates-at'))
    prismic.Predicates.not = jest
      .fn()
      .mockReturnValue(Symbol('prismic-predicates-not'))
    prismicDocPredicatesAt = prismic.Predicates.at()
    prismicDocPredicatesNot = prismic.Predicates.not()
    global.console = { info: jest.fn() }
  })

  describe('When fetching Pix Pro pages', () => {
    beforeEach(() => {
      config.site = 'pix-pro'
      config.siteDomain = 'pix.fr'
    })

    test('it should fetch routes to generate document for each lang', async () => {
      // Given
      const expected = ['/route-to-generate']
      const prismicApi = {
        query: jest.fn().mockResolvedValueOnce({
          results: [
            { uid: 'route-to-generate', lang: 'fr-fr' },
            { uid: 'route-to-generate', lang: 'fr' },
            { uid: 'route-to-generate', lang: 'en-gb' },
          ],
        }),
      }
      prismic.getApi = () => prismicApi

      // When
      const result = await getRoutesToGenerate(prismic)

      // Then
      expect(prismicApi.query).toBeCalledWith(
        [prismicDocPredicatesAt, prismicDocPredicatesNot],
        {
          lang: '*',
          pageSize: 100,
          page: 1,
        }
      )
      expect(prismic.Predicates.at).lastCalledWith('document.tags', [
        config.site,
      ])
      expect(prismic.Predicates.not).lastCalledWith('document.tags', [
        'fragment',
      ])
      expect(result).toEqual(expected)
    })
  })

  describe('When fetching Pix Site pages', () => {
    beforeEach(() => {
      config.site = 'pix-site'
    })
    test('it should fetch routes to generate document for each lang', async () => {
      // Given
      const expected = ['/route-to-generate']
      const prismicApi = {
        query: jest.fn().mockResolvedValueOnce({
          results: [
            { uid: 'route-to-generate', lang: 'fr-fr' },
            { uid: 'route-to-generate', lang: 'fr' },
            { uid: 'route-to-generate', lang: 'en-gb' },
          ],
        }),
      }
      prismic.getApi = () => prismicApi

      // When
      const result = await getRoutesToGenerate(prismic)

      // Then
      expect(prismicApi.query).toBeCalledWith(
        [prismicDocPredicatesAt, prismicDocPredicatesNot],
        {
          lang: '*',
          pageSize: 100,
          page: 1,
        }
      )
      expect(prismic.Predicates.at).lastCalledWith('document.tags', [
        config.site,
      ])
      expect(prismic.Predicates.not).lastCalledWith('document.tags', [
        'fragment',
      ])
      expect(result).toEqual(expected)
    })

    test('it should filter unhandled locales', async () => {
      // Given
      const expected = ['/route-to-generate']
      const prismicApi = {
        query: jest.fn().mockResolvedValueOnce({
          results: [
            { uid: 'route-to-generate', lang: 'fr-fr' },
            { uid: 'route-to-generate', lang: 'fr' },
            { uid: 'route-to-generate', lang: 'en-gb' },
            { uid: 'route-to-generate', lang: 'xh-ZA' },
          ],
        }),
      }
      prismic.getApi = () => prismicApi

      // When
      const result = await getRoutesToGenerate(prismic)

      // Then
      expect(prismicApi.query).toBeCalledWith(
        [prismicDocPredicatesAt, prismicDocPredicatesNot],
        {
          lang: '*',
          pageSize: 100,
          page: 1,
        }
      )
      expect(result).toEqual(expected)
    })

    test('it should not return null routes', async () => {
      // Given
      const expected = ['/route-to-generate']
      const prismicApi = {
        query: jest.fn().mockReturnValueOnce({
          results: [
            { uid: 'route-to-generate', lang: 'fr-fr' },
            {},
            { uid: null },
          ],
        }),
      }
      prismic.getApi = () => prismicApi

      // When
      const result = await getRoutesToGenerate(prismic)

      // Then
      expect(prismicApi.query).toBeCalledWith(
        [prismicDocPredicatesAt, prismicDocPredicatesNot],
        {
          lang: '*',
          pageSize: 100,
          page: 1,
        }
      )
      expect(result).toEqual(expected)
    })

    test('it should handle pagination', async () => {
      // Given
      const expected = [
        '/route-to-generate-from-first-page',
        '/route-to-generate-from-second-page',
      ]

      const firstPage = {
        total_pages: 2,
        results: [{ uid: 'route-to-generate-from-first-page', lang: 'fr-fr' }],
      }
      const secondPage = {
        total_pages: 2,
        results: [{ uid: 'route-to-generate-from-second-page', lang: 'fr-fr' }],
      }

      const prismicApi = {
        query: jest
          .fn()
          .mockResolvedValueOnce(firstPage)
          .mockResolvedValueOnce(secondPage),
      }
      prismic.getApi = () => prismicApi

      // When
      const result = await getRoutesToGenerate(prismic)

      // Then
      expect(prismicApi.query).toBeCalledWith(
        [prismicDocPredicatesAt, prismicDocPredicatesNot],
        {
          lang: '*',
          pageSize: 100,
          page: 1,
        }
      )
      expect(prismicApi.query).toBeCalledWith(
        [prismicDocPredicatesAt, prismicDocPredicatesNot],
        {
          lang: '*',
          pageSize: 100,
          page: 2,
        }
      )
      expect(result).toEqual(expected)
    })
  })
})
