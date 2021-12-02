import Prismic from '@prismicio/client'
import { DOCUMENTS } from './document-fetcher'

export default async function () {
  const api = await Prismic.getApi(process.env.PRISMIC_API_ENDPOINT)
  const { routes, totalPages } = await getRoutesInPage(api, 1)
  for (let page = 2; page <= totalPages; page++) {
    const { routes: nextPageRoutes } = await getRoutesInPage(api, page)
    routes.push(...nextPageRoutes)
  }
  return routes
}

async function getRoutesInPage(api, page) {
  const { results, total_pages: totalPages } = await api.query(
    Prismic.Predicates.any('document.type', [
      DOCUMENTS.SIMPLE_PAGE,
      DOCUMENTS.FORM_PAGE,
    ]),
    {
      pageSize: 100,
      page,
      lang: process.env.SITE === 'pix-site' ? '*' : 'fr-fr',
    }
  )

  const routes = results
    .filter(({ uid, type }) => Boolean(uid))
    .map(({ uid, lang }) => {
      if (lang === 'fr-fr') return `/${uid}`
      return `/${lang}/${uid}`
    })

  return { totalPages, routes }
}
