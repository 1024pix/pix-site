import { getInitialised } from './utils'
import { documentFetcher } from '~/services/document-fetcher'

jest.mock('~/services/document-fetcher')

describe('About Page', () => {
  let wrapper

  beforeEach(async () => {
    documentFetcher.mockReturnValue({
      get: () =>
        Promise.resolve({
          data: {
            id: '',
            meta: '',
            body: [{}, {}, {}, {}, {}],
          },
        }),
    })
    wrapper = await getInitialised('about')
  })
  test('mounts properly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders properly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
