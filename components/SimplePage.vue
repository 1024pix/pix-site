<template>
  <div class="page">
    <header class="page-header">
      <div class="container md padding-container">
        <h1 class="page-header__title">
          <prismic-rich-text :field="content.title" />
        </h1>
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
