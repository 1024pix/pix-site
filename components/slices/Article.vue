<template>
  <div :style="[background]">
    <div
      class="article"
      :class="{
        'article--only-text': containsOnlyText,
        'article--reverse': shouldBeReversed,
      }"
    >
      <div
        class="article__content"
        :class="{
          'article__content--only-text': containsOnlyText,
          'article__primary-content': containsTextAndImage,
        }"
      >
        <prismic-rich-text
          :field="content.article_title"
          class="article-content__title"
          :class="{
            'article-content__title--only-text': containsOnlyText,
          }"
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
        class="article__secondary-content article-secondary-content__background"
      />
      <prismic-image
        v-if="containsTextAndImage"
        :field="content.article_image"
        class="article__secondary-content article-secondary-content__image"
      />
    </div>
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
    background() {
      let style = {}
      if (this.containsOnlyText) {
        style = {
          background: `no-repeat url(${this.content.article_background.url})`,
          backgroundSize: '100%',
          backgroundPosition: 'top right',
        }
      }
      style['background-color'] = `${this.content.article_background_color}`
      return style
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
.article-content__title {
  text-align: left;

  &--only-text {
    text-align: center;
  }
}

.article {
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

  &__content {
    width: 611px;
    align-self: center;

    &--only-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 65%;
    }
  }

  &__primary-content {
    grid-area: a;
  }

  &__secondary-content {
    grid-area: b;
    align-self: center;
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
  .article {
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
  .article {
    grid-template-columns: repeat(8, 1fr);
    grid-template-areas: 'a a a a . b b b';

    &--reverse {
      grid-template-areas: 'b b b . a a a a';
    }
  }
}

@include device-is('large-screen') {
  .article {
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

.article .article__secondary-content.article-secondary-content__background {
  grid-column-start: b-start;
  grid-column-end: b-end;

  @include device-is('large-screen') {
    grid-column-start: 10;
    width: 100%;
  }
}

.article .article__secondary-content.article-secondary-content__image {
  grid-column-start: b-start;
  grid-column-end: b-end;

  @include device-is('large-screen') {
    justify-self: flex-start;
  }
}

.article.article--reverse
  .article__secondary-content.article-secondary-content__background {
  grid-column-start: b-start;
  grid-column-end: b-end;

  @include device-is('large-screen') {
    grid-column-start: b-start;
    grid-column-end: 6;
    width: 100%;
  }
}

.article.article--reverse
  .article__secondary-content.article-secondary-content__image {
  grid-column-start: b-start;
  grid-column-end: b-end;

  @include device-is('large-screen') {
    justify-self: flex-end;
  }
}

.article-content {
  &__description {
    margin: 16px 0 24px 0;
    color: $grey-10;

    ul {
      list-style: none;
      padding: 0;

      li:before {
        color: $grey-10;
      }
    }

    & p {
      font-size: 1.25rem;
      font-weight: $font-normal;
      letter-spacing: 0;
      line-height: 2rem;
      margin: 15px 0px;
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

  &__title h2 {
    color: $blue-5;
    font-size: 2rem;
    font-weight: $font-normal;
    letter-spacing: 0.00875rem;
    line-height: 2.875rem;
    margin-top: 0;
  }
}
</style>
