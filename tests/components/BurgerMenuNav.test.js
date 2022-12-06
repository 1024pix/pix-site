import { shallowMount } from '@vue/test-utils'
import BurgerMenuNav from '~/components/BurgerMenuNav'

describe('Component: Burger Menu Nav', () => {
  let component

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
