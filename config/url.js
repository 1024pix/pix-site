/**
 * Warning, if you want to use this function in SSR,
 * it only works in dev mode due to req not being present in static generation build
 * (see {@link https://nuxtjs.org/docs/internals-glossary/context/#req})
 * @returns {string} a base url (ex: http://localhost:7000)
 */
export function getBaseUrl(context) {
  const { isDev, req } = context
  const protocol = isDev ? 'http' : 'https'

  return process.server
    ? `${protocol}://${req?.headers?.host}`
    : window.location.origin
}
