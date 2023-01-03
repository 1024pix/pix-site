import { mount } from '@vue/test-utils'
import PixLink from '~/components/PixLink'

describe('Component: PixLink', () => {
  let component

  beforeEach(() => {
    component = mount(PixLink, {
      shallow: true,
      propsData: { href: '' },
      slots: { default: '<h1>Dummy</h1>' },
      stubs: ['nuxt-link'],
    })
  })

  describe('href is in domain', () => {
    it('displays the component', async () => {
      // given
      await component.setProps({ href: '/fr-be' })

      // when
      const result = component.html()

      // then
      expect(result).toEqual(
        `<nuxt-link-stub to="/fr-be">
  <h1>Dummy</h1>
</nuxt-link-stub>`
      )
    })
  })

  describe('href is not in domain', () => {
    it('displays the component', async () => {
      // given
      await component.setProps({ href: 'https://example.net/' })

      // when
      const result = component.html()

      // then
      expect(result).toEqual(`<a href="https://example.net/">
  <h1>Dummy</h1>
</a>`)
    })
  })
})
