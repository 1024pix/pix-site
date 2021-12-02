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
      navigation_for: 'pix-site',
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

  const expectedProNavigation = {
    data: {
      navigation_for: 'pix-pro',
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
    afterEach(() => {
      process.env = {
        isPixPro: false,
      }
    })

    describe('#usedMainNavigation', () => {
      describe('When we are in pix-site and we have the site navigation', () => {
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

      describe('When we are in pix-pro and we have the pro navigation', () => {
        beforeEach(() => {
          process.env = {
            isPixPro: true,
          }
        })

        it('should return the pro navigation', () => {
          // given
          component = shallowMount(NavigationSliceZone, {
            data() {
              return { usedMainNavigation: expectedProNavigation.data.body }
            },
            stubs,
          })

          // when
          const result = component.vm.usedMainNavigation

          // then
          expect(result).toEqual(expectedProNavigation.data.body)
        })
      })

      describe('When we are in pix-pro and we have only the site navigation', () => {
        beforeEach(() => {
          process.env = {
            isPixPro: true,
          }
        })

        it('should return the site navigation', () => {
          // given
          component = shallowMount(NavigationSliceZone, {
            data() {
              return { usedMainNavigation: expectedProNavigation.data.body }
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
})
