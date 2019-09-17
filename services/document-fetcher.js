import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

export default function(lang = 'fr-fr') {
  return {
    getNavigation: async () => {
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
      return api.getSingle('navigation', { lang })
    }
  }
}
