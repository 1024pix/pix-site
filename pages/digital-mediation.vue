<template>
  <div class="page digital-mediation">
    <section class="hero">
      <div class="background"></div>
      <div class="container padding-container">
        <prismic-rich-text :field="document[0].primary.title" />
        <pix-link class="btn" :field="document[0].items[0].link_button">
          {{ $prismic.richTextAsPlain(document[0].items[0].title_button) }}
        </pix-link>
      </div>
    </section>

    <section-slice
      :content="document[1]"
      :section-class="'partnerships'"
      :container-class="'container'"
      :flex-container-class="'partners'"
      :flex-content-class="'partner'"
    ></section-slice>

    <section-slice
      :content="document[2]"
      :section-class="'diagnostic'"
      :container-class="'container'"
      :flex-container-class="'features'"
      :flex-content-class="'feature'"
    >
    </section-slice>

    <section-column-slice
      :content="document[3]"
      :section-class="'certification'"
      :ul-class="'features'"
      :li-class="'feature'"
      :right-class="'certification-illustration'"
    >
    </section-column-slice>

    <section-slice
      :content="document[4]"
      :section-class="'prescription'"
      :container-class="'container'"
      :flex-container-class="'features'"
      :flex-content-class="'feature'"
    >
    </section-slice>

    <section class="abc-pix">
      <div class="container padding-container">
        <div class="trapeze">
          <prismic-rich-text :field="document[5].primary.title" />
          <prismic-rich-text :field="document[5].primary.description" />

          <div class="container flex">
            <div
              v-for="(item, index) in document[5].items"
              :key="`item-${index}`"
              class="container-column"
            >
              <prismic-rich-text :field="item.column" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import DocumentFetcher from '~/services/document-fetcher'
import SectionSlice from '~/components/slices/section'
import SectionColumnSlice from '~/components/slices/section-column'

export default {
  nuxtI18n: {
    paths: {
      'fr-fr': '/mediation-numerique',
      'fr-be': '/mediation-numerique',
      'en-gb': '/digital-mediation'
    }
  },
  components: {
    SectionSlice,
    SectionColumnSlice
  },
  async asyncData({ app, error, currentPagePath }) {
    try {
      const document = await DocumentFetcher(app.i18n).getMediation()
      return {
        currentPagePath,
        document: document.data.body,
        meta: document.data.meta
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

<style scoped></style>
