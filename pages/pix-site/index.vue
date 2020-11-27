<template>
  <div class="index">
    <slice-zone :slices="slices" />
  </div>
</template>

<script>
import SliceZone from '@/components/SliceZone'
import { documentFetcher } from '~/services/document-fetcher'

export default {
  name: 'Index',
  nuxtI18n: {
    paths: {
      fr: '/',
      'fr-fr': '/',
      'en-gb': '/',
    },
  },
  components: {
    SliceZone,
  },
  async asyncData({ params, app, req, error, currentPagePath }) {
    try {
      const document = await documentFetcher(
        app.$prismic,
        app.i18n,
        req
      ).getPageByUid('index-pix-site')

      const meta = document.data.meta

      const latestNewsItems = await documentFetcher(
        app.$prismic,
        app.i18n,
        req
      ).findNewsItems({ page: 1, pageSize: 3 })
      return { currentPagePath, meta, document, latestNewsItems }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  computed: {
    slices() {
      const rawDocumentSlices = this.document.data.body
      return rawDocumentSlices.map((slice, index) => {
        if (slice.slice_type === 'latest_news') {
          slice.primary.latest_news_items = this.latestNewsItems
        }
        return slice
      })
    },
    type() {
      return this.document.type
    },
    title() {
      return this.document.data.title[0].text
    },
  },
  head() {
    const meta = this.$getMeta(this.meta, this.currentPagePath, this.$prismic)

    return {
      meta,
      title: `${this.title} | Pix`,
    }
  },
}
</script>

<style lang="scss"></style>
