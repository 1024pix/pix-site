<template>
  <div id="app" class="index">
    <div class="nav">
      <header>
        <client-only>
          <push-menu :width="'230'">
            <burger-menu-nav
              :top-items="topItems"
              :bottom-items="bottomItems"
            />
          </push-menu>
        </client-only>
        <div id="page-wrap">
          <organization-nav :organization-nav-items="organizationNavItems" />
          <div class="nav-principal desktop">
            <div class="container padding-container">
              <nuxt-link to="/">
                <img
                  alt="Accueil du site pix.fr"
                  class="logo"
                  src="/images/pix-logo.svg"
                />
              </nuxt-link>
              <img alt="Logo de la Marianne" src="/images/marianne-logo.svg" />
              <div class="desktop">
                <main-nav :main-nav-items="mainNavItems" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
import MainNav from '~/components/main-nav'
import BurgerMenuNav from '~/components/burger-menu-nav'
import DocumentFetcher from '~/services/document-fetcher'
import OrganizationNav from '~/components/organization-nav'

export default {
  components: {
    MainNav,
    BurgerMenuNav,
    OrganizationNav
  },
  async asyncData({ app, error }) {
    function navItems(response, type) {
      return response.data.body.filter((body) => body.primary.type === type)
    }

    try {
      const response = await DocumentFetcher(app.i18n).getNavigation()
      const organizationNavItems = navItems(response, 'organizations-nav')
      const mainNavItems = navItems(response, 'main-nav')
      const topItems = navItems(response, 'burger-menu-top')
      const bottomItems = navItems(response, 'burger-menu-bottom')

      return {
        organizationNavItems,
        mainNavItems,
        topItems,
        bottomItems
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style lang="scss">
.container {
  width: 1024px;
  margin: 0 auto;
}
</style>
