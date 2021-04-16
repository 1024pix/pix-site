import prismic from 'prismic-javascript'
import _ from 'lodash'

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
  const { results, total_pages: totalPages } = await api.query('', {
    pageSize: 100,
    page,
    lang: '*',
  })
  const uids = _.map(results, 'uid')
  const routes = _.reject(uids, _.isEmpty)
  return { totalPages, routes }
}
