import { shallowMount } from '@vue/test-utils'
import { documentFetcher } from '~/services/document-fetcher'
import NavigationZone from '~/components/slices/NavigationZone'

jest.mock('~/services/document-fetcher')

describe('NavigationZone slice', () => {
  let component
  const get = jest.fn()

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
    describe('#navigationLinks', () => {
      beforeEach(() => {
        component = shallowMount(NavigationZone, {
          stubs: { 'pix-link': true },
          propsData: {
            slice: {
              items: [
                { name: 'Découvrir Pix', link: '/', group: [] },
                { name: 'Les tests', link: '/tests', group: [] },
                {
                  name: 'Enseignement scolaire',
                  link: '/sco',
                  group: [{ text: 'Enseignement' }],
                },
                {
                  name: 'Enseignement supérieur',
                  link: '/sup',
                  group: [{ text: 'Enseignement' }],
                },
                { name: 'Pix Pro', link: '/pro', group: [] },
              ],
            },
          },
          computed: {
            $prismic() {
              return { asText: () => {} }
            },
          },
        })
      })

      it('should aggregate navigation links of the same group', () => {
        const navigationLinks = component.vm.navigationLinks
        expect(navigationLinks).toEqual([
          { name: 'Découvrir Pix', link: '/', group: [] },
          { name: 'Les tests', link: '/tests', group: [] },
          {
            name: 'Enseignement',
            subNavigationLinks: [
              {
                name: 'Enseignement scolaire',
                link: '/sco',
                group: [{ text: 'Enseignement' }],
              },
              {
                name: 'Enseignement supérieur',
                link: '/sup',
                group: [{ text: 'Enseignement' }],
              },
            ],
          },
          { name: 'Pix Pro', group: [], link: '/pro' },
        ])
      })
    })
  })
})
