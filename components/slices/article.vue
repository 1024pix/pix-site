<template>
  <div class="row-block article">
    <div class="row-block__left-content article__text">
      <prismic-rich-text :field="title" class="article-text__title" />
      <prismic-rich-text
        :field="description"
        class="article-text__description"
      />
      <cta-button :link="linkUrl" :name="linkName" />
    </div>
    <div class="row-block__right-content article__image">
      <img :src="image" />
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
    linkUrl() {
      return this.content.primary['article-link-url'].url
    },
    linkName() {
      return this.content.primary['article-link-name']
    },
    description() {
      return this.content.primary['article-description']
    },
    image() {
      return this.content.primary['article-image'].url
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
</style>
