<template>
  <section :class="sectionClass">
    <div :class="containerClass">
      <div v-if="hasImage" class="column">
        <prismic-image :field="image" />
      </div>
      <div class="column">
        <prismic-rich-text :field="title" />
        <prismic-rich-text :field="description" />
        <div v-for="(item, index) in paragraphs" :key="`item-${index}`">
          <prismic-rich-text :field="item.paragraph" />
        </div>
        <div>
          <a v-if="hasButton" :href="buttonLink" :class="buttonClass">
            {{ $prismic.asText(buttonText) }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ImgTextColumn',
  props: {
    slice: {
      type: Object,
      default: null,
    },
    sectionClass: {
      type: String,
      default: '',
    },
    containerClass: {
      type: String,
      default: '',
    },
    buttonClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    paragraphs() {
      return this.slice.items
    },
    title() {
      return this.slice.primary.title
    },
    image() {
      return this.slice.primary.logo
    },
    description() {
      return this.slice.primary.description
    },
    buttonLink() {
      return this.slice.primary.button_link.url
    },
    buttonText() {
      return this.slice.primary.button_title
    },
    hasImage() {
      return this.image && this.image.url
    },
    hasButton() {
      return this.buttonText && this.buttonText.length
    },
  },
}
</script>
