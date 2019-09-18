<template>
  <div class="index">
    <header>
      <organization-nav :organization-nav-items="organizationNavItems" />
    </header>
    <div></div>
  </div>
</template>

<script>
import OrganizationNav from '~/components/organization-nav'
import DocumentFetcher from '~/services/document-fetcher'

export default {
  components: {
    OrganizationNav
  },
  async asyncData({ app, error }) {
    try {
      const response = await DocumentFetcher(app.i18n).getNavigation()
      const organizationNavItems = response.data.body.filter(
        (body) => body.primary.type === 'organizations-nav'
      )
      return {
        organizationNavItems
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
