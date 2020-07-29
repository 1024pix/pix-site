import { getInitialised } from './utils'
import { documentFetcher } from '~/services/document-fetcher'

jest.mock('~/services/document-fetcher')

describe('Terms of Service Page', () => {
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
        body: '',
      },
    })

    wrapper = await getInitialised('terms-of-service', {
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
