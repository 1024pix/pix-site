<template>
  <section class="features">
    <prismic-rich-text class="features__title" :field="title" />
    <div class="features__container"></div>
  </section>
</template>

<script>
export default {
  name: 'FeaturesSlice',
  props: {
    content: {
      type: Object,
      default: null,
    },
    sectionId: {
      type: String,
      default: null,
    },
    sectionClass: {
      type: String,
      default: 'section',
    },
    containerClass: {
      type: String,
      default: 'section__container',
    },
    flexContainerClass: {
      type: String,
      default: 'section__flex-container',
    },
    flexContentClass: {
      type: String,
      default: 'section__flex-content',
    },
    buttonClass: {
      type: String,
      default: 'section__button',
    },
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
    },
  },
}
</script>

<style lang="scss">
.features {
  margin: 0 auto;
  background-color: white;

  &__title h2 {
    font-size: 2.125rem;
    font-weight: normal;
    height: 49px;
    letter-spacing: 0.15px;
    line-height: 49px;
    text-align: center;
    margin-top: 64px;
  }
}

@include device-is('tablet') {
  .features__title h2 {
    margin-top: 80px;
  }
}

@include device-is('desktop') {
  .features__title h2 {
    margin-top: 80px;
  }
}

@include device-is('large-screen') {
  .features__title h2 {
    margin-top: 120px;
  }
}
</style>
