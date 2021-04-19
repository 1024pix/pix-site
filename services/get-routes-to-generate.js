import prismic from 'prismic-javascript'

export default async function () {
  const api = await prismic.getApi(process.env.PRISMIC_API_ENDPOINT)
  const { routes, totalPages } = await getRoutesInPage(api, 1)
  for (let page = 2; page <= totalPages; page++) {
    const { routes: nextPageRoutes } = await getRoutesInPage(api, page)
    routes.push(...nextPageRoutes)
  }
  return routes
}

async function getRoutesInPage(api, page) {
  const { results, total_pages: totalPages } = await api.query(
    prismic.Predicates.any('document.type', ['simple_page', 'form_page']),
    {
      pageSize: 100,
      page,
      lang: '*',
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
