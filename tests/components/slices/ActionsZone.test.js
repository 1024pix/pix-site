import { shallowMount } from '@vue/test-utils'
import ActionsZone from '~/components/slices/ActionsZone'
import { config } from '~/config/environment'

describe('Slice: Actions Zone', () => {
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
      expect(result).toMatchSnapshot()
    })
  })

  describe('When FT_DISABLE_PIX_PRO_LANGUAGE_SWITCHER is set to false', () => {
    beforeEach(() => {
      config.featureToggles.disableLanguageSwitcherPixProOrg = false
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
      expect(result).toMatchSnapshot()
    })
  })
})
