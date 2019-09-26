<template>
  <section :class="sectionClass">
    <div class="background"></div>
    <div :class="containerClass">
      <template v-if="image === null">
        <prismic-image :field="image" />
      </template>
      <prismic-rich-text :field="title" />
      <prismic-rich-text :field="description" />
      <div :class="flexContainerClass">
        <div
          v-for="(item, index) in paragraphs"
          :key="`item-${index}`"
          :class="flexContentClass"
        >
          <prismic-rich-text :field="item.paragraph" />
        </div>
      </div>
      <a v-if="buttonText === null" :href="buttonLink" :class="buttonClass">
        {{ $prismic.richTextAsPlain(buttonText) }}
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionSlice',
  props: {
    content: {
      type: Object,
      default: null
    },
    sectionClass: {
      type: String,
      default: ''
    },
    containerClass: {
      type: String,
      default: ''
    },
    flexContainerClass: {
      type: String,
      default: ''
    },
    flexContentClass: {
      type: String,
      default: ''
    },
    buttonClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    paragraphs() {
      return this.content.items
    },
    title() {
      return this.content.primary.title
    },
    image() {
      return this.content.primary.logo
    },
    description() {
      return this.content.primary.description
    },
    buttonLink() {
      return this.content.primary.button_link.url
    },
    buttonText() {
      return this.content.primary.button_title
    }
  }
}
</script>

<style></style>
