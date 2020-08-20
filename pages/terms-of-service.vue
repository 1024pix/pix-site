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
      fr: '/conditions-generales-d-utilisation',
      'fr-fr': '/conditions-generales-d-utilisation',
      'en-gb': '/terms-of-service',
    },
  },
  async asyncData({ app, error, req, currentPagePath }) {
    try {
      const document = await documentFetcher(app.i18n, req).get(
        documents.termsOfService
      )
      if (process.client) window.prismic.setupEditButton()
      return {
        currentPagePath,
        meta: document.data.meta,
        document: document.data,
        documentId: document.id,
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error({ e })
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    const meta = this.$getMeta(this.meta, this.currentPagePath, this.$prismic)
    const pageTitle = this.$t('page-titles.terms-of-service')
    return {
      title: pageTitle,
      meta,
    }
  },
}
</script>

<style lang="scss"></style>
