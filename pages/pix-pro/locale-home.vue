<template>
  <div>
    <div v-if="type === FORM_PAGE">
      <form-page :content="document.data" />
    </div>
    <div v-if="type === SIMPLE_PAGE">
      <simple-page :content="document.data" />
    </div>
    <div v-if="type === SLICES_PAGE">
      <prismic-custom-slice-zone :slices="document.data.body" />
    </div>
  </div>
</template>

<script>
import { documentFetcher, DOCUMENTS } from '~/services/document-fetcher'

const EN_HOME_DOCUMENT_UID = 'discover-pix-pro'
const FR_HOME_DOCUMENT_UID = 'decouvrir-pix-pro'

const HOME_DOCUMENT_UID_BY_LOCALE = {
  en: EN_HOME_DOCUMENT_UID,
  fr: FR_HOME_DOCUMENT_UID,
  'fr-fr': FR_HOME_DOCUMENT_UID,
}

export default {
  name: 'LocaleHome',
  nuxtI18n: {
    paths: {
      en: '/',
      fr: '/',
      'fr-fr': '/',
    },
  },
  async asyncData({ app, req, error, currentPagePath }) {
    try {
      const locale = app.i18n.locale || app.i18n.defaultLocale
      const homeDocumentUid = HOME_DOCUMENT_UID_BY_LOCALE[locale]

      const document = await documentFetcher(
        app.$prismic,
        app.i18n,
        req
      ).getPageByUid(homeDocumentUid)
      const meta = document.data.meta

      return { currentPagePath, meta, document }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      FORM_PAGE: DOCUMENTS.FORM_PAGE,
      SIMPLE_PAGE: DOCUMENTS.SIMPLE_PAGE,
      SLICES_PAGE: DOCUMENTS.SLICES_PAGE,
    }
  },
  head() {
    const meta = this.$getMeta(this.meta, this.currentPagePath, this.$prismic)

    return {
      meta,
      title: `${this.title} | Pix Pro`,
    }
  },
  computed: {
    type() {
      return this.document.type
    },
    title() {
      return this.document.data.title[0].text
    },
  },
}
</script>
