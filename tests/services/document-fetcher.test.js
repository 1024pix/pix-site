import prismic from 'prismic-javascript'
import { documentFetcher } from '~/services/document-fetcher'

jest.mock('prismic-javascript')

describe('DocumentFetcher', () => {
  test('it should get employers page with distributors informations', async () => {
    // Given
    const expected = { uid: 'navigation' }
    const prismicApi = {
      getSingle: jest.fn(() => ({ uid: 'navigation' })),
    }
    prismic.api = prismicApi
    // When
    const result = await documentFetcher(prismic).getEmployers()
    // Then
    expect(prismicApi.getSingle).toBeCalledWith('employers', {
      lang: 'fr-fr',
      fetchLinks: [
        'distributor_item.description',
        'distributor_item.footer',
        'distributor_item.link',
        'distributor_item.logo',
        'distributor_item.name',
      ],
    })
    expect(result).toEqual(expected)
  })

  test('it should get simplePage by UID', async () => {
    // Given
    const expectedValue = Symbol('VALUE')
    const expectedPredicatesAtValue = Symbol('AT')
    const uid = Symbol('UID')
    const getSimplePageByUidMock = () => ({ results: [expectedValue] })
    const getSlicesPageByUidMock = () => ({ results: [] })
    const getFormPageByUidMock = () => ({ results: [] })
    const prismicApi = {
      query: jest
        .fn()
        .mockImplementationOnce(getSimplePageByUidMock)
        .mockImplementationOnce(getSlicesPageByUidMock)
        .mockImplementationOnce(getFormPageByUidMock),
    }
    prismic.api = prismicApi

    const prismicPredicates = {
      at: jest.fn(() => expectedPredicatesAtValue),
    }
    prismic.predicates = prismicPredicates

    // When
    const response = await documentFetcher(prismic).getPageByUid(uid)

    // Then
    expect(prismicApi.query).toBeCalledWith(expectedPredicatesAtValue, {
      lang: 'fr-fr',
    })
    expect(prismicPredicates.at).toBeCalledWith('my.simple_page.uid', uid)
    expect(prismicPredicates.at).toBeCalledWith('my.slices_page.uid', uid)
    expect(prismicPredicates.at).toBeCalledWith('my.form_page.uid', uid)
    expect(response).toEqual(expectedValue)
  })

  test('#findByType', async () => {
    // Given
    const type = 'main_navigation'
    const expectedValue = [
      { type: 'main_navigation', navigation_for: 'pix-site' },
      { type: 'main_navigation', navigation_for: 'pix-pro' },
    ]
    const expectedPredicatesAtValue = Symbol('AT')
    const findMock = () => ({ results: expectedValue })
    const prismicApi = {
      query: jest.fn().mockImplementationOnce(findMock),
    }
    prismic.api = prismicApi

    const prismicPredicates = {
      at: jest.fn(() => expectedPredicatesAtValue),
    }
    prismic.predicates = prismicPredicates

    // When
    const response = await documentFetcher(prismic).findByType(type)

    // Then
    expect(prismicApi.query).toBeCalledWith(expectedPredicatesAtValue, {
      lang: 'fr-fr',
    })
    expect(prismicPredicates.at).toBeCalledWith('document.type', type)
    expect(response).toEqual(expectedValue)
  })
})
