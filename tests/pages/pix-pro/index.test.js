import { shallowMount } from '@vue/test-utils'
import Index from '@/pages/pix-pro/index.vue'

jest.mock('~/config/environment', () => {
  return {
    config: {
      isPixSite: false,
      domain: {
        french: 'pix.fr',
        international: 'pix.org',
      },
    },
  }
})

describe('Index Page', () => {
  let $router

  beforeEach(() => {
    $router = {
      replace: jest.fn(),
    }

    let cookieJar = ''

    jest.spyOn(document, 'cookie', 'set').mockImplementation((cookie) => {
      cookieJar = cookie
    })
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => cookieJar)
  })

  describe('#mounted', () => {
    describe('when there is no cookie', () => {
      test('do not redirect', async () => {
        // given
        document.cookie = ''

        // when
        const wrapper = shallowMount(Index, {
          mocks: { $router },
          stubs: ['client-only', 'pix-image', 'locale-link'],
        })
        await wrapper.vm.$nextTick()

        // then
        expect($router.replace).not.toHaveBeenCalled()
        const localeLinks = wrapper.findAll('locale-link-stub')
        expect(localeLinks.length).toBe(3)
      })
    })

    describe('when there is a locale cookie', () => {
      describe('with value being only one subtag', () => {
        test('redirects to locale page', async () => {
          // given
          document.cookie = 'foo=bar; locale=fr'

          // when
          const wrapper = shallowMount(Index, {
            mocks: { $router },
            stubs: ['client-only', 'pix-image', 'locale-link'],
          })
          await wrapper.vm.$nextTick()

          // then
          expect($router.replace).toHaveBeenCalledWith('/fr/')
          const localeLinks = wrapper.findAll('locale-link-stub')
          expect(localeLinks.length).toBe(0)
        })
      })

      describe('with value being in canonical BCP 47 format', () => {
        test('redirects to correct locale page', async () => {
          // given
          document.cookie = 'foo=bar; locale=en-GB'

          // when
          const wrapper = shallowMount(Index, {
            mocks: { $router },
            stubs: ['client-only', 'pix-image', 'locale-link'],
          })
          await wrapper.vm.$nextTick()

          // then
          expect($router.replace).toHaveBeenCalledWith('/en-gb/')
          const localeLinks = wrapper.findAll('locale-link-stub')
          expect(localeLinks.length).toBe(0)
        })
      })

      describe('in lowercase', () => {
        test('redirects to correct locale page', async () => {
          // given
          document.cookie = 'foo=bar; locale=en-gb'

          // when
          const wrapper = shallowMount(Index, {
            mocks: { $router },
            stubs: ['client-only', 'pix-image', 'locale-link'],
          })
          await wrapper.vm.$nextTick()

          // then
          expect($router.replace).toHaveBeenCalledWith('/en-gb/')
          const localeLinks = wrapper.findAll('locale-link-stub')
          expect(localeLinks.length).toBe(0)
        })
      })
    })
  })
})
