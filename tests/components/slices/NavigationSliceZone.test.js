import { shallowMount } from '@vue/test-utils'
import NavigationSliceZone from '~/components/NavigationSliceZone'

jest.mock('~/services/document-fetcher')

describe('NavigationSliceZone', () => {
  let component
  let store
  const stubs = {
    'client-only': true,
    'push-menu': true,
    'burger-menu-nav': true,
    'organization-nav': true,
    'logos-zone': true,
    'navigation-zone': true,
    'actions-zone': true,
    'pix-pro-sub-nav': true,
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
            stubs,
          })

          // when
          const result = component.vm.usedMainNavigation

          // then
          expect(result).toEqual(expectedSiteNavigation)
        })
      })

      describe('When we are in pix-pro and we have the pro navigation', () => {
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
            stubs,
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
            stubs,
          })

          // when
          const result = component.vm.usedMainNavigation

          // then
          expect(result).toEqual(expectedSiteNavigation)
        })
      })
    })

    describe('#showSubNav', () => {
      describe('When we are in pix-pro and we have the pro navigation', () => {
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

        it('should not show the subNav', () => {
          // given
          component = shallowMount(NavigationSliceZone, {
            mocks: {
              $store: store,
            },
            stubs,
          })

          // when
          const result = component.vm.showSubNav

          // then
          expect(result).toEqual(false)
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

        it('should show the subNav', () => {
          // given
          component = shallowMount(NavigationSliceZone, {
            mocks: {
              $store: store,
            },
            stubs,
          })

          // when
          const result = component.vm.showSubNav

          // then
          expect(result).toEqual(true)
        })
      })
    })
  })
})
