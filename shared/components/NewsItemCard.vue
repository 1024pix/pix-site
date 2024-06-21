<template>
  <li class="news-item-card">
    <nuxt-link class="news-item-card__link" :to="localePath(`/${t('news-page-prefix')}/${props.uid}`, i18nLocale)">
      <div v-if="slice.illustration?.url" class="news-item-card__header">
        <div
          class="news-item-card__illustration"
          :style="`background-image: url(${img(slice.illustration.url, { width: 340 })})`"
        ></div>
      </div>

      <div class="news-item-card__body">
        <p class="news-item-card__meta">
          <span :class="`news-item-card__category ${categoryClassName}`">
            {{ t(categoryLabel) }}
          </span>
          •
          <span class="news-item-card__date">
            {{ date }}
          </span>
        </p>

        <h3 class="news-item-card__title">{{ slice.title[0].text }}</h3>

        <prismic-rich-text :field="slice.excerpt" class="news-item-card__excerpt" />
      </div>
    </nuxt-link>
  </li>
</template>

<script setup>
import { useDateFormat } from '@vueuse/core';

const { locale: i18nLocale, t } = useI18n();
const localePath = useLocalePath();

const img = useImage();

const props = defineProps({
  slice: {
    type: Object,
    default: null,
  },
  uid: {
    type: String,
    default: null,
  },
});

const categoryClassName = `news-item-card__category--${props.slice.category.toLowerCase()}`;

const categoryLabel = props.slice.category.toLowerCase();

const date = useDateFormat(props.slice.date, 'DD MMMM YYYY', {
  locales: i18nLocale.value,
});
</script>

<style lang="scss">
.news-item-card {
  max-width: 340px;
  margin: 20px auto;
  overflow: hidden;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 5px 15px 0 rgba(112, 128, 175, 0.2);
  transition: all 250ms cubic-bezier(0.02, 0.01, 0.47, 1);
  color: $grey-45;
  list-style: none;

  h1,
  h2,
  h3,
  p {
    font-family: $font-open-sans;
  }

  @include device-is('tablet') {
    margin: 20px;
  }

  &:hover {
    @include device-is('desktop') {
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
    background-color: $blue;
    padding: 5px;
    margin-right: 10px;
  }

  &__category {
    margin-bottom: 20px !important;
    font-weight: 600;

    &--announcement {
      color: #005b94;
    }

    &--engineering {
      color: #7b4809;
    }

    &--event {
      color: #ad004e;
    }

    &--feature {
      color: #20653a;
    }

    &--society {
      color: #50479a;
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
    color: $grey-45;

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

  &__title {
    font-size: 1.4rem;
    line-height: 1.8rem;
    color: #222222;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 20px !important;
  }
}
</style>
