import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

export default function(i18n = { defaultLocale: 'fr-fr' }) {
  const language = i18n.locale || i18n.defaultLocale
  return {
    getNavigation: async () => {
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
      return api.getSingle('navigation', { lang: language })
    }
  }
}
