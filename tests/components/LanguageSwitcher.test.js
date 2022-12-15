import { shallowMount, mount } from '@vue/test-utils'
import LanguageSwitcher from '~/components/LanguageSwitcher/LanguageSwitcher'
import LanguageSwitcherSubMenu from '~/components/LanguageSwitcher/LanguageSwitcherSubMenu.vue'

describe('Component: LanguageSwitcher', () => {
  let oldDomainFr
  let oldDomainOrg

  beforeEach(() => {
    oldDomainFr = process.env.DOMAIN_FR
    oldDomainOrg = process.env.DOMAIN_ORG
    process.env.DOMAIN_FR = 'example.fr'
    process.env.DOMAIN_ORG = 'example.org'
  })

  afterEach(() => {
    process.env.DOMAIN_FR = oldDomainFr
    process.env.DOMAIN_ORG = oldDomainOrg
  })

  describe('when site is pix-pro', () => {
    let oldSite
    beforeEach(() => {
      oldSite = process.env.SITE
      process.env.SITE = 'pix-pro'
    })

    afterEach(() => {
      process.env.SITE = oldSite
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
        components: { LanguageSwitcherSubMenu },
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
    let oldSite
    beforeEach(() => {
      oldSite = process.env.SITE
      process.env.SITE = 'pix-site'
    })

    afterEach(() => {
      process.env.SITE = oldSite
    })

    it('should render the language switcher correctly for pix-site', async () => {
      // given
      const $t = () => {}
      const $i18n = { locale: 'fr-fr' }

      // when
      const wrapper = mount(LanguageSwitcher, {
        components: { LanguageSwitcherSubMenu },
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
