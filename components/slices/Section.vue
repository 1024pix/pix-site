<template>
  <section :id="sectionId" :class="sectionClass">
    <div class="background"></div>
    <div :class="containerClass">
      <template v-if="hasImage">
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
      <a v-if="hasButton" :href="buttonLink" :class="buttonClass">
        {{ $prismic.asText(buttonText) }}
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
.section {
  font-family: $open-sans, Arial, sans-serif;
  text-align: center;
  margin: 0 auto;
  padding: 32px 0;
  @include device-is('large-mobile') {
    padding: 64px 0;
  }

  &__container {
    max-width: 1140px;
    margin: 0 auto;
  }

  &__flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    @include device-is('large-mobile') {
      flex-direction: row;
    }
  }

  &__flex-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 80%;

    @include device-is('large-mobile') {
      max-width: 45%;
    }

    h2 {
      color: $blue-5;
      font-size: 2rem;
      font-family: $open-sans;
      font-weight: normal;
      letter-spacing: 0.00875rem;
      line-height: 2.875rem;
      text-align: left;
    }

    p {
      color: $grey-10;
      font-size: 1.25rem;
      line-height: 2rem;
      text-align: justify;

      &.block-img img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        max-width: 100%;
      }
    }
  }
}
</style>
