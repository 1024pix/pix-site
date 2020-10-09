import { shallowMount } from '@vue/test-utils'
import NavigationSliceZone from '~/components/NavigationSliceZone'

jest.mock('~/services/document-fetcher')

describe('NavigationSliceZone slice', () => {
  let component
  let store

  const expectedSiteNavigation = {
    data: {
      navigation_for: 'pix-site',
      body: [
        {
          slice_type: 'logos_zone',
          slice_label: null,
          items: [],
          primary: {},
        },
        {
          slice_type: 'navigation_zone',
          items: [],
          primary: {},
        },
        {
          slice_type: 'actions_zone',
          slice_label: null,
          items: [],
          primary: {},
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
          slice_label: null,
          items: [],
          primary: {},
        },
        {
          slice_type: 'navigation_zone',
          items: [],
          primary: {},
        },
        {
          slice_type: 'actions_zone',
          slice_label: null,
          items: [],
          primary: {},
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

    describe('When we are in pix-site and we have two navigation', () => {
      beforeEach(() => {
        store = {
          state: {
            mainNavigation: [expectedSiteNavigation, expectedProNavigation],
          },
        }
      })

      it('should return the site navigation', () => {
        // given
        component = shallowMount(NavigationSliceZone, {
          mocks: {
            $store: store,
          },
          stubs: {
            'client-only': true,
            'push-menu': true,
            'burger-menu-nav': true,
            'organization-nav': true,
            'logos-zone': true,
            'navigation-zone': true,
            'actions-zone': true,
            'pix-pro-sub-nav': true,
            fa: true,
          },
        })

        // when
        const result = component.vm.usedMainNavigation

        // then
        expect(result).toEqual(expectedSiteNavigation)
      })
    })

    describe('When we are in pix-pro and we have two navigation', () => {
      beforeEach(() => {
        process.env = {
          isPixPro: true,
        }
        store = {
          state: {
            mainNavigation: [expectedSiteNavigation, expectedProNavigation],
          },
        }
      })

      it('should return the pro navigation', () => {
        // given
        component = shallowMount(NavigationSliceZone, {
          mocks: {
            $store: store,
          },
          stubs: {
            'client-only': true,
            'push-menu': true,
            'burger-menu-nav': true,
            'organization-nav': true,
            'logos-zone': true,
            'navigation-zone': true,
            'actions-zone': true,
            'pix-pro-sub-nav': true,
            fa: true,
          },
        })

        // when
        const result = component.vm.usedMainNavigation

        // then
        expect(result).toEqual(expectedProNavigation)
      })
    })

    describe('When we are in pix-pro and we have only the site navigation', () => {
      beforeEach(() => {
        process.env = {
          isPixPro: true,
        }
        store = {
          state: {
            mainNavigation: [expectedSiteNavigation],
          },
        }
      })

      it('should return the site navigation', () => {
        // given
        component = shallowMount(NavigationSliceZone, {
          mocks: {
            $store: store,
          },
          stubs: {
            'client-only': true,
            'push-menu': true,
            'burger-menu-nav': true,
            'organization-nav': true,
            'logos-zone': true,
            'navigation-zone': true,
            'actions-zone': true,
            'pix-pro-sub-nav': true,
            fa: true,
          },
        })

        // when
        const result = component.vm.usedMainNavigation

        // then
        expect(result).toEqual(expectedSiteNavigation)
      })
    })
  })
})
