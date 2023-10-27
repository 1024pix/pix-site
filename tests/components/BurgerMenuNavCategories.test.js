import { shallowMount } from '@vue/test-utils'
import BurgerMenuCategories from '~/components/BurgerMenuNavCategories.vue'
import PixPrismicLink from '~/components/PixPrismicLink.vue'

describe('Component: Burger Menu Nav Categories', () => {
  let component
  const $t = () => {}

  beforeEach(() => {
    component = shallowMount(BurgerMenuCategories, {
      components: { PixPrismicLink },
      propsData: {
        items: [
          {
            categoryName: [],
            descriptionCategoryTitle: [],
            descriptionCategoryText: [],
            menuSectionTitle: [],
            menuName: [
              {
                text: 'Accueil',
              },
            ],
            beforeIcon: 'icn-home.svg',
            alternativeTextForBeforeIcon: [{ text: 'Accueil' }],
            afterIcon: null,
            alternativeTextForAfterIcon: [],
            menuLink: {
              url: 'https://pro.pix.fr',
            },
            separator: false,
          },
          {
            categoryName: [
              {
                text: 'Découvrir Pix',
              },
            ],
            descriptionCategoryTitle: [
              {
                text: "Pix, c'est quoi ?",
              },
            ],
            descriptionCategoryText: [
              {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              },
            ],
            menuSectionTitle: [
              {
                text: 'La plateforme Pix',
              },
            ],
            menuName: [
              {
                text: 'Défis et compétences',
              },
            ],
            beforeIcon: null,
            alternativeTextForBeforeIcon: [],
            afterIcon: null,
            alternativeTextForAfterIcon: [],
            menuLink: {
              url: 'https://pix.fr/les-tests',
            },
            separator: false,
          },
        ],
      },
      stubs: { fa: true, 'burger-menu-nav-sections': true },
      mocks: { $t },
    })
  })

  afterEach(() => {
    component.destroy()
  })

  it('should initially render with no open category', () => {
    // given
    process.env.SITE = 'pix-site'
    const openDropdownIndex = component.vm.openDropdownIndex

    // when then
    expect(openDropdownIndex).toBe(-1)
  })

  it('should category button exist', () => {
    // given
    process.env.SITE = 'pix-site'
    const button = component.find('.burger-menu-nav-list-item-category__button')

    // when then
    expect(button.exists()).toBe(true)
  })

  it('should toggle category open and closed when clicked', async () => {
    // given
    const button = component.find('.burger-menu-nav-list-item-category__button')

    // when
    button.trigger('click')
    await component.vm.$nextTick()

    // then
    expect(component.vm.openDropdownIndex).toBe(1)

    // when
    button.trigger('click')
    await component.vm.$nextTick()

    // then
    expect(component.vm.openDropdownIndex).toBe(-1)
  })

  it('should close category if locale switcher is open', async () => {
    // given
    const button = component.find('.burger-menu-nav-list-item-category__button')

    // when
    button.trigger('click')
    await component.vm.$nextTick()

    // then
    expect(component.vm.openDropdownIndex).toBe(1)

    // when
    await component.setData({
      isLocaleSwitcherOpenLocal: true,
    })

    // then
    expect(component.vm.openDropdownIndex).toBe(-1)
  })

  it('should links exist', () => {
    // given
    const link = component.find('.burger-menu-nav-list-item__link')

    // when then
    expect(link.exists()).toBe(true)
  })

  it('should emit "close-menu" event when a link is clicked', async () => {
    // given
    const link = component.find('.burger-menu-nav-list-item__link')

    // when
    link.trigger('click')
    await component.vm.$nextTick()

    // then
    expect(component.emitted('close-menu')).toBeTruthy()
  })

  it('should apply blue class to the menu link when it is "https://pro.pix.fr" on pix-site', () => {
    // given
    process.env.SITE = 'pix-site'
    const menuLink = component.find('.burger-menu-nav-list-item__link')

    // then
    expect(menuLink.classes()).toStrictEqual([
      'burger-menu-nav-list-item__link',
      'blue-link',
    ])
  })

  it('should not apply blue class to the menu link on pix-pro', () => {
    // given
    process.env.SITE = 'pix-pro'
    const wrapper = shallowMount(BurgerMenuCategories, {
      components: { PixPrismicLink },
      propsData: {
        items: [
          {
            categoryName: [],
            descriptionCategoryTitle: [],
            descriptionCategoryText: [],
            menuSectionTitle: [],
            menuName: [
              {
                text: 'Accueil',
              },
            ],
            beforeIcon: 'icn-home.svg',
            alternativeTextForBeforeIcon: [{ text: 'Accueil' }],
            afterIcon: null,
            alternativeTextForAfterIcon: [],
            menuLink: {
              url: 'https://pro.pix.fr',
            },
            separator: false,
          },
          {
            categoryName: [
              {
                text: 'Découvrir Pix',
              },
            ],
            descriptionCategoryTitle: [
              {
                text: "Pix, c'est quoi ?",
              },
            ],
            descriptionCategoryText: [
              {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              },
            ],
            menuSectionTitle: [
              {
                text: 'La plateforme Pix',
              },
            ],
            menuName: [
              {
                text: 'Défis et compétences',
              },
            ],
            beforeIcon: null,
            alternativeTextForBeforeIcon: [],
            afterIcon: null,
            alternativeTextForAfterIcon: [],
            menuLink: {
              url: 'https://pix.fr/les-tests',
            },
            separator: false,
          },
        ],
      },
      stubs: { fa: true, 'burger-menu-nav-sections': true },
      mocks: { $t },
    })
    const menuLink = wrapper.find('.burger-menu-nav-list-item__link')

    // then
    expect(menuLink.classes()).toStrictEqual([
      'burger-menu-nav-list-item__link',
    ])
  })

  describe('#navigationLinks', () => {
    it('should aggregate navigation links of the same category', () => {
      // given
      const navigationLinks = component.vm.navigationLinks

      // when then
      expect(navigationLinks).toEqual([
        {
          name: 'Accueil',
          sections: [],
          beforeIcon: 'icn-home.svg',
          alternativeTextForBeforeIcon: 'Accueil',
          afterIcon: null,
          alternativeTextForAfterIcon: '',
          url: 'https://pro.pix.fr',
        },
        {
          name: 'Découvrir Pix',
          sections: [
            {
              title: 'La plateforme Pix',
              links: [
                {
                  name: 'Défis et compétences',
                  url: 'https://pix.fr/les-tests',
                },
              ],
            },
          ],
        },
      ])
    })
  })

  describe('#createSection', () => {
    it('should create a section', () => {
      // given
      const menuSectionTitle = 'Évaluer'
      const menuName = 'Les tests Pix'
      const menuLink = 'http://pix.fr/les-tests'

      // when then
      expect(
        component.vm.createSection(menuSectionTitle, menuName, menuLink)
      ).toEqual({
        title: 'Évaluer',
        links: [{ name: 'Les tests Pix', url: 'http://pix.fr/les-tests' }],
      })
    })
  })

  describe('#createCategory', () => {
    it('should create a category', () => {
      // given
      const categoryName = 'Découvrir Pix'
      const menuSectionTitle = 'Évaluer'
      const menuName = 'Les tests Pix'
      const menuLink = 'http://pix.fr/les-tests'

      // when then
      expect(
        component.vm.createCategory(
          categoryName,
          menuSectionTitle,
          menuName,
          menuLink
        )
      ).toEqual({
        name: 'Découvrir Pix',
        sections: [
          {
            links: [
              {
                name: 'Les tests Pix',
                url: 'http://pix.fr/les-tests',
              },
            ],
            title: 'Évaluer',
          },
        ],
      })
    })
  })
})
