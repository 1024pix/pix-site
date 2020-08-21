<template>
  <section class="features">
    <prismic-rich-text v-if="hasTitle" class="features__title" :field="title" />
    <div class="features__container">
      <div
        v-for="(featuresInARow, rowIndex) in featuresByRow()"
        :key="`item-${rowIndex}`"
        class="features-container__row"
      >
        <div
          v-for="(feature, featureIndex) in featuresInARow"
          :key="`item-${featureIndex}`"
          class="features-container__item"
        >
          <prismic-image :field="feature.featureimg" />
          <div>
            <prismic-rich-text
              class="features-container-item__title"
              :field="feature.featurename"
            />
            <prismic-rich-text
              class="features-container-item__description"
              :field="feature.featuredescription"
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
    content: {
      type: Object,
      default: null,
    },
  },
  computed: {
    paragraphs() {
      return this.content.items
    },
    hasTitle() {
      return (
        this.content.primary.featurestitle &&
        this.content.primary.featurestitle.length &&
        this.content.primary.featurestitle[0].text &&
        this.content.primary.featurestitle[0].text.length
      )
    },
    title() {
      return this.content.primary.featurestitle
    },
  },
  methods: {
    nbFeaturesInRow() {
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
    featuresByRow() {
      const rows = []
      const chunkSize = this.nbFeaturesInRow()
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
  background-color: white;

  &__title h2 {
    font-size: 2.125rem;
    font-weight: normal;
    height: 49px;
    letter-spacing: 0.15px;
    line-height: 49px;
    text-align: center;
    margin-top: 64px;
  }

  &__container {
    margin-top: 64px;
    margin-bottom: 64px;
  }

  &-container__row {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0px;
    }
  }

  &-container__item {
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
      width: 55px;
    }

    p {
      margin: 0;
    }
  }

  &-container-item {
    &__title h1 {
      width: 217px;
      color: $grey-1;
      font-size: 1rem;
      letter-spacing: 0px;
      line-height: 30px;
      font-weight: 600;
    }

    &__description {
      width: 217px;
      color: $grey-9;
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

  .features__container {
    margin-top: 80px;
    margin-bottom: 80px;
  }

  .features-container__item {
    margin-bottom: 40px;

    img {
      margin-right: 32px;
      height: 73px;
      width: 65px;
    }
  }

  .features-container-item {
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

  .features__container {
    margin-top: 80px;
    margin-bottom: 84px;
  }

  .features-container__row {
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
  }

  .features-container__item {
    display: block;
    margin-right: 98px;
    text-align: center;

    img {
      margin-right: 0;
    }
  }

  .features-container-item {
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

  .features__container {
    margin-top: 81px;
    margin-bottom: 121px;
  }

  .features-container__item {
    margin-right: 76px;
    text-align: center;

    img {
      height: 73px;
      width: 65px;
    }
  }

  .features-container-item {
    &__title h1 {
      width: 294px;
    }

    &__description {
      width: 294px;
    }
  }
}
</style>
