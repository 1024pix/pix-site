import { shallowMount } from '@vue/test-utils'
import ActionsZone from '~/components/slices/ActionsZone'

describe('Slice: Actions Zone', () => {
  let component

  it('it should display the locale switcher', () => {
    // given
    component = shallowMount(ActionsZone, {
      stubs: {
        'locale-switcher': true,
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
    expect(result).toContain('<locale-switcher-stub')
  })
})
