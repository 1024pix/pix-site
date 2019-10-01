<template>
  <div class="page legal-notices">
    <header class="page-header">
      <div class="container md padding-container">
        <prismic-rich-text :field="document.title" class="page-header__title" />
      </div>
    </header>

    <main class="page-body">
      <section class="section-editor container md padding-container">
        <prismic-rich-text :field="document.body[0].primary.text" />
      </section>

      <section-slice
        :content="document.body[1]"
        :section-class="'section-members-gip container md padding-container'"
        :container-class="'legal-notices-members unstyled'"
        :flex-container-class="'legal-notices-members'"
        :flex-content-class="'legal-notices-members__member'"
      >
      </section-slice>

      <section class="section-personnal-data container md padding-container">
        <prismic-rich-text :field="document.body[2].primary.text" />
      </section>
    </main>
  </div>
</template>

<script>
import DocumentFetcher from '~/services/document-fetcher'
import SectionSlice from '~/components/slices/section'
export default {
  name: 'LegalNotices',
  nuxtI18n: {
    paths: {
      'fr-fr': '/mentions-legales',
      'fr-be': '/mentions-legales',
      'en-gb': '/en-gb/legal-notices'
    }
  },
  components: { SectionSlice },
  async asyncData({ app, error, currentPagePath }) {
    try {
      const document = await DocumentFetcher(app.i18n).getLegalNotices()
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
.legal-notices {
  h2 {
    font-family: 'Open Sans', Arial, sans-serif;
    font-size: 36px;
    line-height: 49px;
    margin-bottom: 18px;
    margin-top: 60px;
    font-weight: 400;
    color: $grey-1;
  }
}
.legal-notices-members {
  display: flex;
  width: 860px;
  flex-wrap: wrap;

  &__member {
    width: 25%;

    &:nth-child(1) {
      width: 100%;
    }
    p {
      &.block-img {
        max-height: 100px;
        text-align: center;
      }
    }
  }
}
</style>
