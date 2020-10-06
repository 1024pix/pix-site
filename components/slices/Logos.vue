<template>
  <section class="logos">
    <prismic-rich-text
      v-if="hasTitle && shouldDisplayTitle"
      class="logos__title"
      :field="title"
    />
    <prismic-rich-text v-else class="sr-only" :field="title" />
    <div class="wrapper">
      <div
        v-for="(item, itemIndex) in items"
        :key="`item-${itemIndex}`"
        class="wrapper__item"
      >
        <pix-image :field="item.logos_image" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LogosSlice',
  props: {
    slice: {
      type: Object,
      default: null,
    },
  },
  computed: {
    items() {
      return this.slice.items
    },
    shouldDisplayTitle() {
      return this.slice.primary.logos_should_display_title
    },
    hasTitle() {
      return (
        this.slice.primary.logos_title.length &&
        this.slice.primary.logos_title[0].text.length
      )
    },
    title() {
      return this.slice.primary.logos_title
    },
  },
}
</script>

<style lang="scss">
.logos {
  &__title h2 {
    font-family: $font-open-sans;
    font-size: 2rem;
    font-weight: $font-normal;
    height: 49px;
    letter-spacing: 0.009rem;
    line-height: 49px;
    text-align: center;
    margin-top: 24px;
  }
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 64px 98px;

  &__item img {
    max-height: 66px;
    margin: 0 30px 24px;
  }
}
</style>
