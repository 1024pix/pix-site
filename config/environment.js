import { SITES_PRISMIC_TAGS } from '../services/available-sites'

export const config = {
  site: process.env.SITE,
  siteDomain: process.env.SITE_DOMAIN,
  isFrenchDomain: process.env.SITE_DOMAIN === 'pix.fr',
  isPixSite: process.env.SITE === SITES_PRISMIC_TAGS.PIX_SITE,
  prismic: {
    apiEndpoint: process.env.PRISMIC_API_ENDPOINT,
  },
  matomo: {
    containerUrl: process.env.MATOMO_CONTAINER,
    debug: process.env.MATOMO_DEBUG || false,
  },
  featureToggles: {
    disableLanguageSwitcherPixProOrg:
      process.env.FT_DISABLE_PIX_PRO_LANGUAGE_SWITCHER &&
      process.env.SITE === SITES_PRISMIC_TAGS.PIX_PRO &&
      process.env.SITE_DOMAIN === 'pix.org',
  },
}
