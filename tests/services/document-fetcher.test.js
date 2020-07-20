import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'
import { documentFetcher, documents } from '~/services/document-fetcher'

jest.mock('prismic-javascript')

describe('DocumentFetcher', () => {
  test('it should use prismic configuration', async () => {
    // Given
    const req = { some: 'cookie' }
    const prismicApi = {
      getSingle: jest.fn(() => ({ uid: 'navigation' }))
    }
    Prismic.getApi.mockResolvedValue(prismicApi)
    // When
    await documentFetcher({}, req).get(documents.navigation)

    // Then
    expect(Prismic.getApi).toBeCalledWith(PrismicConfig.apiEndpoint, { req })
  })

  test('it should get navigation from Prismic for default language if locale language is not defined', async () => {
    // Given
    const prismicApi = {
      getSingle: jest.fn(() => ({ uid: 'navigation' }))
    }
    Prismic.getApi.mockResolvedValue(prismicApi)
    const i18n = {
      locale: undefined,
      defaultLocale: 'some-default-language'
    }
    // When
    const navigation = await documentFetcher(i18n).get(documents.navigation)
    // Then
    expect(prismicApi.getSingle).toBeCalledWith('navigation', {
      lang: 'some-default-language'
    })
    expect(navigation.uid).toBe('navigation')
  })

  test('it should get navigation from Prismic for locale language when it is defined', async () => {
    // Given
    const prismicApi = {
      getSingle: jest.fn(() => ({ uid: 'navigation' }))
    }
    Prismic.getApi.mockResolvedValue(prismicApi)
    const i18n = {
      locale: 'defined-language-by-user',
      defaultLocale: 'some-default-language'
    }
    // When
    await documentFetcher(i18n).get(documents.navigation)
    // Then
    expect(prismicApi.getSingle).toBeCalledWith('navigation', {
      lang: 'defined-language-by-user'
    })
  })

  test('it should get navigation from Prismic for French when language is not defined', async () => {
    // Given
    const prismicApi = {
      getSingle: jest.fn(() => ({ uid: 'navigation' }))
    }
    Prismic.getApi.mockResolvedValue(prismicApi)
    // When
    await documentFetcher().get(documents.navigation)
    // Then
    expect(prismicApi.getSingle).toBeCalledWith('navigation', { lang: 'fr-fr' })
  })

  test('it should get employers page with distributors informations', async () => {
    // Given
    const prismicApi = {
      getSingle: jest.fn(() => ({ uid: 'navigation' }))
    }
    Prismic.getApi.mockResolvedValue(prismicApi)
    // When
    await documentFetcher().getEmployers()
    // Then
    expect(prismicApi.getSingle).toBeCalledWith('employers', {
      lang: 'fr-fr',
      fetchLinks: [
        'distributor_item.description',
        'distributor_item.footer',
        'distributor_item.link',
        'distributor_item.logo',
        'distributor_item.name'
      ]
    })
  })
})
