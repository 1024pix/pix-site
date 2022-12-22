<template>
  <section :id="sectionId" :class="sectionClass">
    <div class="background"></div>
    <div :class="containerClass">
      <template v-if="hasImage">
        <pix-image :field="image" />
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
      <pix-link v-if="hasButton" :field="buttonLink" :class="buttonClass">
        {{ $prismic.asText(buttonText) }}
      </pix-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SlicesPageSection',
  props: {
    slice: {
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
      return this.slice?.items
    },
    title() {
      return this.slice?.primary?.title
    },
    image() {
      return this.slice?.primary?.logo
    },
    description() {
      return this.slice?.primary?.description
    },
    buttonLink() {
      return this.slice?.primary?.button_link
    },
    buttonText() {
      return this.slice?.primary?.button_title
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
  font-family: $font-open-sans;
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
      color: $grey-90;
      font-size: 2rem;
      font-family: $font-open-sans;
      font-weight: normal;
      letter-spacing: 0.00875rem;
      line-height: 2.875rem;
      text-align: left;
    }

    p {
      color: $grey-45;
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
