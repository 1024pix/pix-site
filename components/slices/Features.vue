<template>
  <section class="features">
    <prismic-rich-text
      v-if="shouldDisplayTitle && hasTitle"
      class="features__title"
      :field="title"
    />
    <prismic-rich-text v-else class="sr-only" :field="title" />
    <div class="features__wrapper" :style="[background]">
      <div
        v-for="(featuresInARow, rowIndex) in featuresByRow"
        :key="`item-${rowIndex}`"
        class="features-wrapper__row"
      >
        <div
          v-for="(feature, featureIndex) in featuresInARow"
          :key="`item-${featureIndex}`"
          class="features-wrapper__item"
        >
          <pix-image :field="feature.feature_image" />
          <div>
            <prismic-rich-text
              class="features-wrapper-item__title"
              :field="feature.feature_name"
            />
            <prismic-rich-text
              class="features-wrapper-item__description"
              :field="feature.feature_description"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  DESKTOP_MIN_WIDTH,
  EXTRA_LARGE_SCREEN_MIN_WIDTH,
} from '~/config/breakpoints'

export default {
  name: 'FeaturesSlice',
  props: {
    slice: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      featuresByRow: [],
    }
  },
  computed: {
    background() {
      return {
        backgroundColor: `${this.slice.primary.features_background_color}`,
      }
    },
    paragraphs() {
      return this.slice.items
    },
    shouldDisplayTitle() {
      return this.slice.primary.features_should_display_title
    },
    hasTitle() {
      return (
        this.slice.primary.features_title &&
        this.slice.primary.features_title.length &&
        this.slice.primary.features_title[0].text &&
        this.slice.primary.features_title[0].text.length
      )
    },
    title() {
      return this.slice.primary.features_title
    },
  },
  mounted() {
    this.featuresByRow = this.splitFeaturesIntoRows()
  },
  methods: {
    findNbFeaturesInRow() {
      if (process.client) {
        const isExtraLargeScreen = screen.width >= EXTRA_LARGE_SCREEN_MIN_WIDTH
        const isDesktopScreen = screen.width <= DESKTOP_MIN_WIDTH

        if (this.paragraphs.length === 4) {
          if (isExtraLargeScreen && !this.hasTitle) {
            return 4
          } else if (isDesktopScreen && this.hasTitle) {
            return 2
          }
        }
      }

      return 3
    },
    splitFeaturesIntoRows() {
      const rows = []
      const chunkSize = this.findNbFeaturesInRow()
      for (let i = 0; i < this.paragraphs.length; i += chunkSize) {
        rows.push(this.paragraphs.slice(i, i + chunkSize))
      }
      return rows
    },
  },
}
</script>

<style lang="scss">
.features {
  &__title h2 {
    font-size: 2.125rem;
    font-weight: normal;
    height: 49px;
    letter-spacing: 0.15px;
    line-height: 49px;
    text-align: center;
    margin-top: 64px;
    color: $grey-90;
  }

  &__wrapper {
    padding: 64px 0;
  }

  &-wrapper__row {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0px;
    }
  }

  &-wrapper__item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;

    &:last-child {
      margin-right: 0px;
      margin-bottom: 0px;
    }

    img {
      margin-right: 25px;
      height: 62px;
    }

    p {
      margin: 0;
    }
  }

  &-wrapper-item {
    &__title h3 {
      margin-top: 16px;
      width: 100%;
      color: $grey-90;
      font-size: 1rem;
      letter-spacing: 0px;
      line-height: 30px;
      font-weight: 600;
    }

    &__description {
      width: 217px;
      color: $grey-45;
      font-size: 0.875rem;
      letter-spacing: 0.15px;
      line-height: 24px;
    }
  }
}

@include device-is('tablet') {
  .features__title h2 {
    margin-top: 80px;
  }

  .features__wrapper {
    padding: 80px 0;
  }

  .features-wrapper__item {
    margin-bottom: 40px;

    img {
      margin-right: 32px;
      height: 73px;
    }
  }

  .features-wrapper-item {
    &__title h1 {
      width: 518px;
      font-size: 1.25rem;
    }

    &__description {
      width: 518px;
    }
  }
}

@include device-is('desktop') {
  .features__title h2 {
    margin-top: 80px;
  }

  .features__wrapper {
    padding: 80px 0 84px;
  }

  .features-wrapper__row {
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
  }

  .features-wrapper__item {
    display: block;
    margin-right: 98px;
    text-align: center;

    img {
      margin-right: 0;
    }
  }

  .features-wrapper-item {
    &__title h1 {
      width: 200px;
      font-size: 1.25rem;
    }

    &__description {
      margin-top: 8px;
      width: 200px;
    }
  }
}

@include device-is('large-screen') {
  .features__title h2 {
    margin-top: 120px;
  }

  .features__wrapper {
    padding: 60px 0;
  }

  .features-wrapper__item {
    margin-right: 76px;
    text-align: center;

    img {
      height: 73px;
    }
  }

  .features-wrapper-item {
    &__title h1 {
      width: 294px;
    }

    &__description {
      width: 294px;
    }
  }
}
</style>
