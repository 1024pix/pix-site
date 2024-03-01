import * as prismic from '@prismicio/client'
import { linkResolver } from '../../shared/services/link-resolver.js'

export const getRoutesToGenerate = async function({ locales }) {
  console.log(process.env.PRISMIC_API_TOKEN)
  const client = await prismic.createClient(process.env.PRISMIC_API_ENDPOINT, { 'accessToken': process.env.PRISMIC_API_TOKEN })
  const { routes, totalPages } = await getRoutesInPage(client, 1, locales)

  for (let page = 2; page <= totalPages; page++) {
    const { routes: nextPageRoutes } = await getRoutesInPage(client, page, locales)
    routes.push(...nextPageRoutes)
  }

  console.info(`${routes.length} routes will be generated`)
  return routes
}

async function getRoutesInPage(prismicClient, page, locales) {
  const { results, total_pages: totalPages } = await prismicClient.get({
      filters: [
        prismic.filter.at('document.tags', ['pix-site']),
        prismic.filter.not('document.tags', ['fragment'])
      ],
      pageSize: 100,
      page,
      lang: '*'
    }
  )
  const localesToBuild = locales.map(
    ({ code }) => code
  )

  const routes = results
    .filter(({ uid }) => Boolean(uid))
    .filter(({ lang }) => localesToBuild.includes(lang))
    .map(linkResolver)

  return { totalPages, routes }
}
