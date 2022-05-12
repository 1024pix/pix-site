import VueMeta from 'vue-meta'
import { getInitialised, createLocalVue } from './utils'
import { documentFetcher, TAGS } from '~/services/document-fetcher'
import getMeta, { fallbackDescription } from '~/services/meta-builder'

const localVue = createLocalVue()
localVue.prototype.$getMeta = getMeta

localVue.use(VueMeta, { keyName: 'head' })

jest.mock('~/services/document-fetcher')

describe('Index Page', () => {
  let wrapper
  const PRISMIC_META = 'meta info'
  const PRISMIC_TITLE = 'title'

  beforeEach(async () => {
    documentFetcher.mockReturnValue({
      getPageByUid: () =>
        Promise.resolve({
          data: {
            id: '',
            meta: [
              {
                slice_type: 'general_card',
                primary: { description: '', image: {} },
              },
            ],
            type: 'slice_page',
            body: [{}, {}, {}, {}, {}, {}, {}, {}],
            title: [{ text: PRISMIC_TITLE }],
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
    wrapper = await getInitialised(TAGS.INDEX, {
      localVue,
      computed: {
        $prismic() {
          return { asText: () => PRISMIC_META }
        },
      },
      stubs: {
        'prismic-custom-slice-zone': true,
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  test('mounts properly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders properly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('gets the correct title', () => {
    expect(wrapper.vm.$metaInfo.title).toBe(`${PRISMIC_TITLE} | Pix`)
    expect(wrapper.vm.$data.title).toBe(PRISMIC_TITLE)
  })

  test('gets the correct meta description from Prismic', () => {
    expect(findMetaContent('og:description')).toBe(PRISMIC_META)
    expect(findMetaContent('description')).toBe(PRISMIC_META)
  })

  test('uses the fallback meta description when not filled in Prismic', async () => {
    wrapper = await getInitialised(TAGS.INDEX, {
      localVue,
      computed: {
        $prismic() {
          return { asText: () => '' }
        },
      },
      stubs: {
        'prismic-custom-slice-zone': true,
      },
    })

    expect(findMetaContent('og:description')).toBe(fallbackDescription)
    expect(findMetaContent('description')).toBe(fallbackDescription)
  })

  function findMetaContent(hid) {
    const meta = wrapper.vm.$metaInfo.meta.find((m) => m.hid === hid)
    expect(meta).toBeTruthy()
    return wrapper.vm.$metaInfo.meta.find((m) => m.hid === hid).content
  }
})
