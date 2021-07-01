import getRoutesToGenerate from '@/services/get-routes-to-generate'
import prismic from '@prismicio/client'
jest.mock('@prismicio/client')

describe('#getRoutesToGenerate', () => {
  const prismicDocPredicates = prismic.Predicates.any('document.type', [
    'simple_page',
    'form_page',
  ])

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
    expect(prismicApi.query).toBeCalledWith(prismicDocPredicates, {
      lang: '*',
      pageSize: 100,
      page: 1,
    })
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
    expect(prismicApi.query).toBeCalledWith(prismicDocPredicates, {
      lang: '*',
      pageSize: 100,
      page: 1,
    })
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
    expect(prismicApi.query).toBeCalledWith(prismicDocPredicates, {
      lang: '*',
      pageSize: 100,
      page: 1,
    })
    expect(prismicApi.query).toBeCalledWith(prismicDocPredicates, {
      lang: '*',
      pageSize: 100,
      page: 2,
    })
    expect(result).toEqual(expected)
  })
})
