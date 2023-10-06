import Prismic from '@prismicio/client'
import { localization } from '../config/localization'
import { config } from '../config/environment'
import { linkResolver } from '../services/link-resolver'

export default async function () {
  const api = await Prismic.getApi(config.prismic.apiEndpoint)
  const { routes, totalPages } = await getRoutesInPage(api, 1)

  for (let page = 2; page <= totalPages; page++) {
    const { routes: nextPageRoutes } = await getRoutesInPage(api, page)
    routes.push(...nextPageRoutes)
  }

  if (config?.featureToggles?.isNewSupportPageEnabled) {
    routes.push('/support/contact')
  }
  console.info(`${routes.length} routes will be generated`)

  return routes
}

async function getRoutesInPage(api, page) {
  const { results, total_pages: totalPages } = await api.query(
    [
      Prismic.Predicates.at('document.tags', [config.site]),
      Prismic.Predicates.not('document.tags', ['fragment']),
    ],
    {
      pageSize: 100,
      page,
      lang: '*',
    }
  )

  const localesToBuild = localization.localesForCurrentSite.map(
    ({ code }) => code
  )
  const routes = results
    .filter(({ uid }) => Boolean(uid))
    .filter(({ lang }) => localesToBuild.includes(lang))
    .map(linkResolver)

  return { totalPages, routes }
}
