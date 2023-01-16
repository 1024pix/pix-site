export function filterNuxtPages(routes, config) {
  if (config.isFrenchDomain) {
    return routes.filter(
      (route) => !(route.name === 'index' && route.path === '/')
    )
  }

  return routes
}
