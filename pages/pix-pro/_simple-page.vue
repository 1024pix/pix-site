<template>
  <div class="page">
    <header class="page-header">
      <div class="container md padding-container">
        <h1 class="page-header__title">
          <prismic-rich-text :field="newsItem.data.title" />
        </h1>
      </div>
    </header>

    <div class="page-body">
      <section class="page-section">
        <div class="container md padding-container">
          <div class="page-section__description">
            <prismic-rich-text :field="newsItem.data.body" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { documentFetcher } from '~/services/document-fetcher'
export default {
  name: 'SimplePage',
  nuxtI18n: {
    paths: {
      fr: '/:uid',
      'fr-fr': '/:uid',
      'en-gb': '/:uid',
    },
  },
  async asyncData({ params, app, req, error, route }) {
    const host = req ? req.headers.host : window.location.host
    const currentPagePath = `${host}${route.path}`
    try {
      const document = await documentFetcher(
        app.$prismic,
        app.i18n,
        req
      ).getPageByUid(params.uid)
      return { currentPagePath, newsItem: document, documentId: document.id }
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
      meta,
    }
  },
}
</script>

<style lang="scss"></style>
