import { SITES_PRISMIC_TAGS } from '../services/available-sites'

export const config = {
  easiware: {
    scriptUrl: process.env.EASIWARE_SCRIPT_URL,
  },
  site: process.env.SITE,
  siteDomain: process.env.SITE_DOMAIN,
  isFrenchDomain: process.env.SITE_DOMAIN === 'pix.fr',
  isPixSite: process.env.SITE === SITES_PRISMIC_TAGS.PIX_SITE,
  isSeoIndexingEnabled: process.env.SEO_ENABLE_INDEXING === 'true',
  prismic: {
    apiEndpoint: process.env.PRISMIC_API_ENDPOINT,
  },
  matomo: {
    containerUrl: process.env.MATOMO_CONTAINER,
    debug: process.env.MATOMO_DEBUG || false,
  },
  featureToggles: {},
  domain: {
    french: process.env.DOMAIN_FR,
    international: process.env.DOMAIN_ORG,
  },
}
