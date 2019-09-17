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
    await DocumentFetcher.getNavigation()

    // Then
    expect(Prismic.getApi).toBeCalledWith(PrismicConfig.apiEndpoint)
  })

  test('it should get navigation from Prismic', async () => {
    // Given
    const prismicApi = {
      getSingle: jest.fn(async () => ({ uid: 'navigation' }))
    }
    Prismic.getApi.mockResolvedValue(prismicApi)
    // When
    const navigation = await DocumentFetcher.getNavigation()
    // Then
    expect(prismicApi.getSingle).toBeCalledWith('navigation')
    expect(navigation.uid).toBe('navigation')
  })
})
