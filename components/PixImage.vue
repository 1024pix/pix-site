<template>
  <nuxt-img
    v-if="image.url"
    :src="image.url"
    :alt="image.alt"
    :role="image.role"
    :width="image.width"
    :height="image.height"
  />
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
