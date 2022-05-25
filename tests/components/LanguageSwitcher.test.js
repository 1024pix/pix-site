import { mount } from '@vue/test-utils'
import LanguageSwitcher from '~/components/LanguageSwitcher/LanguageSwitcher'

describe('Component: LanguageSwitcher', () => {
  it('should render the submenu if site is pix pro', async () => {
    // given
    process.env.SITE = 'pix-pro'
    const $t = () => {}
    const $i18n = { locale: 'fr-fr' }

    const wrapper = mount(LanguageSwitcher, {
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
