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
            <prismic-rich-text :field="content.body" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const localeRoute = useLocaleRoute();

const props = defineProps({
  content: {
    type: Object,
    default: null,
  },
});

props.content.body.forEach((bodyItem) => {
  if (
    bodyItem.spans?.length &&
    bodyItem.spans.find((i) => i.type === "hyperlink")
  ) {
    bodyItem.spans.forEach((span) => {
      if (span.type === "hyperlink" && span.data.link_type === "Document") {
        const localeUrl = localeRoute(`/${span.data.uid}`, span.data.lang);
        span.data.url = localeUrl.fullPath;
      }
    });
  }
});
</script>

<style lang="scss">
.page-section__description {
  p.block-img {
    display: inline;
    margin: 0 10px;
  }
}
</style>
