import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

export default function(i18n = { defaultLocale: 'fr-fr' }) {
  const language = i18n.locale || i18n.defaultLocale
  return {
    getNavigation: () => {
      return getSingle('navigation')
    },
    getMediation: () => {
      return getSingle('mediation')
    },
    getHigherEducation: async () => {
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
      return api.getSingle('higher-education', {
        fetchLinks: ['key_numbers.title', 'key_numbers.column'],
        lang: language
      })
    }
  }

  async function getSingle(type) {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
    return api.getSingle(type, { lang: language })
  }
}
