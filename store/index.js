import DocumentFetcher from '~/services/document-fetcher'

export const state = () => ({
  organizationNavItems: [],
  mainNavItems: [],
  topItems: [],
  bottomItems: [],
  resourcesNavItems: [],
  aboutNavItems: []
})
export const actions = {
  async nuxtServerInit({ state }, { app }) {
    function navItems(response, type) {
      return response.data.body.filter((body) => body.primary.type === type)
    }

    const response = await DocumentFetcher(app.i18n).getNavigation()
    state.organizationNavItems = navItems(response, 'organizations-nav')

    state.mainNavItems = navItems(response, 'main-nav')
    state.topItems = navItems(response, 'burger-menu-top')
    state.bottomItems = navItems(response, 'burger-menu-bottom')
    state.resourcesNavItems = navItems(response, 'ressources-nav')
    state.aboutNavItems = navItems(response, 'about-nav')
  }
}
