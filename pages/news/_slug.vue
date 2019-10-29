<template>
  <div class="page news-show">
    <div class="page-banner-layout">
      <div class="page-banner"></div>
      <div class="container padding-container page-banner-content">
        <news-item-post :news-item="newsItem" />
      </div>
    </div>
    <prismic-edit-button :document-id="documentId" />
  </div>
</template>

<script>
import { documentFetcher } from '~/services/document-fetcher'
import NewsItemPost from '~/components/news-item-post'

export default {
  nuxtI18n: {
    paths: {
      'fr-fr': '/actualites/:slug',
      'fr-be': '/actualites/:slug',
      'en-gb': '/news/:slug'
    }
  },
  components: {
    NewsItemPost
  },
  async asyncData({ params, app, req, error, route }) {
    const host = req ? req.headers.host : window.location.host
    const currentPagePath = `${host}${route.path}`
    try {
      const newsItem = await documentFetcher(app.i18n, req).getNewsItemByUid(
        params.slug
      )
      return { currentPagePath, newsItem, documentId: newsItem.id }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    const meta = this.$getMeta(
      this.newsItem.data.meta,
      this.currentPagePath,
      this.$prismic
    )
    return {
      meta
    }
  }
}
</script>

<style></style>
