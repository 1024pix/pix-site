import { shallowMount } from '@vue/test-utils'
import Index from '@/pages/pix-site/index.vue'

jest.mock('~/config/environment', () => {
  return {
    config: {
      isPixSite: true,
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
        expect(localeLinks.length).toBe(4)
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

      describe('with value equal to en-GB or in lowercase format', () => {
        const locales = ['en-gb', 'en-GB']
        locales.forEach((locale) => {
          test('redirects to correct locale page', async () => {
            // given
            document.cookie = `foo=bar; locale=${locale}`

            // when
            const wrapper = shallowMount(Index, {
              mocks: { $router },
              stubs: ['client-only', 'pix-image', 'locale-link'],
            })
            await wrapper.vm.$nextTick()

            // then
            expect($router.replace).toHaveBeenCalledWith(`/en/`)
            const localeLinks = wrapper.findAll('locale-link-stub')
            expect(localeLinks.length).toBe(0)
          })
        })
      })

      describe('with value being in canonical BCP 47 or lowercase format', () => {
        const locales = ['fr-be', 'fr-BE']
        locales.forEach((locale) => {
          test('redirects to correct locale page', async () => {
            // given
            document.cookie = `foo=bar; locale=${locale}`

            // when
            const wrapper = shallowMount(Index, {
              mocks: { $router },
              stubs: ['client-only', 'pix-image', 'locale-link'],
            })
            await wrapper.vm.$nextTick()

            // then
            expect($router.replace).toHaveBeenCalledWith(
              `/${locale.toLowerCase()}/`
            )
            const localeLinks = wrapper.findAll('locale-link-stub')
            expect(localeLinks.length).toBe(0)
          })
        })
      })
    })
  })
})
