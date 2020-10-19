import getHostFromRequest from '~/services/get-host-from-request'
import { documents, documentFetcher } from '~/services/document-fetcher'

export const state = () => ({
  hotNews: null,
  host: null,
  mainNavigations: [],
  mainFooters: [],
})
export const actions = {
  async nuxtServerInit({ commit }, { app, req }) {
    commit('updateNavigation', await getNavigation(app.$prismic, app.i18n))
    commit(
      'updateMainNavigations',
      await getMainNavigations(app.$prismic, app.i18n)
    )
    commit('updateMainFooters', await getMainFooters(app.$prismic, app.i18n))
    commit('updateHotNews', await getHotNews(app.$prismic, app.i18n))
    commit('updateHost', req)
  },
  async updateNavigation({ commit }, { i18n, prismic }) {
    commit('updateNavigation', await getNavigation(prismic, i18n))
  },
  async updateMainNavigations({ commit }, { i18n, prismic }) {
    commit('updateMainNavigations', await getMainNavigations(prismic, i18n))
  },
  async updateMainFooters({ commit }, { i18n, prismic }) {
    commit('updateMainFooters', await getMainFooters(prismic, i18n))
  },
}
export const mutations = {
  updateHost(state, req) {
    const host = getHostFromRequest(req)
    state.host = host.split(':')[0]
    if (
      state.host === this.$config.orgDomain &&
      this.$i18n.locale === 'fr-fr'
    ) {
      this.$i18n.setLocale('fr')
    }
  },
  updateNavigation(state, navigations) {
    function navItems(response, type) {
      return response.data.body.filter((body) => body.primary.type === type)
    }

    if (process.env.isPixPro) {
      state.organizationNavItems = navItems(
        navigations,
        'pix-pro-organizations-nav'
      )
    }
  },
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

function getNavigation(prismic, i18n) {
  return documentFetcher(prismic, i18n).get(documents.navigation)
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
