<template>
  <section class="features">
    <prismic-rich-text class="features__title" :field="title" />
    <div class="features__container">
      <div
        v-for="(featuresInARow, rowIndex) in featuresByRow"
        :key="`item-${rowIndex}`"
        class="features-container__row"
      >
        <div
          v-for="(feature, featureIndex) in featuresInARow"
          :key="`item-${featureIndex}`"
          class="features-container__item"
        >
          <prismic-rich-text :field="feature.paragraph" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturesSlice',
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
  computed: {
    nbFeaturesInRow() {
      return 3
    },
    featuresByRow() {
      const rows = []
      const chunkSize = this.nbFeaturesInRow
      for (let i = 0; i < this.paragraphs.length; i += chunkSize) {
        rows.push(this.paragraphs.slice(i, i + chunkSize))
      }
      return rows
    },
    paragraphs() {
      return this.content.items
    },
    title() {
      return this.content.primary.title
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
    justify-content: center;
  }

  &-container__item {
    margin-bottom: 24px;

    &:last-child {
      margin-right: 0px;
      margin-bottom: 0px;
    }

    p {
      margin: 0;
    }

    img {
      height: 73px;
      width: 65px;
    }

    strong {
      font-size: 20px;
      color: $grey-1;
      margin-bottom: 8px;
    }

    div {
      color: $grey-9;
      font-size: 14px;
      font-weight: normal;
      letter-spacing: 0.15px;
      line-height: 24px;
      text-align: center;
      width: 294px;
    }
  }
}

@include device-is('tablet') {
  .features__title h2 {
    margin-top: 80px;
  }
}

@include device-is('desktop') {
  .features__title h2 {
    margin-top: 80px;
  }
}

@include device-is('large-screen') {
  .features__title h2 {
    margin-top: 120px;
  }
}
</style>
