export const DOCUMENTS = {
  HOT_NEWS: 'hot_news',
  MAIN_FOOTER: 'main_footer',
  MAIN_NAVIGATION: 'main_navigation',
  NEWS_ITEM: 'news_item',
  SIMPLE_PAGE: 'simple_page',
  FORM_PAGE: 'form_page',
  SLICES_PAGE: 'slices_page',
  STATISTIQUES: 'statistiques',
}

export const TAGS = {
  INDEX: 'index',
}

export function documentFetcher(prismic, i18n) {
  const prismicLang = getPrismicLang(i18n)

  return {
    get: getSingle,
    findHotNewsBanner: async () => {
      const documents = await prismic.api.query(
        prismic.predicates.at('document.type', DOCUMENTS.HOT_NEWS),
        { lang: prismicLang }
      )
      return documents.results[0]
    },
    findMainNavigation: async () => {
      const documents = await prismic.api.query(
        [
          prismic.predicates.at('document.type', DOCUMENTS.MAIN_NAVIGATION),
          prismic.predicates.at(
            `my.${DOCUMENTS.MAIN_NAVIGATION}.navigation_for`,
            process.env.SITE
          ),
        ],
        { lang: prismicLang }
      )
      return documents.results[0]
    },
    findMainFooter: async () => {
      const documents = await prismic.api.query(
        [
          prismic.predicates.at('document.type', DOCUMENTS.MAIN_FOOTER),
          prismic.predicates.at(
            `my.${DOCUMENTS.MAIN_FOOTER}.footer_for`,
            process.env.SITE
          ),
        ],
        { lang: prismicLang }
      )
      return documents.results[0]
    },
    getEmployers: async () => {
      const document = await prismic.api.getSingle('employers', {
        lang: prismicLang,
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
          lang: prismicLang,
        }
      )
      return documents.results
    },
    getNewsItemByUid: async (slug) => {
      const document = await prismic.api.query(
        prismic.predicates.at(`my.${DOCUMENTS.NEWS_ITEM}.uid`, slug),
        { lang: prismicLang }
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
    return prismic.api.getSingle(type, { lang: prismicLang })
  }

  async function getSimplePageByUid(uid) {
    const document = await prismic.api.query(
      prismic.predicates.at(`my.${DOCUMENTS.SIMPLE_PAGE}.uid`, uid),
      { lang: prismicLang }
    )
    return document.results[0]
  }

  async function getFormPageByUid(uid) {
    const document = await prismic.api.query(
      prismic.predicates.at(`my.${DOCUMENTS.FORM_PAGE}.uid`, uid),
      { lang: prismicLang }
    )
    return document.results[0]
  }

  async function getSlicesPageByUid(uid) {
    const document = await prismic.api.query(
      prismic.predicates.at(`my.${DOCUMENTS.SLICES_PAGE}.uid`, uid),
      { lang: prismicLang }
    )
    return document.results[0]
  }
}

export function getPrismicLang(i18n = { defaultLocale: 'fr-fr' }) {
  const userLocale = i18n.locale || i18n.defaultLocale
  return i18n.locales.find((locale) => locale.code === userLocale).prismicLang
}
