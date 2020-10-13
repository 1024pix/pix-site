import prismic from 'prismic-javascript'
import { documentFetcher, documents } from '~/services/document-fetcher'

jest.mock('prismic-javascript')

describe('DocumentFetcher', () => {
  test('it should get navigation from Prismic for default language if locale language is not defined', async () => {
    // Given
    const prismicApi = {
      getSingle: jest.fn(() => ({ uid: 'navigation' })),
    }
    prismic.api = prismicApi
    const i18n = {
      locale: undefined,
      defaultLocale: 'some-default-language',
    }
    // When
    const navigation = await documentFetcher(prismic, i18n).get(
      documents.navigation
    )
    // Then
    expect(prismicApi.getSingle).toBeCalledWith('navigation', {
      lang: 'some-default-language',
    })
    expect(navigation.uid).toBe('navigation')
  })

  test('it should get navigation from Prismic for locale language when it is defined', async () => {
    // Given
    const prismicApi = {
      getSingle: jest.fn(() => ({ uid: 'navigation' })),
    }
    prismic.api = prismicApi
    const i18n = {
      locale: 'defined-language-by-user',
      defaultLocale: 'some-default-language',
    }
    // When
    await documentFetcher(prismic, i18n).get(documents.navigation)
    // Then
    expect(prismicApi.getSingle).toBeCalledWith('navigation', {
      lang: 'defined-language-by-user',
    })
  })

  test('it should get navigation from Prismic for French when language is not defined', async () => {
    // Given
    const prismicApi = {
      getSingle: jest.fn(() => ({ uid: 'navigation' })),
    }
    prismic.api = prismicApi
    // When
    await documentFetcher(prismic).get(documents.navigation)
    // Then
    expect(prismicApi.getSingle).toBeCalledWith('navigation', { lang: 'fr-fr' })
  })

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
    const prismicApi = {
      query: jest
        .fn()
        .mockImplementationOnce(getSimplePageByUidMock)
        .mockImplementationOnce(getSlicesPageByUidMock),
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
