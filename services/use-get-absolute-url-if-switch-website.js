/**
 * Adds current URL scheme to a domain (http:// or https://)
 */

export function useGetAbsoluteUrlIfSwitchWebsite(
  relativeTarget,
  isTargetOnPixOrg,
  selectedMenu
) {
  return _getAbsoluteUrlIfSwitchWebsite(
    relativeTarget,
    isTargetOnPixOrg,
    selectedMenu.isOnPixOrg
  )
}

function _getAbsoluteUrlIfSwitchWebsite(
  relativeTarget,
  isTargetOnPixOrg,
  isOnPixOrg
) {
  if (!isOnPixOrg && isTargetOnPixOrg) {
    const orgBaseUrl = getBaseUrl(process.env.DOMAIN_ORG)
    return new URL(relativeTarget, orgBaseUrl).href
  }

  if (isOnPixOrg && !isTargetOnPixOrg) {
    const frBaseUrl = getBaseUrl(process.env.DOMAIN_FR)
    return new URL(relativeTarget, frBaseUrl).href
  }

  return relativeTarget
}

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
