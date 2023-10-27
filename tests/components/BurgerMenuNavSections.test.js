import { shallowMount } from '@vue/test-utils'
import BurgerMenuNavSections from '~/components/BurgerMenuNavSections'
import PixPrismicLink from '~/components/PixPrismicLink.vue'

describe('Component: Burger Menu Nav Sections', () => {
  let component

  beforeEach(() => {
    component = shallowMount(BurgerMenuNavSections, {
      components: { PixPrismicLink },
      propsData: {
        sections: [
          {
            title: 'Section 1',
            links: [
              { name: 'Link 1', url: 'https://example.com/link1' },
              { name: 'Link 2', url: 'https://example.com/link2' },
            ],
          },
          {
            title: 'Section 2',
            links: [{ name: 'Link 3', url: 'https://example.com/link3' }],
          },
        ],
      },
    })
  })

  afterEach(() => {
    component.destroy()
  })

  it('should render sections correctly', () => {
    // given
    const sectionItems = component.findAll(
      '.burger-menu-nav-sections-list-item__title'
    )

    // when then
    expect(sectionItems.length).toBe(2)

    const sectionTitles = sectionItems.wrappers.map((item) => item.text())
    expect(sectionTitles).toEqual(['Section 1', 'Section 2'])
  })

  it('should render links correctly', () => {
    // given
    const linkItems = component.findAll(
      '.burger-menu-nav-sections-list-item-sub-list-sub-item__link'
    )

    // when then
    expect(linkItems.length).toBe(3)

    const linkNames = linkItems.wrappers.map((item) => item.text())
    expect(linkNames).toEqual(['Link 1', 'Link 2', 'Link 3'])
  })

  it('should emit "close-menu" event when a link is clicked', async () => {
    // given
    const linkItem = component.find(
      '.burger-menu-nav-sections-list-item-sub-list-sub-item__link'
    )

    // when
    linkItem.trigger('click')
    await component.vm.$nextTick()

    // then
    expect(component.emitted('close-menu')).toBeTruthy()
  })
})
