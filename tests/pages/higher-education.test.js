import { getInitialised, emptyPrismicDocument } from './utils'
import { documentFetcher } from '~/services/document-fetcher'

jest.mock('~/services/document-fetcher')

describe('Higher Education Page', () => {
  let wrapper
  const get = jest.fn()

  beforeEach(async () => {
    documentFetcher.mockReturnValue({
      get,
    })

    get.mockResolvedValueOnce({
      data: {
        id: '',
        meta: '',
        body: [
          emptyPrismicDocument(),
          {},
          {},
          {},
          {},
          emptyPrismicDocument(),
          emptyPrismicDocument(),
        ],
      },
    })

    get.mockResolvedValueOnce({
      id: '',
      data: {},
    })

    wrapper = await getInitialised('higher-education', {
      stubs: ['prismic-edit-button', 'prismic-rich-text', 'pix-link'],
      computed: {
        $prismic() {
          return { asText: () => {} }
        },
      },
    })
  })
  test('mounts properly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders properly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
