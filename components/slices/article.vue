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
      <div v-if="linkType !== 'none'">
        <cta-button
          v-if="linkType === 'call-to-action'"
          :link="linkUrl"
          :name="linkName"
        />
        <a
          v-else-if="linkType === 'link-to'"
          :href="linkUrl"
          class="article-text__link-to"
        >
          <fa icon="arrow-right" /> {{ linkName }}
        </a>
      </div>
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
    linkName() {
      return this.content.primary['article-link-name']
    },
    linkType() {
      return this.content.primary['article-link-type']
    },
    linkUrl() {
      return this.content.primary['article-link-url'].url
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

  &__link-to {
    height: 26px;
    color: $blue-1;
    font-family: $font-roboto;
    font-size: 1.25rem;
    font-weight: $font-medium;
    letter-spacing: 0;
    line-height: 0.009rem;

    &:active,
    &:focus,
    &:hover {
      text-decoration: none;
      color: $blue-1;
    }
  }

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
}

.article-illustrations {
  &__background {
  }

  &__image {
    position: absolute;
  }
}
</style>
