import getRoutesToGenerate from '@/services/get-routes-to-generate'
import prismic from 'prismic-javascript'
jest.mock('prismic-javascript')

describe('#getRoutesToGenerate', () => {
  test('it should fetch routes to generate', async () => {
    // Given
    const expected = ['route-to-generate']
    const prismicApi = {
      query: jest
        .fn()
        .mockResolvedValueOnce({ results: [{ uid: 'route-to-generate' }] }),
    }
    prismic.getApi = () => prismicApi

    // When
    const result = await getRoutesToGenerate(prismic)

    // Then
    expect(prismicApi.query).toBeCalledWith('', { pageSize: 100, page: 1 })
    expect(result).toEqual(expected)
  })

  test('it should not return null routes', async () => {
    // Given
    const expected = ['route-to-generate']
    const prismicApi = {
      query: jest.fn().mockReturnValueOnce({
        results: [{ uid: 'route-to-generate' }, {}, { uid: null }],
      }),
    }
    prismic.getApi = () => prismicApi

    // When
    const result = await getRoutesToGenerate(prismic)

    // Then
    expect(prismicApi.query).toBeCalledWith('', { pageSize: 100, page: 1 })
    expect(result).toEqual(expected)
  })

  test('it should handle pagination', async () => {
    // Given
    const expected = [
      'route-to-generate-from-first-page',
      'route-to-generate-from-second-page',
    ]

    const firstPage = {
      total_pages: 2,
      results: [{ uid: 'route-to-generate-from-first-page' }],
    }
    const secondPage = {
      total_pages: 2,
      results: [{ uid: 'route-to-generate-from-second-page' }],
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
    expect(prismicApi.query).toBeCalledWith('', { pageSize: 100, page: 1 })
    expect(prismicApi.query).toBeCalledWith('', { pageSize: 100, page: 2 })
    expect(result).toEqual(expected)
  })
})
