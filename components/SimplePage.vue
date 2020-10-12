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

<script>
export default {
  name: 'SimplePage',
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss"></style>
