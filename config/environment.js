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
}

if (process.env.DOMAIN_ORG === undefined) {
  throw new Error(`The DOMAIN_ORG environment variable must be provided`)
}

if (process.env.DOMAIN_FR === undefined) {
  throw new Error(`The DOMAIN_FR environment variable must be provided`)
}

const availableSiteDomains = ['pix.fr', 'pix.org']
if (!availableSiteDomains.includes(process.env.SITE_DOMAIN)) {
  throw new Error(
    `The SITE_DOMAIN environment variable must have one of these values (${availableSiteDomains})`
  )
}

const availableSites = Object.values(SITES_PRISMIC_TAGS)
if (!availableSites.includes(process.env.SITE)) {
  throw new Error(
    `The SITE environment variable must have one of these values: (${availableSites})`
  )
}
