import { shallowMount } from '@vue/test-utils'
import BurgerMenuNav from '~/components/BurgerMenuNav'
import { config } from '~/config/environment'

describe('Component: Burger Menu Nav', () => {
  let component

  describe('When FT_DISABLE_PIX_PRO_LANGUAGE_SWITCHER is set to true', () => {
    jest.mock('~/config/environment', () => {
      return {
        config: {
          featureToggles: {
            disableLanguageSwitcherPixProOrg: true,
          },
        },
      }
    })

    it('it should not display the language switcher', () => {
      // given
      component = shallowMount(BurgerMenuNav, {
        stubs: {
          'language-switcher': true,
          'burger-menu-nav-items': true,
        },
        propsData: {
          items: {},
        },
      })

      // when
      const result = component.html()

      // then
      expect(result).toMatchSnapshot()
    })
  })

  describe('When FT_DISABLE_PIX_PRO_LANGUAGE_SWITCHER is set to false', () => {
    beforeEach(() => {
      config.featureToggles.disableLanguageSwitcherPixProOrg = false
    })

    it('it should display the language switcher', () => {
      // given
      component = shallowMount(BurgerMenuNav, {
        stubs: {
          'language-switcher': true,
          'burger-menu-nav-items': true,
        },
        propsData: {
          items: {},
        },
      })

      // when
      const result = component.html()

      // then
      expect(result).toMatchSnapshot()
    })
  })
})
