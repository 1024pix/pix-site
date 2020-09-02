<template>
  <section class="key-numbers">
    <h2 class="key-numbers__title">
      {{ $prismic.asText(title) }}
    </h2>
    <div class="key-numbers__list">
      <div
        v-for="(item, index) in items"
        :key="`item-${index}`"
        class="key-number__item key-number"
      >
        <h3 class="key-number__value">
          {{ $prismic.asText(item.number) }}
        </h3>
        <p class="key-number__description">
          {{ $prismic.asText(item.description) }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'KeyNumbers',
  props: {
    slice: {
      type: Object,
      required: true,
    },
    contentId: {
      type: String,
      required: true,
    },
  },
  computed: {
    title() {
      return this.slice.title
    },
    items() {
      return this.slice.column
    },
  },
}
</script>

<style lang="scss" scoped></style>
