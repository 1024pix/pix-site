import { shallowMount } from '@vue/test-utils'
import VueMeta from 'vue-meta'
import { createLocalVue } from '../pages/pix-site/utils'
import DefaultLayout from '~/layouts/default.vue'

const localVue = createLocalVue()
localVue.use(VueMeta, { keyName: 'head' })

describe.only('Default layout', () => {
  let $i18n, wrapper
  const stubs = {
    HotNewsBanner: true,
    NavigationSliceZone: true,
    Nuxt: true,
    FooterSliceZone: true,
  }

  beforeEach(() => {
    $i18n = { locale: 'fr-be' }
  })

  it('should render the #app element', () => {
    // given
    wrapper = shallowMount(DefaultLayout, {
      localVue,
      stubs,
      mocks: { $i18n },
    })

    // then
    expect(wrapper.find('#app').exists()).toBe(true)
  })

  it('should set data default values', () => {
    // given
    wrapper = shallowMount(DefaultLayout, {
      localVue,
      stubs,
      mocks: { $i18n },
    })

    // then
    expect(wrapper.vm.showOutOfFranceBanner).toBe(false)
  })

  it('should define the current locale as html lang', () => {
    // given
    wrapper = shallowMount(DefaultLayout, {
      localVue,
      stubs,
      mocks: { $i18n },
    })

    // then
    expect(wrapper.vm.$metaInfo.htmlAttrs).toHaveProperty('lang', $i18n.locale)
  })

  describe('when using another locale', () => {
    it('should define this other locale as html lang', () => {
      // given
      $i18n = { locale: 'en' }
      wrapper = shallowMount(DefaultLayout, {
        localVue,
        stubs,
        mocks: { $i18n },
      })

      // then
      expect(wrapper.vm.$metaInfo.htmlAttrs).toHaveProperty(
        'lang',
        $i18n.locale
      )
    })
  })
})
