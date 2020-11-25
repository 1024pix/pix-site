<template>
  <div class="index">
    <slice-zone :slices="slices" />
  </div>
</template>

<script>
import SliceZone from '@/components/SliceZone'
import { documents, documentFetcher } from '~/services/document-fetcher'

export default {
  components: {
    SliceZone,
  },
  async asyncData({ app, error, req, currentPagePath }) {
    try {
      const document = await documentFetcher(app.$prismic, app.i18n, req).get(
        documents.index
      )

      const latestNewsItems = await documentFetcher(
        app.$prismic,
        app.i18n,
        req
      ).findNewsItems({ page: 1, pageSize: 3 })

      return {
        currentPagePath,
        meta: document.data.meta,
        document: document.data.body,
        latestNewsItems,
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error({ e })
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    const meta = this.$getMeta(this.meta, this.currentPagePath, this.$prismic)
    const pageTitle = this.$t('page-titles.index')
    return {
      title: pageTitle,
      meta,
    }
  },
  computed: {
    slices() {
      return this.document.map((slice, index) => {
        if (slice.slice_type === 'latest_news') {
          slice.primary.latest_news_items = this.latestNewsItems
        }
        return slice
      })
    },
  },
}
</script>

<style lang="scss"></style>
