import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Index from '@/pages/pix-pro/index.vue'

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
        await Vue.nextTick()

        // then
        expect($router.replace).not.toHaveBeenCalled()
        const localeLinks = wrapper.findAll('locale-link-stub')
        expect(localeLinks.length).toBe(4)
      })
    })

    describe('when there is a cookie', () => {
      test('redirects to locale page', async () => {
        // given
        document.cookie = 'foo=bar; locale=fr'

        // when
        const wrapper = shallowMount(Index, {
          mocks: { $router },
          stubs: ['client-only', 'pix-image', 'locale-link'],
        })
        await Vue.nextTick()

        // then
        expect($router.replace).toHaveBeenCalledWith('/fr/')
        const localeLinks = wrapper.findAll('locale-link-stub')
        expect(localeLinks.length).toBe(0)
      })
    })
  })

  describe('#methods', () => {
    describe('#getLocaleFromCookie', () => {
      describe('when there is no cookie', () => {
        test('returns no locale', () => {
          // given
          document.cookie = ''
          const wrapper = shallowMount(Index, {
            mocks: { $router },
            stubs: ['client-only', 'pix-image', 'locale-link'],
          })

          // when
          const chosenLocale = wrapper.vm.getLocaleFromCookie()

          // then
          expect(chosenLocale).toBe(null)
        })
      })

      describe('when there is a cookie', () => {
        test('returns the proper locale', () => {
          // given
          document.cookie = 'foo=bar; locale=fr'
          const wrapper = shallowMount(Index, {
            mocks: { $router },
            stubs: ['client-only', 'pix-image', 'locale-link'],
          })

          // when
          const chosenLocale = wrapper.vm.getLocaleFromCookie()

          // then
          expect(chosenLocale).toBe('fr')
        })
      })

      describe('with a crafted cookie', () => {
        test('cookie value is ignored', () => {
          // given
          document.cookie = 'foo=bar; locale=1234-crafted-cookie'
          const wrapper = shallowMount(Index, {
            mocks: { $router },
            stubs: ['client-only', 'pix-image', 'locale-link'],
          })

          // when
          const chosenLocale = wrapper.vm.getLocaleFromCookie()

          // then
          expect(chosenLocale).toBe(null)
        })
      })
    })
  })
})
