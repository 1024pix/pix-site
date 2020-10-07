import { shallowMount } from '@vue/test-utils'
import { documentFetcher } from '~/services/document-fetcher'
import LogosZone from '~/components/slices/LogosZone'

jest.mock('~/services/document-fetcher')

describe('LogosZone slice', () => {
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

  describe('Slice: LogosZone', () => {
    let logoGovernment
    let logoPix

    beforeEach(() => {
      logoGovernment = {
        display_on_pix_site: true,
        display_on_pix_pro: false,
        image: {
          alt: 'République française',
          url: 'logo.png',
        },
        url: '',
      }

      logoPix = {
        display_on_pix_site: true,
        display_on_pix_pro: true,
        image: {
          alt: 'Pix',
          url: 'pix.png',
        },
        url: '/',
      }
    })

    describe('#filteredLogos', () => {
      describe('when is Pix Site', () => {
        beforeEach(() => {
          jest.resetModules()
          process.env = {
            isPixSite: true,
            isPixPro: false,
          }
        })

        it('should return Pix Site logos', () => {
          // given
          component = shallowMount(LogosZone, {
            stubs: {
              fa: true,
              'pix-link': true,
              'pix-image': true,
            },
            propsData: {
              slice: {
                items: [logoGovernment, logoPix],
              },
            },
            computed: {
              $prismic() {
                return { asText: () => {} }
              },
            },
          })

          // when
          const result = component.vm.filteredLogos

          // then
          expect(result).toEqual([logoGovernment, logoPix])
        })
      })

      describe('when is Pix Pro', () => {
        beforeEach(() => {
          jest.resetModules()
          process.env = {
            isPixSite: false,
            isPixPro: true,
          }
        })

        it('should return Pix Pro logos', () => {
          // given
          component = shallowMount(LogosZone, {
            stubs: {
              fa: true,
              'pix-link': true,
              'pix-image': true,
            },
            propsData: {
              slice: {
                items: [logoGovernment, logoPix],
              },
            },
            computed: {
              $prismic() {
                return { asText: () => {} }
              },
            },
          })

          // when
          const result = component.vm.filteredLogos

          // then
          expect(result).toEqual([logoPix])
        })
      })
    })
  })
})
