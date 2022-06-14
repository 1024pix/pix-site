import { SITES_PRISMIC_TAGS } from './available-sites'

export function getCurrentSiteHost(locale) {
  const subDomain =
    process.env.SITE === SITES_PRISMIC_TAGS.PIX_PRO ? 'pro.' : ''

  if (locale === 'fr-fr') {
    return `${subDomain}pix.fr`
  }

  return `${subDomain}pix.org`
}
