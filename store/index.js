import { documents, documentFetcher } from '~/services/document-fetcher'

export const state = () => ({
  hotNews: null,
  host: null,
  mainNavigations: [],
  mainFooters: [],
})
export const actions = {
  async nuxtServerInit({ commit }, { app, req }) {
    commit(
      'updateMainNavigations',
      await getMainNavigations(app.$prismic, app.i18n)
    )
    commit('updateMainFooters', await getMainFooters(app.$prismic, app.i18n))
    commit('updateHotNews', await getHotNews(app.$prismic, app.i18n))
  },
  async updateMainNavigations({ commit }, { i18n, prismic }) {
    commit('updateMainNavigations', await getMainNavigations(prismic, i18n))
  },
  async updateMainFooters({ commit }, { i18n, prismic }) {
    commit('updateMainFooters', await getMainFooters(prismic, i18n))
  },
}
export const mutations = {
  updateMainNavigations(state, navigations) {
    state.mainNavigations = [...navigations]
  },
  updateMainFooters(state, footers) {
    state.mainFooters = [...footers]
  },
  updateHotNews(state, hotNews) {
    state.hotNews = hotNews && hotNews.data ? hotNews.data.description : null
  },
}

function getMainNavigations(prismic, i18n) {
  return documentFetcher(prismic, i18n).findByType(documents.mainNavigation)
}

function getMainFooters(prismic, i18n) {
  return documentFetcher(prismic, i18n).findByType(documents.mainFooter)
}

function getHotNews(prismic, i18n) {
  return documentFetcher(prismic, i18n).get(documents.hotNews)
}
