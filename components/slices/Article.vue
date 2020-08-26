<template>
  <div
    class="article"
    :class="{
      'article--only-text': layout === 'only-text',
      'row-block': layout === 'text-image' || 'image-text',
      'row-block--reverse': layout === 'image-text',
    }"
  >
    <div
      class="article__content"
      :class="{
        'article__content--only-text': layout === 'only-text',
        'row-block__primary-content': layout === 'text-image' || 'image-text',
      }"
    >
      <prismic-rich-text :field="title" class="article-content__title" />
      <prismic-rich-text
        :field="description"
        class="article-content__description"
        :class="{
          'article-content__description--only-text': layout === 'only-text',
        }"
      />
      <div v-if="linkType !== 'none'">
        <cta-button
          v-if="linkType === 'call-to-action'"
          :link="link"
          :name="linkName"
        />
        <pix-link
          v-else-if="linkType === 'link-to'"
          :field="link"
          class="article-content__link-to"
        >
          <fa icon="arrow-right" /> {{ linkName }}
        </pix-link>
      </div>
    </div>
    <prismic-image
      v-if="layout !== 'only-text'"
      :field="background"
      class="row-block__secondary-content row-block-secondary-content__background article-illustrations__background"
    />
    <prismic-image
      v-if="layout !== 'only-text'"
      :field="image"
      class="row-block__secondary-content row-block-secondary-content__image article-illustrations__image"
    />
  </div>
</template>

<script>
import CtaButton from '../CtaButton'

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
      return this.content.primary.article_background
    },
    description() {
      return this.content.primary.article_description
    },
    image() {
      return this.content.primary.article_image
    },
    layout() {
      return this.content.primary.article_layout
    },
    linkName() {
      return this.content.primary.article_link_name
    },
    linkType() {
      return this.content.primary.article_link_type
    },
    link() {
      return this.content.primary.article_link_url
    },
    title() {
      return this.content.primary.article_title
    },
  },
}
</script>

<style lang="scss">
.article {
  background: $white;
  align-items: center;

  &__content {
    width: 611px;

    &--only-text {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  &--only-text {
    display: flex;
    justify-content: center;
  }
}

.article-content {
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

    &--only-text {
      text-align: center;
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
</style>
