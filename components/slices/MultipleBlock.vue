<template>
  <section
    :id="`slice-${indexForId}`"
    :class="blockClass"
    :style="[background]"
  >
    <prismic-rich-text
      v-if="hasTitle && shouldDisplayTitle"
      :class="`${blockClass}__title`"
      :field="title"
    />
    <prismic-rich-text v-else class="sr-only" :field="title" />
    <prismic-rich-text
      v-if="shouldUseSubtitle && hasSubtitle"
      :class="`${blockClass}__subtitle`"
      :field="subtitle"
    />
    <div :class="`${blockClass}__wrapper`">
      <div
        v-for="(itemsByRow, rowIndex) in rows"
        :key="`row-${rowIndex}`"
        :class="`${blockClass}-wrapper__row`"
      >
        <div
          v-for="(item, itemIndex) in itemsByRow"
          :key="`item-${itemIndex}`"
          :class="`${blockClass}-wrapper-row__item`"
        >
          <pix-image v-if="hasImage(item)" :field="item.item_image" />
          <div>
            <prismic-rich-text
              :class="`${blockClass}-wrapper-row-item__title`"
              :field="item.item_title"
            />
            <prismic-rich-text
              :class="`${blockClass}-wrapper-row-item__description`"
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
    indexForId: {
      type: Number,
      default: 0,
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
    blockClass() {
      return this.slice.primary.block_style
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
    numberItemsPerRowForScreenWidth() {
      if (process.client) {
        const isLargeScreen = document.body.clientWidth >= DESKTOP_MIN_WIDTH
        const isExtraLargeScreen =
          document.body.clientWidth >= EXTRA_LARGE_SCREEN_MIN_WIDTH

        if (this.items.length === 4 && isExtraLargeScreen) {
          return 4
        }

        if (isLargeScreen) {
          return 3
        }

        return 2
      }
    },
    splitItemsIntoRows() {
      const rows = []
      const numberOfItemsPerRow = this.numberItemsPerRowForScreenWidth()
      for (
        let item = 0;
        item < this.items.length;
        item += numberOfItemsPerRow
      ) {
        const screenSizedItems = this.items.slice(
          item,
          item + numberOfItemsPerRow
        )
        rows.push(screenSizedItems)
      }
      return rows
    },
  },
}
</script>

<style lang="scss">
@import '../../assets/scss/components/slices/features.scss';
@import '../../assets/scss/components/slices/process.scss';
@import '../../assets/scss/components/slices/statistics.scss';
</style>
