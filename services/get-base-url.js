/**
 * Adds current URL scheme to a domain (http:// or https://)
 */
export function getBaseUrl(domain) {
  return new URL(`//${domain}`, document.location)
}
