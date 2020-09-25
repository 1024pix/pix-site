<template>
  <section class="process">
    <prismic-rich-text v-if="hasTitle" class="process__title" :field="title" />
    <prismic-rich-text
      v-if="hasSubtitle"
      class="process__subtitle"
      :field="subtitle"
    />
    <div class="process__wrapper">
      <div
        v-for="(itemsByRow, rowIndex) in rows"
        :key="`row-${rowIndex}`"
        class="process-wrapper__row"
      >
        <div
          v-for="(item, itemIndex) in itemsByRow"
          :key="`item-${itemIndex}`"
          class="process-wrapper__item"
        >
          <pix-image :field="item.item_image" />
          <div>
            <prismic-rich-text
              class="process-wrapper-item__title"
              :field="item.item_title"
            />
            <prismic-rich-text
              class="process-wrapper-item__description"
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
import PixImage from '@/components/PixImage'

export default {
  name: 'ProcessSlice',
  components: {
    PixImage,
  },
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
    items() {
      return this.slice.items
    },
    hasTitle() {
      return (
        this.slice.primary.process_title &&
        this.slice.primary.process_title.length
      )
    },
    hasSubtitle() {
      return (
        this.slice.primary.process_subtitle &&
        this.slice.primary.process_subtitle.length
      )
    },
    title() {
      return this.slice.primary.process_title
    },
    subtitle() {
      return this.slice.primary.process_subtitle
    },
  },
  mounted() {
    this.rows = this.splitItemsIntoRows()
  },
  methods: {
    findNbItemsInRow() {
      if (process.client) {
        const isLargeScreen = document.body.clientWidth >= DESKTOP_MIN_WIDTH
        const isExtraLargeScreen =
          document.body.clientWidth >= EXTRA_LARGE_SCREEN_MIN_WIDTH

        if (this.items.length === 4) {
          if (isExtraLargeScreen && !this.hasTitle) {
            return 4
          } else if (isLargeScreen && this.hasTitle) {
            return 2
          }
        }
      }

      return 3
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
