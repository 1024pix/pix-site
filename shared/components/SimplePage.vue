<template>
  <div class="page">
    <header class="page-header">
      <div class="container md padding-container">
        <prismic-rich-text :field="content.title" class="page-header__title" />
      </div>
    </header>

    <div class="page-body">
      <section class="page-section">
        <div class="container md padding-container">
          <div class="page-section__description">
            <prismic-rich-text :field="content.body" :serializer="customPrismicRichTextSerializer" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
defineProps({
  content: {
    type: Object,
    default: null,
  },
});

const { customPrismicRichTextSerializer } = usePrismicRichTextSerializer();
</script>

<style lang="scss">
.page-section__description {
  p.block-img {
    display: inline;
    margin: 0 10px;
  }
}
</style>
