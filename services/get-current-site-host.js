import { SITES_PRISMIC_TAGS } from './available-sites'

export function getCurrentSiteHost(locale, withProtocol = false) {
  const protocol = withProtocol ? 'https://' : ''
  const subDomain =
    process.env.SITE === SITES_PRISMIC_TAGS.PIX_PRO ? 'pro.' : ''

  if (locale === 'fr-fr') {
    return `${protocol}${subDomain}pix.fr`
  }

  return `${protocol}${subDomain}pix.org`
}
