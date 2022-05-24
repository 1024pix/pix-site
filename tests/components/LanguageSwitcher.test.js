import { shallowMount } from '@vue/test-utils'
import LanguageSwitcher, {
  getAbsoluteUrlIfSwitchWebsite,
} from '~/components/LanguageSwitcher'

describe('Component: LanguageSwitcher', () => {
  describe('#getAbsoluteUrlIfSwitchWebsite', () => {
    beforeEach(() => {
      process.env.DOMAIN_FR = 'pix.fr'
      process.env.DOMAIN_ORG = 'pix.org'
    })

    it('Should return relative url if target is in domain', () => {
      const switchMenu = [
        {
          relativeTarget: '/',
          isTargetOnPixOrg: false,
          isOnPixOrg: false,
          response: '/',
        },
        {
          relativeTarget: '/fr-be',
          isTargetOnPixOrg: true,
          isOnPixOrg: false,
          response: 'http://pix.org/fr-be',
        },
        {
          relativeTarget: '/en-gb',
          isTargetOnPixOrg: true,
          isOnPixOrg: true,
          response: '/en-gb',
        },
        {
          relativeTarget: '/',
          isTargetOnPixOrg: false,
          isOnPixOrg: true,
          response: 'http://pix.fr/',
        },
      ]
      for (const item of switchMenu) {
        const url = getAbsoluteUrlIfSwitchWebsite(
          item.relativeTarget,
          item.isTargetOnPixOrg,
          item.isOnPixOrg
        )
        expect(url).toBe(item.response)
      }
    })
  })

  it('should render the submenu if site is pix pro', async () => {
    // given
    process.env.SITE = 'pix-pro'
    const $t = () => {}
    const $i18n = { locale: 'fr-fr' }

    const wrapper = shallowMount(LanguageSwitcher, {
      stubs: {
        fa: true,
      },
      propsData: {
        type: 'with-dropdown',
      },
      data: LanguageSwitcher.data,
      computed: LanguageSwitcher.computed,
      mocks: { $t, $i18n },
    })

    const languageSwitcher = wrapper.find('.language-switcher__button')

    // when
    await languageSwitcher.trigger('click')
    const languageChildrenSubMenuButton = wrapper.find(
      '.language-switcher-sub-menu-button'
    )
    await languageChildrenSubMenuButton.trigger('click')
    const languageChildrenSubMenu = wrapper.find(
      '.language-switcher__dropdown-menu.child'
    )

    // then
    expect(languageSwitcher.exists()).toBe(true)
    expect(languageChildrenSubMenuButton.exists()).toBe(true)
    expect(languageChildrenSubMenu.exists()).toBe(true)
  })
})
