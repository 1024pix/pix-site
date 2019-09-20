<template>
  <section class="hero">
    <div class="hero-background gradient-pro"></div>
    <div class="container padding-container">
      <prismic-rich-text :field="document[0].primary.title" />
      <a class="btn" :href="document[0].items[0].link_button">
        {{ $prismic.richTextAsPlain(document[0].items[0].title_button) }}
      </a>
    </div>
  </section>
</template>

<script>
  export default {
    name: "HeroBanner",
    props: {
      sectionClass: {
        type: String,
        default: ''
      },
      contentClass: {
        type: String,
        default: ''
      },
      buttonClass: {
        type: String,
        default: ''
      }
    },
    computed: {
      title() {
        return this.content.primary.title
      },
      linkButton() {
        return this.content.primary.link_button
      },

    }
  }
</script>

<style scoped>

</style>
