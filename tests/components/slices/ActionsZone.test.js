import { shallowMount } from '@vue/test-utils'
import ActionsZone from '~/components/slices/ActionsZone'

describe('Slice: Actions Zone', () => {
  let component

  it('it should display the language switcher', () => {
    // given
    component = shallowMount(ActionsZone, {
      stubs: {
        'language-switcher': true,
        'pix-prismic-link': true,
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
