<template>
  <div
    :class="{
      'row-block': layout === 'text-image',
      'row-block row-block--reverse': layout === 'image-text',
    }"
    class="article"
  >
    <div class="row-block__left-content article__text">
      <prismic-rich-text :field="title" class="article-text__title" />
      <prismic-rich-text
        :field="description"
        class="article-text__description"
      />
      <cta-button :link="linkUrl" :name="linkName" />
    </div>
    <div class="row-block__right-content article__illustrations">
      <img :src="background" class="article-illustrations__background" />
      <img :src="image" class="article-illustrations__image" />
    </div>
  </div>
</template>

<script>
import CtaButton from '../cta-button'

export default {
  name: 'Article',
  components: {
    CtaButton,
  },
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
  computed: {
    background() {
      return this.content.primary['article-background'].url
    },
    description() {
      return this.content.primary['article-description']
    },
    image() {
      return this.content.primary['article-image'].url
    },
    layout() {
      return this.content.primary['article-layout']
    },
    linkUrl() {
      return this.content.primary['article-link-url'].url
    },
    linkName() {
      return this.content.primary['article-link-name']
    },
    title() {
      return this.content.primary['article-title']
    },
  },
}
</script>

<style lang="scss">
.article {
  background: $white;
  align-items: center;

  &__text {
    width: 611px;
  }
}

.article-text {
  &__title {
    height: 46px;

    & h2 {
      color: $blue-5;
      font-size: 2rem;
      font-weight: $font-normal;
      letter-spacing: 0.00875rem;
      line-height: 2.875rem;
      margin-top: 0;
    }
  }

  &__description {
    margin: 16px 0 24px 0;

    & p {
      color: $grey-10;
      font-size: 1.25rem;
      font-weight: $font-normal;
      letter-spacing: 0;
      line-height: 2rem;
      margin: 0;
    }
  }
}

.article-illustrations {
  &__background {
  }

  &__image {
    position: absolute;
  }
}
</style>
