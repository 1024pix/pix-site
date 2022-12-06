import { shallowMount } from '@vue/test-utils'
import LanguageSwitcher from '~/components/LanguageSwitcher/LanguageSwitcher'

describe('Component: LanguageSwitcher', () => {
  it('should render the language switcher if site is pix-pro.fr', () => {
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

  it('should render the language switcher if site is pix-pro.org', async () => {
    // given
    const $t = () => {}
    const $i18n = { locale: 'fr' }

    const LanguageSwitcherSubMenuStub = {
      name: 'language-switcher-burger-menu',
      template: '<div class="language-switcher__dropdown-menu child"/>',
    }

    const wrapper = shallowMount(LanguageSwitcher, {
      stubs: {
        LanguageSwitcherSubMenu: LanguageSwitcherSubMenuStub,
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
    expect(languageChildrenSubMenu.exists()).toBe(true)
  })
})
