export const DOCUMENTS = {
  HOT_NEWS: 'hot_news',
  INDEX: 'index',
  MAIN_FOOTER: 'main_footer',
  MAIN_NAVIGATION: 'main_navigation',
  NEWS_ITEM: 'news_item',
  SIMPLE_PAGE: 'simple_page',
  FORM_PAGE: 'form_page',
  SLICES_PAGE: 'slices_page',
  COMPETENCES: 'competences',
  STATISTIQUES: 'statistiques',
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
    findHotNewsBanner: async () => {
      const documents = await prismic.api.query(
        prismic.predicates.at('document.type', DOCUMENTS.HOT_NEWS),
        { lang }
      )
      return documents.results
    },
    findMainNavigation: async () => {
      const documents = await prismic.api.query(
        [
          prismic.predicates.at('document.type', DOCUMENTS.MAIN_NAVIGATION),
          prismic.predicates.at(
            `my.${DOCUMENTS.MAIN_NAVIGATION}.navigation_for`,
            process.env.SITE === 'pix-site' ? 'pix-site' : 'pix-pro'
          ),
        ],
        { lang }
      )
      return documents.results[0]
    },
    findMainFooter: async () => {
      const documents = await prismic.api.query(
        [
          prismic.predicates.at('document.type', DOCUMENTS.MAIN_FOOTER),
          prismic.predicates.at(
            `my.${DOCUMENTS.MAIN_FOOTER}.footer_for`,
            process.env.SITE === 'pix-site' ? 'pix-site' : 'pix-pro'
          ),
        ],
        { lang }
      )
      return documents.results[0]
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
        prismic.predicates.at('document.type', DOCUMENTS.NEWS_ITEM),
        {
          page,
          pageSize,
          orderings: `[my.${DOCUMENTS.NEWS_ITEM}.date desc]`,
          lang,
        }
      )
      return documents.results
    },
    getNewsItemByUid: async (slug) => {
      const document = await prismic.api.query(
        prismic.predicates.at(`my.${DOCUMENTS.NEWS_ITEM}.uid`, slug),
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
      prismic.predicates.at(`my.${DOCUMENTS.SIMPLE_PAGE}.uid`, uid),
      { lang }
    )
    return document.results[0]
  }

  async function getFormPageByUid(uid) {
    const document = await prismic.api.query(
      prismic.predicates.at(`my.${DOCUMENTS.FORM_PAGE}.uid`, uid),
      { lang }
    )
    return document.results[0]
  }

  async function getSlicesPageByUid(uid) {
    const document = await prismic.api.query(
      prismic.predicates.at(`my.${DOCUMENTS.SLICES_PAGE}.uid`, uid),
      { lang }
    )
    return document.results[0]
  }
}
