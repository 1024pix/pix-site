<template>
  <div class="index">
    <header>
      <organization-nav :organization-nav-items="organizationNavItems" />
    </header>
    <div></div>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'
import OrganizationNav from '~/components/organization-nav'

export default {
  components: {
    OrganizationNav
  },

  async asyncData({ context, error, req }) {
    try {
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })
      const response = await api.getSingle('navigation')
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
