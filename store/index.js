import getHostFromRequest from '~/services/get-host-from-request'
import { documents, documentFetcher } from '~/services/document-fetcher'

export const state = () => ({
  resourcesNavItems: [],
  aboutNavItems: [],
  hotNews: null,
  host: null,
  mainNavigation: [],
})
export const actions = {
  async nuxtServerInit({ commit }, { app, req }) {
    commit('updateNavigation', await getNavigation(app.$prismic, app.i18n))
    commit(
      'updateMainNavigation',
      await getMainNavigation(app.$prismic, app.i18n)
    )
    commit('updateHotNews', await getHotNews(app.$prismic, app.i18n))
    commit('updateHost', req)
  },
  async updateNavigation({ commit }, { i18n, prismic }) {
    commit('updateNavigation', await getNavigation(prismic, i18n))
  },
  async updateMainNavigation({ commit }, { i18n, prismic }) {
    commit('updateMainNavigation', await getMainNavigation(prismic, i18n))
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
    state.resourcesNavItems = navItems(navigations, 'ressources-nav')
    state.aboutNavItems = navItems(navigations, 'about-nav')
  },
  updateMainNavigation(state, navigations) {
    state.mainNavigation = navigations
  },
  updateHotNews(state, hotNews) {
    state.hotNews = hotNews && hotNews.data ? hotNews.data.description : null
  },
}

function getNavigation(prismic, i18n) {
  return documentFetcher(prismic, i18n).get(documents.navigation)
}

function getMainNavigation(prismic, i18n) {
  return documentFetcher(prismic, i18n).findByType(documents.mainNavigation)
}

function getHotNews(prismic, i18n) {
  return documentFetcher(prismic, i18n).get(documents.hotNews)
}
