import { shallowMount, mount } from '@vue/test-utils'
import { config } from '~/config/environment'
import PixLink from '~/components/PixLink'
import LanguageSwitcher from '~/components/LanguageSwitcher/LanguageSwitcher'
import LanguageSwitcherSubMenu from '~/components/LanguageSwitcher/LanguageSwitcherSubMenu.vue'

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

LanguageSwitcherSubMenu.components = { 'pix-link': PixLink }

describe('Component: LanguageSwitcher', () => {
  describe('when site is pix-pro', () => {
    beforeEach(() => {
      config.site = 'pix-pro'
      config.isPixSite = false
    })

    it('should render the language switcher', () => {
      // given
      const $t = () => {}
      const $i18n = { locale: 'fr-fr' }

      // when
      const wrapper = shallowMount(LanguageSwitcher, {
        stubs: {
          LanguageSwitcherSubMenu: true,
          fa: true,
        },
        propsData: {
          type: 'with-dropdown',
        },
        data: LanguageSwitcher.data,
        computed: LanguageSwitcher.computed,
        mocks: { $t, $i18n },
      })

      // then
      expect(wrapper.find('.language-switcher__button').exists()).toBe(true)
    })

    it('should render the language switcher correctly for pix-pro', async () => {
      // given
      const $t = () => {}
      const $i18n = { locale: 'fr-fr' }

      // when
      const wrapper = mount(LanguageSwitcher, {
        components: { LanguageSwitcherSubMenu, PixLink },
        mocks: { $t, $i18n },
        stubs: { fa: true },
      })
      await wrapper.find('button').trigger('click')
      await wrapper.find('.language-switcher-sub-menu-button').trigger('click')

      // then
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('when site is pix-site', () => {
    beforeEach(() => {
      config.site = 'pix-site'
      config.isPixSite = true
    })

    it('should render the language switcher correctly for pix-site', async () => {
      // given
      const $t = () => {}
      const $i18n = { locale: 'fr-fr' }

      // when
      const wrapper = mount(LanguageSwitcher, {
        components: { LanguageSwitcherSubMenu, PixLink },
        mocks: { $t, $i18n },
        stubs: { fa: true },
      })
      await wrapper.find('button').trigger('click')
      await wrapper.find('.language-switcher-sub-menu-button').trigger('click')

      // then
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
