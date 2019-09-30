<template>
  <div class="page terms-of-service">
    <header class="page-header">
      <div class="container md padding-container">
        <h1 class="page-header__title">
          <prismic-rich-text :field="document.title" />
        </h1>
      </div>
    </header>

    <div class="page-body">
      <section class="page-section section-schools">
        <div class="container md padding-container">
          <div class="page-section__description">
            <prismic-rich-text :field="document.body" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import DocumentFetcher from '~/services/document-fetcher'

export default {
  name: 'TermsOfService',
  nuxtI18n: {
    paths: {
      'fr-fr': '/conditions-generales-d-utilisation',
      'fr-be': '/conditions-generales-d-utilisation',
      'en-gb': '/terms-of-service'
    }
  },
  async asyncData({ app, error, req, route }) {
    const host = req ? req.headers.host : window.location.host
    const currentPagePath = `${host}${route.path}`
    try {
      const document = await DocumentFetcher(app.i18n).getTermsOfService()
      return {
        currentPagePath,
        meta: document.data.meta,
        document: document.data
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    const meta = this.$getMeta(this.meta, this.currentPagePath, this.$prismic)
    return {
      meta
    }
  }
}
</script>

<style lang="scss">
.page-section__description {
  h2 {
    font-weight: 400;
  }

  ul {
    list-style: none;
  }
}
</style>
