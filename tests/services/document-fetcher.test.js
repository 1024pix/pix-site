import prismic from '@prismicio/client'
import { SITES_PRISMIC_TAGS } from '~/services/available-sites'
import { documentFetcher, DOCUMENTS } from '~/services/document-fetcher'

jest.mock('@prismicio/client')

describe('DocumentFetcher', () => {
  const SAVED_ENV = process.env

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

  test('#findHotNewsBanner', async () => {
    // Given
    const expectedValue = [{ type: DOCUMENTS.HOT_NEWS }]
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
    const response = await documentFetcher(prismic).findHotNewsBanner()

    // Then
    expect(prismicApi.query).toBeCalledWith(expectedPredicatesAtValue, {
      lang: 'fr-fr',
    })
    expect(prismicPredicates.at).toBeCalledWith(
      'document.type',
      DOCUMENTS.HOT_NEWS
    )
    expect(response).toEqual(expectedValue[0])
  })

  describe('#findMainNavigation', () => {
    test('it should find main navigation', async () => {
      // Given
      jest.resetModules() // nettoye le cache pour mocker process.env
      process.env = { SITE: SITES_PRISMIC_TAGS.PIX_SITE }
      const expectedValue = [
        {
          type: DOCUMENTS.MAIN_NAVIGATION,
          navigation_for: SITES_PRISMIC_TAGS.PIX_SITE,
        },
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
      const response = await documentFetcher(prismic).findMainNavigation()

      // Then
      expect(prismicApi.query).toBeCalledWith(
        [expectedPredicatesAtValue, expectedPredicatesAtValue],
        {
          lang: 'fr-fr',
        }
      )
      expect(prismicPredicates.at).toHaveBeenNthCalledWith(
        1,
        'document.type',
        DOCUMENTS.MAIN_NAVIGATION
      )
      expect(prismicPredicates.at).toHaveBeenNthCalledWith(
        2,
        `my.${DOCUMENTS.MAIN_NAVIGATION}.navigation_for`,
        SITES_PRISMIC_TAGS.PIX_SITE
      )
      expect(response).toEqual(expectedValue[0])
      process.env = { ...SAVED_ENV }
    })

    test('it should find main navigation v2', async () => {
      // Given
      jest.resetModules() // nettoye le cache pour mocker process.env
      process.env = {
        SITE: SITES_PRISMIC_TAGS.PIX_SITE,
        FT_IS_NEW_MENU_AVAILABLE: 'true',
      }
      const expectedValue = [
        {
          type: DOCUMENTS.MAIN_NAVIGATION_V2,
          navigation_for: SITES_PRISMIC_TAGS.PIX_SITE,
        },
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
      const response = await documentFetcher(prismic).findMainNavigation()

      // Then
      expect(prismicApi.query).toBeCalledWith(
        [expectedPredicatesAtValue, expectedPredicatesAtValue],
        {
          lang: 'fr-fr',
        }
      )
      expect(prismicPredicates.at).toHaveBeenNthCalledWith(
        1,
        'document.type',
        DOCUMENTS.MAIN_NAVIGATION_V2
      )
      expect(prismicPredicates.at).toHaveBeenNthCalledWith(
        2,
        `my.${DOCUMENTS.MAIN_NAVIGATION_V2}.navigation_for`,
        SITES_PRISMIC_TAGS.PIX_SITE
      )
      expect(response).toEqual(expectedValue[0])
      process.env = { ...SAVED_ENV }
    })
  })

  test('#findMainFooter', async () => {
    // Given
    jest.resetModules() // nettoie le cache pour mocker process.env
    process.env = { SITE: SITES_PRISMIC_TAGS.PIX_PRO }
    const expectedValue = [
      { type: DOCUMENTS.MAIN_FOOTER, footer_for: SITES_PRISMIC_TAGS.PIX_PRO },
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
    const response = await documentFetcher(prismic).findMainFooter()

    // Then
    expect(prismicApi.query).toBeCalledWith(
      [expectedPredicatesAtValue, expectedPredicatesAtValue],
      {
        lang: 'fr-fr',
      }
    )
    expect(prismicPredicates.at).toHaveBeenNthCalledWith(
      1,
      'document.type',
      DOCUMENTS.MAIN_FOOTER
    )
    expect(prismicPredicates.at).toHaveBeenNthCalledWith(
      2,
      `my.${DOCUMENTS.MAIN_FOOTER}.footer_for`,
      SITES_PRISMIC_TAGS.PIX_PRO
    )
    expect(response).toEqual(expectedValue[0])
    process.env = { ...SAVED_ENV }
  })
})
