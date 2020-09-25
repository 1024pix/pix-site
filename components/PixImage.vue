<template>
  <prismic-image :field="image" :role="image.role" />
</template>

<script>
export default {
  name: 'PixImage',
  props: {
    field: {
      required: true,
      type: Object,
      default: null,
    },
  },
  computed: {
    image() {
      const image = Object.assign({}, this.field)
      if (!image.alt) {
        image.alt = ''
        image.role = 'presentation'
      }
      return image
    },
  },
}
</script>
