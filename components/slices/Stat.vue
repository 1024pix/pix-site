<template>
  <div class="stat">
    <prismic-rich-text :field="content.block_title" />
    <prismic-rich-text :field="content.block_presentation" />
  </div>
</template>

<script>
export default {
  name: 'StatSlice',
  props: {
    slice: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      rows: [],
    }
  },
  computed: {
    content() {
      return this.slice.primary
    },
  },
}
</script>

<style lang="scss">
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 1140px;
}
</style>
