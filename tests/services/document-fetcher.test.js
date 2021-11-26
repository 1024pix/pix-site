import prismic from '@prismicio/client'
import { documentFetcher, DOCUMENTS } from '~/services/document-fetcher'

jest.mock('@prismicio/client')

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
    expect(prismicPredicates.at).toBeCalledWith(
      `my.${DOCUMENTS.SIMPLE_PAGE}.uid`,
      uid
    )
    expect(prismicPredicates.at).toBeCalledWith(
      `my.${DOCUMENTS.SLICES_PAGE}.uid`,
      uid
    )
    expect(prismicPredicates.at).toBeCalledWith(
      `my.${DOCUMENTS.FORM_PAGE}.uid`,
      uid
    )
    expect(response).toEqual(expectedValue)
  })

  test('#findByType', async () => {
    // Given
    const type = DOCUMENTS.MAIN_NAVIGATION
    const expectedValue = [
      { type: DOCUMENTS.MAIN_NAVIGATION, navigation_for: 'pix-site' },
      { type: DOCUMENTS.MAIN_NAVIGATION, navigation_for: 'pix-pro' },
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
