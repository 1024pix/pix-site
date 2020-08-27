<template>
  <div
    class="article article-layout"
    :class="{
      'article-layout--only-text': containsOnlyText,
      'article-layout--reverse': shouldBeReversed,
    }"
  >
    <div
      class="article__content"
      :class="{
        'article__content--only-text': containsOnlyText,
        'article-layout__primary-content': containsTextAndImage,
      }"
    >
      <prismic-rich-text
        :field="content.article_title"
        class="article-content__title"
      />
      <prismic-rich-text
        :field="content.article_description"
        class="article-content__description"
        :class="{
          'article-content__description--only-text': containsOnlyText,
        }"
      />
      <div v-if="content.article_link_type !== 'none'">
        <cta-button
          v-if="content.article_link_type === 'call-to-action'"
          :link="content.article_link_url"
          :name="content.article_link_name"
        />
        <pix-link
          v-else-if="content.article_link_type === 'link-to'"
          :field="content.article_link_url"
          class="article-content__link-to"
        >
          <fa icon="arrow-right" /> {{ content.article_link_name }}
        </pix-link>
      </div>
    </div>
    <prismic-image
      v-if="containsTextAndImage"
      :field="content.article_background"
      class="article-layout__secondary-content article-layout-secondary-content__background article-illustrations__background"
    />
    <prismic-image
      v-if="containsTextAndImage"
      :field="content.article_image"
      class="article-layout__secondary-content article-layout-secondary-content__image article-illustrations__image"
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
    slice: {
      type: Object,
      default: null,
    },
  },
  computed: {
    content() {
      return this.slice.primary
    },
    containsOnlyText() {
      return this.content.article_layout === 'only-text'
    },
    containsTextAndImage() {
      const layout = this.content.article_layout
      return layout === 'text-image' || layout === 'image-text'
    },
    shouldBeReversed() {
      return this.content.article_layout === 'image-text'
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

.article-layout {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    'a a a a'
    'b b b b';
  grid-gap: 16px;

  font-family: $font-open-sans;
  padding: 64px 0;
  margin: 0 16px;

  & > * {
    max-width: 100%;
    justify-self: center;
  }

  .article-layout__primary-content {
    grid-area: a;
  }
  .article-layout__secondary-content {
    grid-area: b;
  }

  &--reverse {
    grid-template-areas:
      'b b b b'
      'a a a a';
  }

  &--only-text {
    display: flex;
    justify-content: center;
  }
}

@include device-is('tablet') {
  .article-layout {
    margin: 0 32px;
    grid-template-columns: repeat(8, 1fr);
    grid-template-areas:
      'a a a a a a a a'
      'b b b b b b b b';

    &--reverse {
      grid-template-areas:
        'b b b b b b b b'
        'a a a a a a a a';
    }
  }
}

@include device-is('desktop') {
  .article-layout {
    grid-template-areas: 'a a a a . b b b';

    &--reverse {
      grid-template-areas: 'b b b . a a a a';
    }
  }
}

@include device-is('large-screen') {
  .article-layout {
    max-width: 1920px;
    margin: 0 auto;
    grid-template-columns: 1.2fr repeat(12, 1fr) 1.2fr;
    grid-template-areas: '. a a a a a a . b b b b b .';
    grid-gap: 24px;

    &--reverse {
      grid-template-areas: '. b b b b b . a a a a a a .';
    }
  }
}

.article-layout
  .article-layout__secondary-content.article-layout-secondary-content__background {
  grid-column-start: b-start;
  grid-column-end: b-end;

  @include device-is('large-screen') {
    grid-column-start: 10;
    width: 100%;
  }
}

.article-layout
  .article-layout__secondary-content.article-layout-secondary-content__image {
  grid-column-start: b-start;
  grid-column-end: b-end;

  @include device-is('large-screen') {
    justify-self: flex-start;
  }
}

.article-layout.article-layout--reverse
  .article-layout__secondary-content.article-layout-secondary-content__background {
  grid-column-start: b-start;
  grid-column-end: b-end;

  @include device-is('large-screen') {
    grid-column-end: 6;
    width: 100%;
  }
}

.article-layout.article-layout--reverse
  .article-layout__secondary-content.article-layout-secondary-content__image {
  grid-column-start: b-start;
  grid-column-end: b-end;

  @include device-is('large-screen') {
    justify-self: flex-end;
  }
}
</style>
