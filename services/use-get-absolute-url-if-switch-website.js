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

function getBaseUrl(domain) {
  return new URL(`//${domain}`, document.location)
}
