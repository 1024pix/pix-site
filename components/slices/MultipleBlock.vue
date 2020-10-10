<template>
  <section class="block" :style="[background]">
    <prismic-rich-text
      v-if="hasTitle && shouldDisplayTitle"
      class="block__title"
      :field="title"
    />
    <prismic-rich-text v-else class="sr-only" :field="title" />
    <prismic-rich-text
      v-if="shouldUseSubtitle && hasSubtitle"
      class="block__subtitle"
      :field="subtitle"
    />
    <div class="block__wrapper">
      <div
        v-for="(itemsByRow, rowIndex) in rows"
        :key="`row-${rowIndex}`"
        class="block-wrapper__row"
      >
        <div
          v-for="(item, itemIndex) in itemsByRow"
          :key="`item-${itemIndex}`"
          class="block-wrapper__item"
        >
          <pix-image v-if="hasImage(item)" :field="item.item_image" />
          <div>
            <prismic-rich-text
              class="block-wrapper-item__title"
              :field="item.item_title"
            />
            <prismic-rich-text
              class="block-wrapper-item__description"
              :field="item.item_description"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  EXTRA_LARGE_SCREEN_MIN_WIDTH,
  DESKTOP_MIN_WIDTH,
} from '~/config/breakpoints'

export default {
  name: 'MultipleBlock',
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
    background() {
      return {
        backgroundColor: `${this.slice.primary.block_background_color}`,
      }
    },
    items() {
      return this.slice.items
    },
    shouldDisplayTitle() {
      return this.slice.primary.block_should_display_title
    },
    shouldUseSubtitle() {
      return this.slice.primary.block_should_use_subtitle
    },
    hasTitle() {
      return (
        this.slice.primary.block_title &&
        this.slice.primary.block_title.length &&
        this.slice.primary.block_title[0].text &&
        this.slice.primary.block_title[0].text.length
      )
    },
    hasSubtitle() {
      return (
        this.slice.primary.block_subtitle &&
        this.slice.primary.block_subtitle.length &&
        this.slice.primary.block_subtitle[0].text &&
        this.slice.primary.block_subtitle[0].text.length
      )
    },
    title() {
      return this.slice.primary.block_title
    },
    subtitle() {
      return this.slice.primary.block_subtitle
    },
  },
  mounted() {
    this.rows = this.splitItemsIntoRows()
  },
  methods: {
    hasImage(item) {
      const isLengthDifferentThanZero = Object.keys(item.item_image).length
      const isObjectConstructor = item.item_image.constructor === Object
      return isLengthDifferentThanZero && isObjectConstructor
    },
    findNbItemsInRow() {
      if (process.client) {
        const isLargeScreen = document.body.clientWidth >= DESKTOP_MIN_WIDTH
        const isExtraLargeScreen =
          document.body.clientWidth >= EXTRA_LARGE_SCREEN_MIN_WIDTH

        if (this.items.length === 3 && isLargeScreen) {
          return 3
        }
        if (this.items.length === 4) {
          if (isExtraLargeScreen) {
            return 4
          }
          if (isLargeScreen) {
            return 3
          }
        }
        return 2
      }
    },
    splitItemsIntoRows() {
      const rows = []
      const chunkSize = this.findNbItemsInRow()
      for (let i = 0; i < this.items.length; i += chunkSize) {
        rows.push(this.items.slice(i, i + chunkSize))
      }
      return rows
    },
  },
}
</script>
