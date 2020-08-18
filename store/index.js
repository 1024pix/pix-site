import getHostFromRequest from '~/services/get-host-from-request'
import { documents, documentFetcher } from '~/services/document-fetcher'

export const state = () => ({
  organizationNavItems: [],
  mainNavItems: [],
  topItems: [],
  middleItems: [],
  bottomItems: [],
  resourcesNavItems: [],
  aboutNavItems: [],
  hotNews: null,
  host: null,
})
export const actions = {
  async nuxtServerInit({ commit }, { app, req }) {
    commit('updateNavigation', await getNavigation(app.i18n))
    commit('updateHotNews', await getHotNews(app.i18n))
    commit('updateHost', req)
  },
  async updateNavigation({ commit }, i18n) {
    commit('updateNavigation', await getNavigation(i18n))
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

    state.organizationNavItems = navItems(navigations, 'organizations-nav')
    state.mainNavItems = navItems(navigations, 'main-nav')
    state.topItems = navItems(navigations, 'burger-menu-top')
    state.middleItems = navItems(navigations, 'pix-pro-burger-menu-middle')
    state.bottomItems = navItems(navigations, 'burger-menu-bottom')
    state.resourcesNavItems = navItems(navigations, 'ressources-nav')
    state.aboutNavItems = navItems(navigations, 'about-nav')
  },
  updateHotNews(state, hotNews) {
    state.hotNews = hotNews && hotNews.data ? hotNews.data.description : null
  },
}

function getNavigation(i18n) {
  return documentFetcher(i18n).get(documents.navigation)
}

function getHotNews(i18n) {
  return documentFetcher(i18n).get(documents.hotNews)
}
