import { shallowMount, mount } from '@vue/test-utils'
import { config } from '~/config/environment'
import PixLink from '~/components/PixLink'
import LocaleSwitcher from '~/components/LocaleSwitcher/LocaleSwitcher.vue'
import LocaleSwitcherSubMenu from '~/components/LocaleSwitcher/LocaleSwitcherSubMenu.vue'

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

LocaleSwitcherSubMenu.components = { 'pix-link': PixLink }

describe('Component: LocaleSwitcher', () => {
  describe('when site is pix-pro', () => {
    beforeEach(() => {
      config.site = 'pix-pro'
      config.isPixSite = false
    })

    it('should render the locale switcher', () => {
      // given
      const $t = () => {}
      const $i18n = { locale: 'fr-fr' }

      // when
      const wrapper = shallowMount(LocaleSwitcher, {
        stubs: {
          LocaleSwitcherSubMenu: true,
          fa: true,
        },
        propsData: {
          type: 'with-dropdown',
        },
        data: LocaleSwitcher.data,
        computed: LocaleSwitcher.computed,
        mocks: { $t, $i18n },
      })

      // then
      expect(wrapper.find('.locale-switcher__button').exists()).toBe(true)
    })

    it('should render the locale switcher correctly for pix-pro', async () => {
      // given
      const $t = () => {}
      const $i18n = { locale: 'fr-fr' }

      // when
      const wrapper = mount(LocaleSwitcher, {
        components: { LocaleSwitcherSubMenu, PixLink },
        mocks: { $t, $i18n },
        stubs: ['fa'],
      })
      await wrapper.find('button').trigger('click')
      await wrapper.find('.locale-switcher-sub-menu-button').trigger('click')

      // then
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('when site is pix-site', () => {
    beforeEach(() => {
      config.site = 'pix-site'
      config.isPixSite = true
    })

    it('should render the locale switcher correctly for pix-site', async () => {
      // given
      const $t = () => {}
      const $i18n = { locale: 'fr-fr' }

      // when
      const wrapper = mount(LocaleSwitcher, {
        components: { LocaleSwitcherSubMenu, PixLink },
        mocks: { $t, $i18n },
        stubs: ['fa'],
      })
      await wrapper.find('button').trigger('click')
      await wrapper.find('.locale-switcher-sub-menu-button').trigger('click')

      // then
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe.only('#isInternational', () => {
    describe('when locale is international', () => {
      it('returns true', () => {
        // given
        const $t = () => {}
        const $i18n = { locale: 'fr-fr' }
        const locale = {
          localeCode: 'fr',
        }
        const wrapper = mount(LocaleSwitcher, {
          components: { PixLink },
          mocks: { $t, $i18n },
          stubs: ['fa'],
        })

        // when
        const result = wrapper.vm.isInternational(locale)

        // then
        expect(result).toBe(true)
      })
    })
    describe('when locale is not international', () => {
      it('returns false', () => {
        // given
        const $t = () => {}
        const $i18n = { locale: 'fr-fr' }
        const locale = {
          localeCode: 'fr-fr',
        }
        const wrapper = mount(LocaleSwitcher, {
          components: { PixLink },
          mocks: { $t, $i18n },
          stubs: ['fa'],
        })

        // when
        const result = wrapper.vm.isInternational(locale)

        // then
        expect(result).toBe(false)
      })
    })
  })
})
