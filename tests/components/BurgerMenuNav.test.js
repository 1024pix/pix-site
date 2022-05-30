import { shallowMount } from '@vue/test-utils'
import BurgerMenuNav from '~/components/BurgerMenuNav'
import { config } from '~/config/environment'

jest.mock('~/config/environment', () => {
  return {
    config: {
      featureToggles: {
        disableLanguageSwitcherPixProFr: null,
      },
    },
  }
})

describe('Component: Burger Menu Nav', () => {
  let component

  describe('When disableLanguageSwitcherPixProFr is set to true', () => {
    beforeEach(() => {
      config.featureToggles.disableLanguageSwitcherPixProFr = true
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
      expect(result).not.toContain('<language-switcher-stub')
    })
  })

  describe('When disableLanguageSwitcherPixProFr is set to false', () => {
    beforeEach(() => {
      config.featureToggles.disableLanguageSwitcherPixProFr = false
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
      expect(result).toContain('<language-switcher-stub')
    })
  })
})
