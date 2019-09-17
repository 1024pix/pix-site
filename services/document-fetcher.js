import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

export default {
  getNavigation: async () => {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
    return api.getSingle('navigation')
  }
}
