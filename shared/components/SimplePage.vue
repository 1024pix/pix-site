<template>
  <div class="page">
    <header class="page-header">
      <div class="container md padding-container">
        <pix-rich-text :field="content.title" class="page-header__title" />
      </div>
    </header>

    <div class="page-body">
      <section class="page-section">
        <div class="container md padding-container">
          <div class="page-section__description">
            <pix-rich-text :field="content.body" localized-links />
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
</script>

<style lang="scss">
.page-section__description {
  p.block-img {
    display: inline;
    margin: 0 10px;
  }
}
</style>
