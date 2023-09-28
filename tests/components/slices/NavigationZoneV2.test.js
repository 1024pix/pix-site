import { shallowMount } from '@vue/test-utils'
import { documentFetcher } from '~/services/document-fetcher'
import NavigationZoneV2 from '~/components/slices/NavigationZoneV2'

jest.mock('~/services/document-fetcher')

describe('NavigationZoneV2 slice', () => {
  let component
  const get = jest.fn()
  const $route = {
    path: '',
  }

  beforeEach(() => {
    documentFetcher.mockReturnValue({
      get,
    })

    get.mockResolvedValueOnce({
      data: {
        id: '',
        meta: '',
        page_title: '',
      },
    })
  })

  describe('Slice: NavigationZoneV2', () => {
    beforeEach(() => {
      component = shallowMount(NavigationZoneV2, {
        mocks: { $route },
        stubs: {
          'pix-prismic-link': true,
          fa: true,
          'navigation-dropdown-v2': true,
        },
        propsData: {
          navigationZoneItems: [
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
                url: 'https://pix.fr',
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
            {
              categoryName: [
                {
                  text: 'Découvrir Pix',
                },
              ],
              descriptionCategoryTitle: [],
              descriptionCategoryText: [],
              menuSectionTitle: [
                {
                  text: 'Qui sommes nous ?',
                },
              ],
              menuName: [
                {
                  text: 'Le référentiel',
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
            {
              categoryName: [
                {
                  text: 'Découvrir Pix',
                },
              ],
              descriptionCategoryTitle: [],
              descriptionCategoryText: [],
              menuSectionTitle: [
                {
                  text: 'La plateforme Pix',
                },
              ],
              menuName: [
                {
                  text: 'Score et niveaux ',
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
            {
              categoryName: [
                {
                  text: 'Découvrir Pix',
                },
              ],
              descriptionTitle: [],
              descriptionText: [],
              menuSectionTitle: [
                {
                  text: 'Qui sommes nous ?',
                },
              ],
              menuName: [
                {
                  text: 'Les accompagnements',
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
            {
              categoryName: [],
              descriptionCategoryTitle: [],
              descriptionCategoryText: [],
              menuSectionTitle: [],
              menuName: [
                {
                  text: 'Blog',
                },
              ],
              beforeIcon: null,
              alternativeTextForBeforeIcon: [],
              afterIcon: 'icn-external-link.svg',
              alternativeTextForAfterIcon: [
                {
                  text: 'lien externe',
                },
              ],
              menuLink: {
                url: 'https://pix.fr',
              },
              separator: true,
            },
          ],
        },
        computed: {
          $prismic() {
            return {
              asText: () => {},
            }
          },
        },
      })
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
            url: 'https://pix.fr',
            separator: false,
          },
          {
            name: 'Découvrir Pix',
            description: {
              title: "Pix, c'est quoi ?",
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
            separator: false,
            sections: [
              {
                title: 'La plateforme Pix',
                links: [
                  {
                    name: 'Défis et compétences',
                    url: 'https://pix.fr/les-tests',
                  },
                  {
                    name: 'Score et niveaux ',
                    url: 'https://pix.fr/les-tests',
                  },
                ],
              },
              {
                title: 'Qui sommes nous ?',
                links: [
                  { name: 'Le référentiel', url: 'https://pix.fr/les-tests' },
                  {
                    name: 'Les accompagnements',
                    url: 'https://pix.fr/les-tests',
                  },
                ],
              },
            ],
          },
          {
            name: 'Blog',
            sections: [],
            beforeIcon: null,
            alternativeTextForBeforeIcon: '',
            afterIcon: 'icn-external-link.svg',
            alternativeTextForAfterIcon: 'lien externe',
            url: 'https://pix.fr',
            separator: true,
          },
        ])
      })
    })

    describe('dropdown should open and close', () => {
      it('should have all dropdowns closed by default', () => {
        // given
        const dropdownIndex = '1'

        // when then
        expect(component.vm.isOpenDropdown(dropdownIndex)).toBeFalsy()
      })

      it('should open a dropdown', () => {
        // given
        const dropdownIndex = '1'

        // when
        component.vm.toggleDropdown(dropdownIndex)

        // then
        expect(component.vm.isOpenDropdown(dropdownIndex)).toBeTruthy()
      })

      it('should close a dropdown', () => {
        // given
        const dropdownIndex = '1'

        // when
        component.vm.toggleDropdown(dropdownIndex)
        component.vm.toggleDropdown(dropdownIndex)

        // then
        expect(component.vm.isOpenDropdown(dropdownIndex)).toBeFalsy()
      })
    })

    describe('#subIsActive', () => {
      it("should return false if links does not contain a link.url that's the same as the current route", () => {
        // given
        $route.path = '/tests'
        const links = [
          {
            title: 'Évaluer',
            links: [
              { name: 'Les tests Pix', url: 'http://pix.fr/les-tests' },
              {
                name: 'Domaines et compétences',
                url: 'http://pix.fr/trouver-une-session',
              },
            ],
          },
          {
            title: 'Développer',
            links: [
              {
                name: 'Les accompagnements',
                url: 'http://pix.fr/score-et-niveaux',
              },
            ],
          },
        ]

        // when then
        expect(component.vm.subIsActive(links)).toBe(false)
      })

      it('should return true if links contains link.url same as the current route', () => {
        // given
        $route.path = '/les-tests'
        const links = [
          {
            title: 'Évaluer',
            links: [
              { name: 'Les tests Pix', url: 'http://pix.fr/les-tests' },
              {
                name: 'Domaines et compétences',
                url: 'http://pix.fr/trouver-une-session',
              },
            ],
          },
          {
            title: 'Développer',
            links: [
              {
                name: 'Les accompagnements',
                url: 'http://pix.fr/score-et-niveaux',
              },
            ],
          },
        ]

        // when then
        expect(component.vm.subIsActive(links)).toBe(true)
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
        const separator = true
        const descriptionCategoryTitle = "Pix, c'est quoi ?"
        const descriptionCategoryText =
          'Pix vous accompagne pour tester vos compétences'
        const menuSectionTitle = 'Évaluer'
        const menuName = 'Les tests Pix'
        const menuLink = 'http://pix.fr/les-tests'

        // when then
        expect(
          component.vm.createCategory(
            categoryName,
            separator,
            descriptionCategoryTitle,
            descriptionCategoryText,
            menuSectionTitle,
            menuName,
            menuLink
          )
        ).toEqual({
          description: {
            text: 'Pix vous accompagne pour tester vos compétences',
            title: "Pix, c'est quoi ?",
          },
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
          separator: true,
        })
      })
    })
  })
})
