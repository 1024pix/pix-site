import Prismic from '@prismicio/client'
import { language } from '../config/language'
import { SITES_PRISMIC_TAGS } from './available-sites'
import { DOCUMENTS } from './document-fetcher'

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
    Prismic.Predicates.any('document.type', [
      DOCUMENTS.SIMPLE_PAGE,
      DOCUMENTS.FORM_PAGE,
    ]),
    {
      pageSize: 100,
      page,
      lang: process.env.SITE === SITES_PRISMIC_TAGS.PIX_SITE ? '*' : 'fr-fr',
    }
  )

  const availableLangs = language.locales.map((locale) => locale.code)
  const routes = results
    .filter(({ uid }) => Boolean(uid))
    .filter(({ lang }) => availableLangs.includes(lang))
    .map(({ uid, lang }) => {
      if (lang === 'fr-fr') return `/${uid}`
      return `/${lang}/${uid}`
    })

  return { totalPages, routes }
}
