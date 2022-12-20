/**
 * Adds current URL scheme to a domain (http:// or https://)
 */

export function getAbsoluteUrlIfSwitchWebsite({
  relativeTarget,
  targetDomain,
  currentLocation = document.location,
}) {
  const targetUrl = getBaseUrl(targetDomain, currentLocation)
  const currentUrl = new URL(currentLocation)

  if (_isOnCurrentDomain(targetUrl, currentUrl)) {
    return relativeTarget
  }

  return new URL(relativeTarget, targetUrl).href
}

function _isOnCurrentDomain(targetUrl, currentUrl) {
  return targetUrl.hostname === currentUrl.hostname
}

function getBaseUrl(domain, currentLocation = document.location) {
  return new URL(`//${domain}`, currentLocation)
}
