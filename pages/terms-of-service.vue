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
    <prismic-edit-button :document-id="documentId" />
  </div>
</template>

<script>
import { documents, documentFetcher } from '~/services/document-fetcher'

export default {
  name: 'TermsOfService',
  nuxtI18n: {
    paths: {
      'fr-fr': '/conditions-generales-d-utilisation',
      'fr-be': '/conditions-generales-d-utilisation',
      'en-gb': '/terms-of-service'
    }
  },
  async asyncData({ app, error, currentPagePath }) {
    try {
      const document = await documentFetcher(app.i18n).get(
        documents.termsOfService
      )
      if (process.client) window.prismic.setupEditButton()
      return {
        currentPagePath,
        meta: document.data.meta,
        document: document.data,
        documentId: document.id
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
