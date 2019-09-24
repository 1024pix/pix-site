<template>
  <div class="page news-show">
    <div class="page-banner-layout">
      <div class="page-banner"></div>
      <div class="container padding-container page-banner-content">
      </div>
    </div>
  </div>
</template>

<script>
import DocumentFetcher from '~/services/document-fetcher'

export default {
  nuxtI18n: {
    paths: {
      'fr-fr': '/actualites/:slug',
      'en-gb': '/news/:slug'
    }
  },
  async asyncData({ params, app, error }) {
    try {
      const newsItem = await DocumentFetcher(app.i18n).getNewsItemByUid(
        params.slug
      )
      return { newsItem }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style></style>
