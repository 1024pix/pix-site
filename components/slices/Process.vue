<template>
  <section class="process" :style="[background]">
    <prismic-rich-text
      v-if="hasTitle && shouldDisplayTitle"
      class="process__title"
      :field="title"
    />
    <prismic-rich-text v-else class="sr-only" :field="title" />
    <prismic-rich-text
      v-if="shouldUseSubtitle && hasSubtitle"
      class="process__subtitle"
      :field="subtitle"
    />
    <div class="process__wrapper">
      <div
        v-for="(itemsByRow, rowIndex) in rows"
        :key="`row-${rowIndex}`"
        class="wrapper__row"
      >
        <div
          v-for="(item, itemIndex) in itemsByRow"
          :key="`item-${itemIndex}`"
          class="wrapper__item"
        >
          <pix-image v-if="hasImage(item)" :field="item.item_image" />
          <div>
            <prismic-rich-text class="item__title" :field="item.item_title" />
            <prismic-rich-text
              class="item__description"
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
    background() {
      return {
        backgroundColor: `${this.slice.primary.process_background_color}`,
      }
    },
    items() {
      return this.slice.items
    },
    shouldDisplayTitle() {
      return this.slice.primary.process_should_display_title
    },
    shouldUseSubtitle() {
      return this.slice.primary.process_should_use_subtitle
    },
    hasTitle() {
      return (
        this.slice.primary.process_title.length &&
        this.slice.primary.process_title[0].text.length
      )
    },
    hasSubtitle() {
      return (
        this.slice.primary.process_subtitle.length &&
        this.slice.primary.process_subtitle[0].text.length
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

<style lang="scss">
.process {
  &__title h2 {
    font-size: 2rem;
    font-weight: $font-normal;
    height: 49px;
    letter-spacing: 0.009rem;
    line-height: 49px;
    text-align: center;
    margin-top: 24px;
    margin-bottom: 48px;
  }

  &__subtitle h3 {
    position: relative;
    top: 24px;
    font-size: 1rem;
    font-weight: $font-light;
    height: 49px;
    letter-spacing: 0.009rem;
    line-height: 49px;
    text-align: center;
  }

  &__wrapper {
    padding: 48px 32px;
  }
}

.wrapper {
  &__row {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    width: 293px;
    padding: 24px;
    box-shadow: 0 24px 32px 0 rgba($black, 0.03),
      0 8px 32px 0 rgba($black, 0.06);
    border-radius: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    img {
      height: 51px;
      width: 51px;
    }

    p {
      margin: 0;
    }
  }
}

.item {
  &__title h1 {
    width: 175px;
    color: $grey-1;
    font-size: 1.25rem;
    letter-spacing: 0;
    line-height: 30px;
    font-weight: $font-semi-bold;
    margin: 0 8px 16px 24px;
  }

  &__description {
    width: 175px;
    color: $grey-6;
    font-size: 0.875rem;
    letter-spacing: 0.009rem;
    line-height: 22px;
    margin-left: 24px;
  }
}

@include device-is('tablet') {
  .process {
    &__title h1 {
      margin-top: 60px;
    }

    &__subtitle h3 {
      top: 0;
      margin-bottom: 48px;
    }

    &__wrapper {
      flex-direction: row;
      padding: 80px 0;
    }
  }

  .wrapper__item {
    margin-bottom: 40px;

    div:first-of-type {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    img {
      margin-bottom: 24px;
    }
  }
}

@include device-is('desktop') {
  .process {
    &__title h1 {
      margin-top: 60px;
    }

    &__wrapper {
      padding: 80px 0 84px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }

  .wrapper {
    &__row {
      flex-direction: row;
      justify-content: center;
      align-items: baseline;
    }

    &__item {
      &:first-of-type {
        margin-left: 56px;
      }

      padding: 32px 24px 56px 24px;
      height: 273px;

      display: block;
      margin-right: 56px;
      margin-bottom: 0;
      text-align: center;
      height: 100%;

      img {
        margin-right: 0;
      }
    }
  }

  .item {
    &__title h1 {
      width: 245px;
      font-size: 1.25rem;
      margin-left: 0;
    }

    &__description {
      margin-top: 8px;
      width: 245px;
      margin-left: 0;
    }
  }
}

@include device-is('large-screen') {
  .process__wrapper {
    padding: 0 98px 60px 98px;
    width: 100%;
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .wrapper {
    &__item {
      &:first-of-type {
        margin-left: 0;
      }

      max-width: 293px;
      padding: 32px 24px 50px 24px;
      text-align: center;
      height: 100%;

      img {
        height: 51px;
        width: 51px;
      }

      &:last-of-type {
        margin-right: 0;
      }
    }
  }

  .item {
    &__description {
      margin-top: 8px;
      width: 245px;
    }
  }
}
</style>
