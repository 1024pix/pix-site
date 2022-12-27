import { shallowMount } from '@vue/test-utils'
import { documentFetcher } from '~/services/document-fetcher'
import NavigationZone from '~/components/slices/NavigationZone'

jest.mock('~/services/document-fetcher')

describe('NavigationZone slice', () => {
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

  describe('Slice: NavigationZone', () => {
    beforeEach(() => {
      component = shallowMount(NavigationZone, {
        mocks: { $route },
        stubs: { 'pix-prismic-link': true, fa: true, 'navigation-dropdown': true },
        propsData: {
          navigationZoneItems: [
            {
              items: [
                { name: 'Découvrir Pix', link: { url: '/' }, group: [] },
                { name: 'Les tests', link: { url: '/tests' }, group: [] },
                {
                  name: 'Enseignement scolaire',
                  link: { url: '/sco' },
                  group: [{ text: 'Enseignement' }],
                },
                {
                  name: 'Enseignement supérieur',
                  link: { url: '/sup' },
                  group: [{ text: 'Enseignement' }],
                },
              ],
            },
            {
              items: [{ name: 'Pix Pro', link: { url: '/pro' }, group: [] }],
            },
          ],
        },
        computed: {
          $prismic() {
            return { asText: () => {} }
          },
        },
      })
    })

    describe('#navigationLinks', () => {
      it('should aggregate navigation links of the same group', () => {
        const navigationLinks = component.vm.navigationLinks
        expect(navigationLinks).toEqual([
          { name: 'Découvrir Pix', link: { url: '/' }, group: [] },
          { name: 'Les tests', link: { url: '/tests' }, group: [] },
          {
            name: 'Enseignement',
            children: [
              {
                name: 'Enseignement scolaire',
                link: { url: '/sco' },
                group: [{ text: 'Enseignement' }],
              },
              {
                name: 'Enseignement supérieur',
                link: { url: '/sup' },
                group: [{ text: 'Enseignement' }],
              },
            ],
          },
          component.vm.SEPARATOR,
          { name: 'Pix Pro', group: [], link: { url: '/pro' } },
        ])
      })
    })

    describe('dropdown should open and close', () => {
      it('should have all dropdowns closed by default', () => {
        const dropdownIndex = '1'
        expect(component.vm.isOpenDropdown(dropdownIndex)).toBeFalsy()
      })

      it('should open a dropdown', () => {
        const dropdownIndex = '1'
        component.vm.toggleDropdown(dropdownIndex)
        expect(component.vm.isOpenDropdown(dropdownIndex)).toBeTruthy()
      })

      it('should close a dropdown', () => {
        const dropdownIndex = '1'
        component.vm.toggleDropdown(dropdownIndex)
        component.vm.toggleDropdown(dropdownIndex)
        expect(component.vm.isOpenDropdown(dropdownIndex)).toBeFalsy()
      })
    })
  })
})
