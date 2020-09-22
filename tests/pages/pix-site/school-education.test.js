import { getInitialised } from './utils'
import { documentFetcher } from '~/services/document-fetcher'

jest.mock('~/services/document-fetcher')

describe('School Education Page', () => {
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
        body: [{}, {}, {}, {}, {}, {}, {}, {}],
      },
    })

    wrapper = await getInitialised('school-education', {
      stubs: ['prismic-rich-text', 'prismic-image'],
    })
  })
  test('mounts properly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders properly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
