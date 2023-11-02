import { mount, shallowMount } from '@vue/test-utils'
import VueMeta from 'vue-meta'
import { createLocalVue } from '../pages/pix-site/utils'
import DefaultLayout from '~/layouts/default.vue'
import LocaleSuggestionBanner from '~/components/LocaleSuggestionBanner.vue'

const localVue = createLocalVue()
localVue.use(VueMeta, { keyName: 'head' })

jest.mock('~/config/environment', () => ({
  config: {
    site: 'pix-site',
    isPixSite: true,
    domain: {
      french: 'example.fr',
      international: 'example.org',
    },
  },
}))

describe('Default layout', () => {
  let $i18n, wrapper, processEnvBackup

  const stubs = {
    SkipLink: true,
    HotNewsBanner: true,
    NavigationSliceZone: true,
    LocaleSuggestionBanner: true,
    Nuxt: true,
    FooterSliceZone: true,
  }
  beforeEach(() => {
    $i18n = { locale: 'fr-be' }
    processEnvBackup = { ...process.env }
  })

  afterEach(() => {
    process.env = { ...processEnvBackup }
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

  describe('when on french domain (pix-site.fr)', () => {
    describe('when user is located outside of France', () => {
      describe('when user click on the close button in the locale suggestion banner', () => {
        it('closes the banner', async () => {
          // given
          process.env.DOMAIN_ORG = 'example.org'
          const $t = () =>
            `Vous semblez ne pas être en France. Voulez-vous accéder au <a href="https://${process.env.DOMAIN_ORG}">site Pix international</a> ?`
          wrapper = mount(DefaultLayout, {
            localVue,
            components: { LocaleSuggestionBanner },
            stubs: { ...stubs, LocaleSuggestionBanner: false },
            mocks: { $i18n, $t },
            data() {
              return { showOutOfFranceBanner: true }
            },
          })

          // when
          const closeButton = wrapper.find('.locale-suggestion-banner > img')
          await closeButton.trigger('click')

          // then
          expect(wrapper.find('.locale-suggestion-banner > img').exists()).toBe(
            false
          )
        })
      })
    })
  })
})
