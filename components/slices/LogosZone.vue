<template>
  <div class="logos-zone">
    <div
      v-for="(logo, index) in this.slice.primary.items"
      :key="`logo-${index}`"
      class="logos-zone__content"
    >
      <prismic-image :field="logo.image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogosZone',
  props: {
    slice: {
      type: Object,
      default: null,
    },
  },
  computed: {},
}
</script>

<style></style>
