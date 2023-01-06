import { shallowMount } from '@vue/test-utils'
import Index from '@/pages/pix-site/index.vue'

describe('Index Page', () => {
  let $router

  beforeEach(() => {
    $router = {
      push: jest.fn(),
    }

    let cookieJar = ''

    jest.spyOn(document, 'cookie', 'set').mockImplementation((cookie) => {
      cookieJar = cookie
    })
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => cookieJar)
  })

  describe('#mounted', () => {
    describe('when there is no cookie', () => {
      test('redirects to /locale-choice page', () => {
        // given
        document.cookie = ''

        // when
        shallowMount(Index, { mocks: { $router } })

        // then
        expect($router.push).toHaveBeenCalledWith('/locale-choice')
      })
    })

    describe('when there is a cookie', () => {
      test('redirects to locale page', () => {
        // given
        document.cookie = 'foo=bar; locale=fr'

        // when
        shallowMount(Index, { mocks: { $router } })

        // then
        expect($router.push).toHaveBeenCalledWith('/fr/')
      })
    })
  })

  describe('#methods', () => {
    describe('#getLocaleFromCookie', () => {
      describe('when there is no cookie', () => {
        test('returns no locale', () => {
          // given
          document.cookie = ''
          const wrapper = shallowMount(Index, { mocks: { $router } })

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
          const wrapper = shallowMount(Index, { mocks: { $router } })

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
          const wrapper = shallowMount(Index, { mocks: { $router } })

          // when
          const chosenLocale = wrapper.vm.getLocaleFromCookie()

          // then
          expect(chosenLocale).toBe(null)
        })
      })
    })
  })
})
