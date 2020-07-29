import { getInitialised, emptyPrismicDocument } from './utils'
import { documentFetcher } from '~/services/document-fetcher'

jest.mock('~/services/document-fetcher')

describe('Legal Notices Page', () => {
  let wrapper

  beforeEach(async () => {
    documentFetcher.mockReturnValue({
      get: () =>
        Promise.resolve({
          data: {
            id: '',
            meta: '',
            title: {},
            body: [
              emptyPrismicDocument(),
              emptyPrismicDocument(),
              emptyPrismicDocument(),
            ],
          },
        }),
    })
    wrapper = await getInitialised('legal-notices', {
      stubs: ['prismic-edit-button', 'prismic-rich-text'],
    })
  })
  test('mounts properly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders properly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
