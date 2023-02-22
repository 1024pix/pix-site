import { mount } from '@vue/test-utils'
import LocaleSuggestionBanner from '~/components/LocaleSuggestionBanner.vue'

describe('Component: LocaleSuggestionBanner', () => {
  let processEnvBackup

  beforeEach(() => {
    processEnvBackup = { ...process.env }
  })

  afterEach(() => {
    process.env = { ...processEnvBackup }
  })

  describe('when on french domain (pix-site.fr)', () => {
    describe('when user is located outside of France', () => {
      it('renders the locale suggestion banner', () => {
        // given
        process.env.DOMAIN_ORG = 'example.org'
        const $t = () =>
          `Vous semblez ne pas être en France. Voulez-vous accéder au <a href="https://${process.env.DOMAIN_ORG}">site Pix international</a> ?`

        // when
        const component = mount(LocaleSuggestionBanner, {
          propsData: { isOpen: true },
          mocks: { $t },
        })

        // then
        expect(component.find('a').html()).toContain(
          '<a href="https://example.org">site Pix international</a>'
        )
      })
    })

    describe('when user is located in France', () => {
      it('does not render the locale suggestion banner', () => {
        // given & when
        const component = mount(LocaleSuggestionBanner, {
          propsData: { isOpen: false },
        })

        // then
        expect(component.find('.locale-suggestion-banner').exists()).toBe(false)
      })
    })
  })
})
