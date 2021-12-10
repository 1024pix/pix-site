import { shallowMount } from '@vue/test-utils'
import NavigationSliceZone from '~/components/NavigationSliceZone'

jest.mock('~/services/document-fetcher')

describe('NavigationSliceZone', () => {
  let component
  const stubs = {
    'client-only': true,
    'slide-menu': true,
    'burger-menu-nav': true,
    'organization-nav': true,
    'slices-logos-zone': true,
    'slices-navigation-zone': true,
    'slices-actions-zone': true,
    fa: true,
  }

  const expectedSiteNavigation = {
    data: {
      body: [
        {
          slice_type: 'logos_zone',
          items: [],
        },
        {
          slice_type: 'navigation_zone',
          items: [],
        },
        {
          slice_type: 'actions_zone',
          items: [],
        },
      ],
    },
  }

  describe('Slice: NavigationSliceZone', () => {
    describe('#usedMainNavigation', () => {
      it('should return the site navigation', () => {
        // given
        component = shallowMount(NavigationSliceZone, {
          data() {
            return { usedMainNavigation: expectedSiteNavigation.data.body }
          },
          stubs,
        })

        // when
        const result = component.vm.usedMainNavigation

        // then
        expect(result).toEqual(expectedSiteNavigation.data.body)
      })
    })
  })
})
