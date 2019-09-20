<template>
  <section class="key-numbers">
    <h2 class="key-numbers__title">
      {{ $prismic.richTextAsPlain(title) }}
    </h2>
    <div class="key-numbers__list">
      <div
        v-for="(item, index) in items"
        :key="`item-${index}`"
        class="key-number__item key-number"
      >
        <h3 class="key-number__value">
          {{ $prismic.richTextAsPlain(item.number) }}
        </h3>
        <p class="key-number__description">
          {{ $prismic.richTextAsPlain(item.description) }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'KeyNumbers',
  props: {
    content: {
      type: Object,
      default: null
    }
  },
  computed: {
    title() {
      return this.content.title
    },
    items() {
      return this.content.column
    }
  }
}
</script>

<style lang="scss" scoped></style>
