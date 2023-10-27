import { shallowMount } from '@vue/test-utils'
import BurgerMenuNavV2 from '~/components/BurgerMenuNavV2'
import PixPrismicLink from '~/components/PixPrismicLink.vue'
import PixImage from '~/components/PixImage.vue'

describe('Component: Burger Menu Nav V2', () => {
  let component
  const $t = () => {}
  const $i18n = { locale: 'fr-fr' }

  beforeEach(() => {
    component = shallowMount(BurgerMenuNavV2, {
      components: { PixPrismicLink, PixImage },
      stubs: {
        'burger-menu-nav-actions-zone': true,
        'burger-menu-nav-items-v2': true,
        'locale-switcher': true,
        fa: true,
        'focus-trap': true,
      },
      mocks: { $t, $i18n },
      propsData: {
        items: {
          logosZone: [
            {
              image: { image: 'code-ico.svg' },
              url: { url: 'http://pix.fr' },
            },
          ],
          navigationZone: [],
          actionsZone: [],
        },
      },
    })
  })

  afterEach(() => {
    component.destroy()
  })

  it('should initially render with the menu closed', () => {
    // when
    expect(component.vm.isMenuOpen).toBe(false)
    expect(component.find('#menu').isVisible()).toBe(false)
  })

  it('should toggle the menu when the button is clicked', async () => {
    // given
    const button = component.find('.burger-menu-nav__toggle')

    // when
    await button.trigger('click')

    // then
    expect(component.vm.isMenuOpen).toBe(true)
    expect(component.find('#menu').isVisible()).toBe(true)

    // when
    await button.trigger('click')

    // then
    expect(component.vm.isMenuOpen).toBe(false)
    expect(component.find('#menu').isVisible()).toBe(false)
  })

  it('should close the menu when "esc" key is pressed', async () => {
    // given
    component.setData({ isMenuOpen: true })
    await component.vm.$nextTick()

    // when
    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    component.find('.burger-menu-nav').element.dispatchEvent(event)

    // then
    expect(component.vm.isMenuOpen).toBe(false)
  })

  it('should close the menu when clicking on the overlay', async () => {
    // given
    component.setData({ isMenuOpen: true })
    await component.vm.$nextTick()

    // when
    const overlay = component.find('.pix-sidebar__overlay')
    overlay.trigger('click')

    // then
    expect(component.vm.isMenuOpen).toBe(false)
  })

  it('should close the menu when the close button is clicked', async () => {
    // given
    component.setData({ isMenuOpen: true })
    await component.vm.$nextTick()

    const closeButton = component.find(
      '.burger-menu-nav-container-header-logos-item__close-button'
    )

    // when
    await closeButton.trigger('click')

    // then
    expect(component.vm.isMenuOpen).toBe(false)
    expect(component.find('#menu').isVisible()).toBe(false)
  })

  it('should toggle the locale switcher when the locale switcher button is clicked', async () => {
    // given
    component.setData({ isMenuOpen: true })
    const localeSwitcherButton = component.find(
      '.burger-menu-nav-container-content-locale-switcher__button'
    )

    // when
    await localeSwitcherButton.trigger('click')

    // then
    expect(component.vm.isLocaleSwitcherOpen).toBe(true)
    expect(
      component
        .find('.burger-menu-nav-container-content-locale-switcher__list')
        .isVisible()
    ).toBe(true)

    // when
    await localeSwitcherButton.trigger('click')

    // then
    expect(component.vm.isLocaleSwitcherOpen).toBe(false)
    expect(
      component
        .find('.burger-menu-nav-container-content-locale-switcher__list')
        .isVisible()
    ).toBe(false)
  })

  it('should toggle the locale switcher when the footer button is clicked', async () => {
    // given
    component.setData({ isMenuOpen: true })
    const footerButton = component.find(
      '.burger-menu-nav-container-footer-locale__button'
    )

    // when
    await footerButton.trigger('click')

    // then
    expect(component.vm.isLocaleSwitcherOpen).toBe(true)
    expect(
      component
        .find('.burger-menu-nav-container-content-locale-switcher__list')
        .isVisible()
    ).toBe(true)

    // when
    await footerButton.trigger('click')

    // then
    expect(component.vm.isLocaleSwitcherOpen).toBe(false)
    expect(
      component
        .find('.burger-menu-nav-container-content-locale-switcher__list')
        .isVisible()
    ).toBe(false)
  })
})
