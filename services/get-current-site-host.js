import { SITES_PRISMIC_TAGS } from './available-sites'

export function getCurrentSiteHost(locale) {
  if (process.env.SITE === SITES_PRISMIC_TAGS.PIX_PRO) return 'pro.pix.fr'
  if (locale === 'fr-fr') return 'pix.fr'
  return 'pix.org'
}
