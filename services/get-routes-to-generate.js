import Prismic from '@prismicio/client'
import { language } from '../config/language'
import { config } from '../config/environment'
import { linkResolver } from '../services/link-resolver'

export default async function () {
  const api = await Prismic.getApi(config.prismic.apiEndpoint)
  const { routes, totalPages } = await getRoutesInPage(api, 1)

  for (let page = 2; page <= totalPages; page++) {
    const { routes: nextPageRoutes } = await getRoutesInPage(api, page)
    routes.push(...nextPageRoutes)
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
      lang: config.isPixSite ? '*' : 'fr-fr',
    }
  )

  const availableLangs = language.locales.map((locale) => locale.code)
  const routes = results
    .filter(({ uid }) => Boolean(uid))
    .filter(({ lang }) => availableLangs.includes(lang))
    .map(linkResolver)

  return { totalPages, routes }
}
