<template>
  <section class="partners-logos">
    <prismic-rich-text
      v-if="hasTitle && shouldDisplayTitle"
      class="partners-logos__title"
      :field="title"
    />
    <prismic-rich-text v-else class="sr-only" :field="title" />
    <div class="partners-logos__wrapper">
      <div
        v-for="(item, itemIndex) in items"
        :key="`item-${itemIndex}`"
        class="partners-logos-wrapper__item"
      >
        <pix-image :field="item.logos_image" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PartnersLogosSlice',
  props: {
    slice: {
      type: Object,
      default: null,
    },
  },
  computed: {
    items() {
      return this.slice.items
    },
    shouldDisplayTitle() {
      return this.slice.primary.logos_should_display_title
    },
    hasTitle() {
      return (
        this.slice.primary.logos_title.length &&
        this.slice.primary.logos_title[0].text.length
      )
    },
    title() {
      return this.slice.primary.logos_title
    },
  },
}
</script>

<style lang="scss">
.partners-logos {
  margin: 0 16px;

  &__title h2 {
    font-family: $font-open-sans;
    font-weight: $font-normal;
    color: $blue-5;
    letter-spacing: 0.00938rem;
    text-align: center;
    font-size: 1.75rem;
    height: 40px;
    line-height: 40px;
    margin-top: 24px;
    margin-bottom: 24px;
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
  }
}

.partners-logos-wrapper {
  &__item {
    img {
      margin: 0 5px;
    }
  }
}

@include device-is('tablet') {
  .partners-logos {
    margin: 0 32px;
  }
}

@include device-is('desktop') {
  .partners-logos {
    &__title h2 {
      margin-bottom: 48px;
    }

    &__wrapper {
      margin-bottom: 60px;
    }
  }

  .partners-logos-wrapper {
    &__item {
      img {
        margin: 0 8px;
      }
    }
  }
}

@include device-is('large-screen') {
  .partners-logos {
    max-width: 1920px;

    &__title h2 {
      font-size: 2.125rem;
      height: 49px;
      line-height: 49px;
    }
  }
}
</style>
