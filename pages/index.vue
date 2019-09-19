<template>
  <div class="index">
    <div class="nav">
      <header>
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
      </header>
    </div>
  </div>
</template>

<script>
import OrganizationNav from '~/components/organization-nav'
import MainNav from '~/components/main-nav'
import DocumentFetcher from '~/services/document-fetcher'

export default {
  components: {
    OrganizationNav,
    MainNav
  },
  async asyncData({ app, error }) {
    try {
      const response = await DocumentFetcher(app.i18n).getNavigation()
      const organizationNavItems = response.data.body.filter(
        (body) => body.primary.type === 'organizations-nav'
      )
      const mainNavItems = response.data.body.filter(
        (body) => body.primary.type === 'main-nav'
      )
      return {
        organizationNavItems,
        mainNavItems
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
