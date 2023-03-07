import { shallowMount } from '@vue/test-utils'
import Index from '@/pages/pix-site/index.vue'

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
        expect(localeLinks.length).toBe(4)
      })
    })

    describe('when there is a locale cookie', () => {
      describe('with international format', () => {
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

      describe('with BCP47 format', () => {
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

      describe('when there is a locale cookie', () => {
        describe('with international format', () => {
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

        describe('with BCP47 format', () => {
          test('returns the proper locale in lowercase', () => {
            // given
            document.cookie = 'foo=bar; locale=en-GB'
            const wrapper = shallowMount(Index, {
              mocks: { $router },
              stubs: ['client-only', 'pix-image', 'locale-link'],
            })

            // when
            const chosenLocale = wrapper.vm.getLocaleFromCookie()

            // then
            expect(chosenLocale).toBe('en-gb')
          })
        })

        describe('in lowercase', () => {
          test('returns the proper locale', () => {
            // given
            document.cookie = 'foo=bar; locale=en-gb'
            const wrapper = shallowMount(Index, {
              mocks: { $router },
              stubs: ['client-only', 'pix-image', 'locale-link'],
            })

            // when
            const chosenLocale = wrapper.vm.getLocaleFromCookie()

            // then
            expect(chosenLocale).toBe('en-gb')
          })
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
