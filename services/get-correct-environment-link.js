import { getBaseUrl } from './get-base-url'

export function getCorrectEnvironmentLink(link) {
  try {
    const url = new URL(link)

    if (url.host.includes('pix.fr')) {
      const frHost = getBaseUrl(
        url.host.replace('pix.fr', process.env.DOMAIN_FR)
      )
      return new URL(url.pathname + url.search, frHost).href
    } else if (url.host.includes('pix.org')) {
      const orgHost = getBaseUrl(
        url.host.replace('pix.org', process.env.DOMAIN_ORG)
      )
      return new URL(url.pathname + url.search, orgHost).href
    }

    return link
  } catch (error) {
    // Probably a relative link, return it as is
    return link
  }
}
