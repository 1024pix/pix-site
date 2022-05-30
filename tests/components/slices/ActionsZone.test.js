import { shallowMount } from '@vue/test-utils'
import ActionsZone from '~/components/slices/ActionsZone'
import { config } from '~/config/environment'

jest.mock('~/config/environment', () => {
  return {
    config: {
      featureToggles: {
        disableLanguageSwitcherPixProFr: false,
      },
    },
  }
})

describe('Slice: Actions Zone', () => {
  let component

  describe('When disableLanguageSwitcherPixProFr is set to true', () => {
    beforeEach(() => {
      config.featureToggles.disableLanguageSwitcherPixProFr = true
    })

    it('it should not display the language switcher', () => {
      // given
      component = shallowMount(ActionsZone, {
        stubs: {
          'language-switcher': true,
          'pix-link': true,
        },
        propsData: {
          slice: {
            items: [],
          },
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
      component = shallowMount(ActionsZone, {
        stubs: {
          'language-switcher': true,
          'pix-link': true,
        },
        propsData: {
          slice: {
            items: [],
          },
        },
      })

      // when
      const result = component.html()

      // then
      expect(result).toContain('<language-switcher-stub')
    })
  })
})
