<template>
  <div class="page news-show">
    <div class="page-banner-layout">
      <div class="page-banner"></div>
      <div class="container padding-container page-banner-content">
        <news-item-post v-if="newsItem" :news-item="newsItem" />
      </div>
    </div>
  </div>
</template>

<script>
import { documentFetcher } from '~/services/document-fetcher'

export default {
  nuxtI18n: {
    paths: {
      en: '/news/:slug',
      fr: '/actualites/:slug',
      'fr-fr': '/actualites/:slug',
      'fr-be': '/actualites/:slug',
    },
  },
  async asyncData({ params, app, req, error, route, currentPagePath }) {
    try {
      const newsItem = await documentFetcher(
        app.$prismic,
        app.i18n,
        req
      ).getNewsItemByUid(params.slug)
      return { currentPagePath, newsItem }
    } catch (e) {
      console.error({ e })
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
      meta,
      title: `${this.newsItem.data.title[0].text} | Pix`,
    }
  },
}
</script>
