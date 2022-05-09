import prismic from '@prismicio/client'
import getRoutesToGenerate from '@/services/get-routes-to-generate'
jest.mock('@prismicio/client')

describe('#getRoutesToGenerate', () => {
  let prismicDocPredicatesAt
  let prismicDocPredicatesNot
  const envVar = process.env.SITE

  beforeEach(() => {
    prismic.Predicates.at = jest
      .fn()
      .mockReturnValue(Symbol('prismic-predicates-at'))
    prismic.Predicates.not = jest
      .fn()
      .mockReturnValue(Symbol('prismic-predicates-not'))
    prismicDocPredicatesAt = prismic.Predicates.at()
    prismicDocPredicatesNot = prismic.Predicates.not()
  })

  describe('When fetching Pix Pro pages', () => {
    beforeEach(() => {
      process.env.SITE = 'pix-pro'
    })

    afterEach(() => {
      process.env.SITE = envVar
    })

    test('it should fetch routes to generate document for each lang', async () => {
      // Given
      const expected = [
        '/route-to-generate',
        '/fr/route-to-generate',
        '/en-gb/route-to-generate',
      ]
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
          lang: 'fr-fr',
          pageSize: 100,
          page: 1,
        }
      )
      expect(prismic.Predicates.at).lastCalledWith('document.tags', [
        process.env.SITE,
      ])
      expect(prismic.Predicates.not).lastCalledWith('document.tags', [
        'fragment',
      ])
      expect(result).toEqual(expected)
    })
  })

  describe('When fetching Pix Site pages', () => {
    test('it should fetch routes to generate document for each lang', async () => {
      // Given
      const expected = [
        '/route-to-generate',
        '/fr/route-to-generate',
        '/en-gb/route-to-generate',
      ]
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
        process.env.SITE,
      ])
      expect(prismic.Predicates.not).lastCalledWith('document.tags', [
        'fragment',
      ])
      expect(result).toEqual(expected)
    })

    test('it should filter unhandled languages', async () => {
      // Given
      const expected = [
        '/route-to-generate',
        '/fr/route-to-generate',
        '/en-gb/route-to-generate',
      ]
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
