import { mount } from '@vue/test-utils'
import SkipLink from '~/components/SkipLink.vue'

describe('Component: SkipLink', () => {
  it('renders the skip link with proper attributes', () => {
    // given
    const $t = () => {}
    const wrapper = mount(SkipLink, { mocks: { $t } })
    const pixLink = wrapper.find('.skip-link')

    // when then
    expect(pixLink.attributes('href')).toBe('#main')
  })
})
