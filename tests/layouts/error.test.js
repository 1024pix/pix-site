import { shallowMount } from '@vue/test-utils'
import VueMeta from 'vue-meta'
import { createLocalVue } from '../pages/pix-site/utils'
import ErrorLayout from '~/layouts/error.vue'

const localVue = createLocalVue()
localVue.use(VueMeta, { keyName: 'head' })

describe.only('Error layout', () => {
  let $i18n, $t, wrapper
  const stubs = {
    HotNewsBanner: true,
    NavigationSliceZone: true,
    Nuxt: true,
    FooterSliceZone: true,
  }

  beforeEach(() => {
    $i18n = { locale: 'fr-be' }
    $t = () => {}
  })

  it('should render the .error element', () => {
    // given
    wrapper = shallowMount(ErrorLayout, {
      localVue,
      stubs,
      mocks: { $i18n, $t },
    })

    // then
    expect(wrapper.find('.error').exists()).toBe(true)
  })

  it('should define the current locale as html lang', () => {
    // given
    wrapper = shallowMount(ErrorLayout, {
      localVue,
      stubs,
      mocks: { $i18n, $t },
    })

    // then
    expect(wrapper.vm.$metaInfo.htmlAttrs).toHaveProperty('lang', $i18n.locale)
  })

  describe('when using another locale', () => {
    it('should define this other locale as html lang', () => {
      // given
      $i18n = { locale: 'en' }
      wrapper = shallowMount(ErrorLayout, {
        localVue,
        stubs,
        mocks: { $i18n, $t },
      })

      // then
      expect(wrapper.vm.$metaInfo.htmlAttrs).toHaveProperty(
        'lang',
        $i18n.locale
      )
    })
  })
})
