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
            {{ $prismic.richTextAsPlain(buttonText) }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ImgTextColumnSlice',
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
    },
    hasImage() {
      return this.image && this.image.url
    },
    hasButton() {
      return this.buttonText && this.buttonText.length
    }
  }
}
</script>
