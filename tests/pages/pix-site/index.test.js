import { getInitialised } from './utils'
import { documentFetcher } from '~/services/document-fetcher'

jest.mock('~/services/document-fetcher')

describe('Index Page', () => {
  let wrapper

  beforeEach(async () => {
    documentFetcher.mockReturnValue({
      getPageByUid: () =>
        Promise.resolve({
          data: {
            id: '',
            meta: '',
            type: 'slice_page',
            body: [{}, {}, {}, {}, {}, {}, {}, {}],
          },
        }),
      findNewsItems: () =>
        Promise.resolve({
          data: {
            id: '',
            meta: '',
            body: [{}, {}, {}, {}, {}, {}, {}, {}],
          },
        }),
    })
    wrapper = await getInitialised('index')
  })
  test('mounts properly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders properly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
