export function filterNuxtPages(routes, config) {
  const filteredRoutes = [...routes]
  if (
    !config?.featureToggles?.isNewSupportPageEnabled &&
    config?.featureToggles?.isNewSupportPageEnabled !== undefined
  ) {
    filteredRoutes.splice(
      filteredRoutes.indexOf((route) => route.name === 'support-support-form')
    )
  }
  if (config.isFrenchDomain) {
    return filteredRoutes.filter(
      (route) => !(route.name === 'index' && route.path === '/')
    )
  }
  return filteredRoutes
}
