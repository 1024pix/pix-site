export const documents = {
  hotNews: 'hot_news',
  index: 'index',
  mainFooter: 'main_footer',
  mainNavigation: 'main_navigation',
}

export function documentFetcher(
  prismic,
  i18n = { defaultLocale: 'fr-fr' },
  req
) {
  const lang = i18n.locale || i18n.defaultLocale
  return {
    get: getSingle,
    findByType: async (type) => {
      const documents = await prismic.api.query(
        prismic.predicates.at('document.type', type),
        { lang }
      )
      return documents.results
    },
    getEmployers: async () => {
      const document = await prismic.api.getSingle('employers', {
        lang,
        fetchLinks: [
          'distributor_item.description',
          'distributor_item.footer',
          'distributor_item.link',
          'distributor_item.logo',
          'distributor_item.name',
        ],
      })
      return document
    },
    findNewsItems: async ({ page, pageSize } = { page: 1, pageSize: 20 }) => {
      const documents = await prismic.api.query(
        prismic.predicates.at('document.type', 'news_item'),
        {
          page,
          pageSize,
          orderings: '[my.news_item.date desc]',
          lang,
        }
      )
      return documents.results
    },
    getNewsItemByUid: async (slug) => {
      const document = await prismic.api.query(
        prismic.predicates.at('my.news_item.uid', slug),
        { lang }
      )
      return document.results[0]
    },
    getPageByUid: async (uid) => {
      const simplePage = await getSimplePageByUid(uid)
      const slicePage = await getSlicesPageByUid(uid)

      const formPage = await getFormPageByUid(uid)
      return simplePage || slicePage || formPage
    },
  }

  function getSingle(type) {
    return prismic.api.getSingle(type, { lang })
  }

  async function getSimplePageByUid(uid) {
    const document = await prismic.api.query(
      prismic.predicates.at('my.simple_page.uid', uid),
      { lang }
    )
    return document.results[0]
  }

  async function getFormPageByUid(uid) {
    const document = await prismic.api.query(
      prismic.predicates.at('my.form_page.uid', uid),
      { lang }
    )
    return document.results[0]
  }

  async function getSlicesPageByUid(uid) {
    const document = await prismic.api.query(
      prismic.predicates.at('my.slices_page.uid', uid),
      { lang }
    )
    return document.results[0]
  }
}
