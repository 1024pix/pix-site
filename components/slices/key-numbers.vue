<template>
  <div class="key-numbers">
    <h2 class="key-numbers__title">
      {{ $prismic.richTextAsPlain(title) }}
    </h2>
    <div class="key-numbers__list container padding-container">
      <!--      <div-->
      <!--        class="key-number__item key-number"-->
      <!--        v-for="(item, index) in items"-->
      <!--        :key="`item-${index}`"-->
      <!--      >-->
      <!--        <h3 class="key-number__value">-->
      <!--          {{ $prismic.richTextAsPlain(item.number) }}-->
      <!--        </h3>-->
      <!--        <p class="key-number__description">-->
      <!--          {{ $prismic.richTextAsPlain(item.description) }}-->
      <!--        </p>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'key-numbers',
  props: {
    content: {
      type: Object,
      default: null
    }
  },
  computed: {
    title() {
      return this.content.data.title
    }
  }
}
</script>

<style scoped></style>
