<template>
  <section :id="`slice-${indexForId}`" class="partners-logos">
    <prismic-rich-text v-if="hasTitle && shouldDisplayTitle" class="partners-logos__title" :field="title" />
    <prismic-rich-text v-else class="sr-only" :field="title" />
    <div class="partners-logos__wrapper">
      <template v-for="(item, itemIndex) in items">
        <div v-if="item.logos_image?.url" :key="`item-${itemIndex}`" class="partners-logos-wrapper__item">
          <nuxt-img :src="item.logos_image.url" :alt="item.logos_image.alt" height="112" />
        </div>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: "SlicesPartnersLogosSlice",
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
  computed: {
    items() {
      return this.slice.items;
    },
    shouldDisplayTitle() {
      return this.slice.primary.logos_should_display_title;
    },
    hasTitle() {
      return (
        this.slice.primary.logos_title.length &&
        this.slice.primary.logos_title[0].text.length
      );
    },
    title() {
      return this.slice.primary.logos_title;
    },
  },
};
</script>

<style lang="scss">
.partners-logos {
  margin: 0 16px;

  &__title h2 {
    font-family: $font-open-sans;
    font-weight: $font-normal;
    color: $grey-90;
    letter-spacing: 0.00938rem;
    text-align: center;
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

@include device-is("tablet") {
  .partners-logos {
    margin: 0 32px;
  }
}

@include device-is("desktop") {
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

@include device-is("large-screen") {
  .partners-logos {
    max-width: 1920px;
    margin: 0 auto;

    &__title h2 {
      height: 49px;
      line-height: 49px;
    }
  }
}
</style>
