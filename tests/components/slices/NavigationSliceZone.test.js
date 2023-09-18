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

    describe('when FT_IS_NEW_MENU_AVAILABLE is available', () => {
      it('should return the new burger menu', () => {
        // given
        component = shallowMount(NavigationSliceZone, {
          data() {
            return { isNewMenuAvailable: true }
          },
          stubs,
        })

        // then
        expect(component.find('button.new-burger-menu').exists()).toBe(true)
        expect(component.find('.burger-menu').exists()).toBe(false)
      })

      it('should return the new navigation menu', () => {
        // given
        component = shallowMount(NavigationSliceZone, {
          data() {
            return { isNewMenuAvailable: true }
          },
          stubs,
        })

        // then
        expect(component.find('nav.new-navigation-menu').exists()).toBe(true)
        expect(component.find('nav.navigation-zone').exists()).toBe(false)
      })
    })
  })
})
