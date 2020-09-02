<template>
  <div class="news-item-card">
    <nuxt-link
      class="news-item-card__link"
      :to="localePath({ name: 'news-slug', params: { slug: uid } })"
    >
      <header class="news-item-card__header">
        <!-- /!\ We keep this line if we think that an image would be better -->
        <div
          class="news-item-card__illustration"
          :style="`background-image: url(${slice.illustration.url})`"
        ></div>
      </header>

      <div class="news-item-card__body">
        <p class="news-item-card__meta">
          <span :class="`news-item-card__category ${categoryClassName}`">
            {{ $t(categoryLabel) }}
          </span>
          •
          <span class="news-item-card__date">
            {{ date }}
          </span>
        </p>

        <prismic-rich-text :field="slice.title" class="news-item-card__title" />

        <prismic-rich-text
          :field="slice.excerpt"
          class="news-item-card__excerpt"
        />
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'NewsItemCard',
  props: {
    slice: {
      type: Object,
      default: null,
    },
    uid: {
      type: String,
      default: null,
    },
  },
  computed: {
    categoryClassName() {
      return `news-item-card__category--${this.slice.category.toLowerCase()}`
    },
    categoryLabel() {
      return this.slice.category.toLowerCase()
    },
    date() {
      return this.$moment(this.slice.date)
        .locale(this.$i18n.locale.split('-')[0])
        .format('LL')
    },
  },
}
</script>

<style lang="scss">
.news-item-card {
  margin: 20px;
  max-width: 340px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 5px 15px 0 rgba(112, 128, 175, 0.2);
  transition: all 250ms cubic-bezier(0.02, 0.01, 0.47, 1);
  color: $grey-1;

  h1,
  h2,
  h3,
  p {
    font-family: 'Open Sans', Arial, sans-serif;
  }

  @media (min-width: 700px) {
    margin: 20px;
  }

  &:hover {
    @media (min-width: 900px) {
      box-shadow: 0 30px 30px rgba(0, 0, 0, 0.1);
      transform: translate3D(0, -20px, 0);
    }
  }

  /* === LAYOUT === */

  &__header {
    padding: 0;
  }

  &__body {
    padding: 30px;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      margin: 0;
      padding: 0;
    }
  }

  &__footer {
  }

  /* === ELEMENTS === */

  &__author {
    font-weight: 500;
    margin: 0;
  }

  &__avatar {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    background-color: $blue-1;
    padding: 5px;
    margin-right: 10px;
  }

  &__category {
    margin-bottom: 20px !important;
    font-weight: 600;

    &--announcement {
      color: #12a3ff;
    }

    &--engineering {
      color: #f1a141;
    }

    &--event {
      color: #ff3f94;
    }

    &--feature {
      color: #57c884;
    }

    &--society {
      color: #574da6;
    }
  }

  &__date {
    margin: 0;
  }

  &__excerpt {
    margin-bottom: 20px;
  }

  &__illustration {
    width: 100%;
    height: 180px;
    background-position: 50% 50%;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background-origin: border-box;
    background-size: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &__link {
    color: $grey-1;

    &:active,
    &:focus,
    &:hover,
    &:visited {
      text-decoration: none;
    }
  }

  &__meta {
    color: #6b6c7a;
    font-size: 0.85rem;
    font-weight: 300;
    margin: 0 0 20px !important;
  }

  &__publication {
    display: flex;
    align-items: center;
    line-height: 1.2rem;
    font-weight: 300;
  }

  &__title h1 {
    font-size: 1.4rem;
    line-height: 1.8rem;
    color: #222222;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 20px !important;
  }
}
</style>
