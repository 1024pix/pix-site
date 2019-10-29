<template>
  <section :class="sectionClass">
    <div :class="backgroundClass"></div>
    <div :class="contentClass">
      <prismic-rich-text :field="title" />
      <prismic-rich-text :field="description" />
      <pix-link v-if="hasButton" :class="buttonClass" :field="buttonLink">
        {{ $prismic.richTextAsPlain(buttonText) }}
      </pix-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroBanner',
  props: {
    content: {
      type: Object,
      default: null
    },
    sectionClass: {
      type: String,
      default: ''
    },
    backgroundClass: {
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
    description() {
      return this.content.primary.description
    },
    buttonLink() {
      return this.content.primary.button_link
    },
    buttonText() {
      return this.content.primary.button_title
    },
    hasButton() {
      return this.buttonText && this.buttonText.length
    }
  }
}
</script>

<style scoped></style>
