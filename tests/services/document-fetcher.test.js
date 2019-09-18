import DocumentFetcher from '~/services/document-fetcher'

jest.mock('prismic-javascript')
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

describe('DocumentFetcher', () => {
  test('it should use prismic configuration', async () => {
    // Given
    const prismicApi = {
      getSingle: jest.fn(async () => ({ uid: 'navigation' }))
    }
    Prismic.getApi.mockResolvedValue(prismicApi)
    // When
    await DocumentFetcher().getNavigation()

    // Then
    expect(Prismic.getApi).toBeCalledWith(PrismicConfig.apiEndpoint)
  })

  test('it should get navigation from Prismic for default language if locale language is not defined', async () => {
    // Given
    const prismicApi = {
      getSingle: jest.fn(async () => ({ uid: 'navigation' }))
    }
    Prismic.getApi.mockResolvedValue(prismicApi)
    const i18n = {
      locale: undefined,
      defaultLocale: 'some-default-language'
    }
    // When
    const navigation = await DocumentFetcher(i18n).getNavigation()
    // Then
    expect(prismicApi.getSingle).toBeCalledWith('navigation', {
      lang: 'some-default-language'
    })
    expect(navigation.uid).toBe('navigation')
  })

  test('it should get navigation from Prismic for locale language when it is defined', async () => {
    // Given
    const prismicApi = {
      getSingle: jest.fn(async () => ({ uid: 'navigation' }))
    }
    Prismic.getApi.mockResolvedValue(prismicApi)
    const i18n = {
      locale: 'defined-language-by-user',
      defaultLocale: 'some-default-language'
    }
    // When
    await DocumentFetcher(i18n).getNavigation()
    // Then
    expect(prismicApi.getSingle).toBeCalledWith('navigation', {
      lang: 'defined-language-by-user'
    })
  })

  test('it should get navigation from Prismic for French when language is not defined', async () => {
    // Given
    const prismicApi = {
      getSingle: jest.fn(async () => ({ uid: 'navigation' }))
    }
    Prismic.getApi.mockResolvedValue(prismicApi)
    // When
    await DocumentFetcher().getNavigation()
    // Then
    expect(prismicApi.getSingle).toBeCalledWith('navigation', { lang: 'fr-fr' })
  })
})
