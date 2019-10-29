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
    <prismic-edit-button :document-id="contentId" />
  </section>
</template>

<script>
export default {
  name: 'KeyNumbers',
  props: {
    content: {
      type: Object,
      required: true
    },
    contentId: {
      type: String,
      required: true
    }
  },
  computed: {
    title() {
      return this.content.title
    },
    items() {
      return this.content.column
    }
  },
  beforeMount() {
    window.prismic.setupEditButton()
  }
}
</script>

<style lang="scss" scoped></style>
