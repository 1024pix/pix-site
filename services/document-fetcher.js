import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'
import LinkResolver from '~/plugins/link-resolver.js'

export const documents = {
  hotNews: 'hot_news',
  legalNotices: 'legal-notices',
  termsOfService: 'cgu_page',
  stats: 'statistiques',
  index: 'index',
  navigation: 'navigation',
  mediation: 'mediation',
  higherEducation: 'higher-education',
  keyNumbers: 'key_numbers',
  employers: 'employers',
  schoolEducation: 'school-education',
  about: 'about',
  skills: 'competences'
}

export function documentFetcher(i18n = { defaultLocale: 'fr-fr' }, req) {
  const language = i18n.locale || i18n.defaultLocale
  return {
    get: (documentName) => {
      return getSingle(documentName)
    },
    findNewsItems: async ({ page, pageSize } = { page: 1, pageSize: 20 }) => {
      const api = await getApi()
      const documents = await api.query(
        Prismic.Predicates.at('document.type', 'news_item'),
        {
          page,
          pageSize,
          orderings: '[my.news_item.date desc]',
          lang: language
        }
      )
      return documents.results
    },
    getNewsItemByUid: async (slug) => {
      const api = await getApi()
      const document = await api.query(
        Prismic.Predicates.at('my.news_item.uid', slug),
        { lang: language }
      )
      return document.results[0]
    },
    getPreviewUrl: async (previewToken) => {
      const api = await getApi()
      return api.previewSession(previewToken, LinkResolver, '/')
    },
    getSimplePageByUid: async (uid) => {
      const api = await getApi()
      const document = await api.query(
        Prismic.Predicates.at('my.simple_page.uid', uid),
        { lang: language }
      )
      return document.results[0]
    }
  }

  async function getSingle(type) {
    const api = await getApi()
    return api.getSingle(type, { lang: language })
  }

  function getApi() {
    return Prismic.getApi(PrismicConfig.apiEndpoint, { req })
  }
}
