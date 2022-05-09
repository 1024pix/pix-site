import Prismic from '@prismicio/client'
import { language } from '../config/language'
import { linkResolver } from '../services/link-resolver'
import { SITES_PRISMIC_TAGS } from './available-sites'

export default async function () {
  const api = await Prismic.getApi(process.env.PRISMIC_API_ENDPOINT)
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
      Prismic.Predicates.at('document.tags', [process.env.SITE]),
      Prismic.Predicates.not('document.tags', ['fragment']),
    ],
    {
      pageSize: 100,
      page,
      lang: process.env.SITE === SITES_PRISMIC_TAGS.PIX_SITE ? '*' : 'fr-fr',
    }
  )

  const availableLangs = language.locales.map((locale) => locale.code)
  const routes = results
    .filter(({ uid }) => Boolean(uid))
    .filter((doc) =>
      filterDocumentByChosenLanguage(doc, process.env.SITE_DOMAIN)
    )
    .filter(({ lang }) => availableLangs.includes(lang))
    .map(linkResolver)

  return { totalPages, routes }
}

export function filterDocumentByChosenLanguage(doc, siteDomain) {
  if (siteDomain === 'pix.fr' && doc.lang === 'fr-fr') {
    return true
  }
  if (siteDomain !== 'pix.fr' && doc.lang !== 'fr-fr') {
    return true
  }
  return false
}
