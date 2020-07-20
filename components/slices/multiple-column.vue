<template>
  <div class="multiple-column">
    <div
      v-for="(column, index) in slice.items"
      :key="`column-${index}`"
      :class="{ column, vertical_align_center: verticalAlignCenter }"
    >
      <prismic-rich-text :field="column.column_content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultipleColumn',
  props: {
    slice: {
      type: Object,
      default: null,
    },
  },
  computed: {
    verticalAlignCenter() {
      return this.slice && this.slice.primary.vertical_align_center === 'true'
    },
  },
}
</script>

<style scoped></style>
