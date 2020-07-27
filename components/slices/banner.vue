<template>
  <section>
    <prismic-rich-text :field="title" />
    <prismic-rich-text :field="textContent" />
    <ul>
      <li v-for="(link, index) in links" :key="`item-${index}`">
        <pix-link :field="link.bannerlinkurl">
          {{ link.bannerlinktext }}
        </pix-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
  computed: {
    title() {
      return this.content.primary.bannertitle
    },
    textContent() {
      return this.content.primary.bannercontent
    },
    links() {
      return this.content.items
    },
    imageUrl() {
      return this.content.primary.bannerimage
    },
    backgroundImageUrl() {
      return this.content.primary.bannerimagebackground
    },
  },
}
</script>

<style scoped></style>
