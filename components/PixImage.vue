<template>
  <nuxt-img
    v-if="image.url"
    :src="image.url"
    :alt="image.alt"
    :role="image.role"
    :width="computeWidth(image)"
    :height="computeHeight(image)"
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
    hasFixedDimensions: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: Number,
      default: undefined,
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
  methods: {
    computeHeight(image) {
      if (!this.hasFixedDimensions) {
        return
      }
      const imageHeight = image.dimensions.height

      return this.isImageHeightTooBig(imageHeight)
        ? this.maxHeight
        : imageHeight
    },
    computeWidth(image) {
      if (!this.hasFixedDimensions) {
        return
      }
      const imageWidth = image.dimensions.width
      const imageHeight = image.dimensions.height
      const imageWidthIfHeightTooBig =
        imageWidth * (this.maxHeight / imageHeight)

      return this.isImageHeightTooBig(imageHeight)
        ? Math.round(imageWidthIfHeightTooBig)
        : imageWidth
    },
    isImageHeightTooBig(imageHeight) {
      return this.maxHeight && imageHeight > this.maxHeight
    },
  },
}
</script>
