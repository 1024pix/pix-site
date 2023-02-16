import { shallowMount } from '@vue/test-utils'
import VModal from 'vue-js-modal'
import { createLocalVue } from '../../pages/pix-site/utils'
import PageBanner from '~/components/slices/PageBanner'

const localVue = createLocalVue()
localVue.use(VModal)

describe('Slice: Page Banner', () => {
  let component

  it('should render component', () => {
    // given & when
    component = shallowMount(PageBanner, {
      localVue,
      stubs: {
        'prismic-rich-text': true,
        fa: true,
        'media-player': true,
      },
      propsData: {
        slice: {
          primary: {
            banner_font_contrast: '',
            title: '',
            textContent: '',
            hasImage: false,
            hasBackgroundImage: false,
            imageUrl: undefined,
          },
          items: [{ banner_link_url: { url: 'pix-videos/' } }],
        },
      },
    })

    // then
    const result = component.html()
    expect(result).toMatchSnapshot()
  })
})
