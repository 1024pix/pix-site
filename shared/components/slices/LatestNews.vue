<template>
  <section v-if="latestNews.length" :id="`slice-${indexForId}`" class="latest-news">
    <prismic-rich-text
      v-if="shouldDisplayTitle && hasTitle"
      class="latest-news__title"
      :field="slice.primary.latest_news_title"
    />
    <prismic-rich-text v-else class="sr-only" :field="slice.primary.latest_news_title" />
    <ul class="latest-news__list">
      <news-item-card v-for="(item, index) in latestNews" :key="`item-${index}`" :slice="item.data" :uid="item.uid" />
    </ul>
    <nuxt-link class="latest-news__link-to" :to="localePath(`/${t('news-page-prefix')}`, i18nLocale)">
      {{ slice.primary.latest_news_redirection_link_text }}
    </nuxt-link>
  </section>
</template>

<script setup>
const { client } = usePrismic();
const { locale: i18nLocale, t } = useI18n();
const localePath = useLocalePath();

const props = defineProps({
  slice: {
    type: Object,
    default: null,
  },
  indexForId: {
    type: Number,
    default: 0,
  },
});

/* Fetch last news */
const latestNews = await client.getAllByType('news_item', {
  lang: i18nLocale.value,
  limit: 3,
  orderings: {
    field: 'my.news_item.date',
    direction: 'desc',
  },
});

/* Computed */
const shouldDisplayTitle = props.slice.primary.latest_news_should_display_title;

const hasTitle =
  props.slice.primary.latest_news_title &&
  props.slice.primary.latest_news_title.length &&
  props.slice.primary.latest_news_title[0].text &&
  props.slice.primary.latest_news_title[0].text.length;
</script>

<style lang="scss">
.latest-news {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 118px;

  &__list {
    max-width: 1140px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding-left: 0;

    @include device-is('tablet') {
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-evenly;
    }

    li {
      padding-left: 0;

      &::before {
        content: none;
      }
    }
  }

  &__link-to {
    height: 26px;
    color: $blue;
    font-family: $font-roboto;
    font-size: 1.25rem;
    font-weight: $font-medium;
    letter-spacing: 0.009rem;
    margin-top: 60px;

    &:active,
    &:focus,
    &:hover {
      text-decoration: none;
      color: $blue;
    }
  }

  &__title h2 {
    color: $grey-90;
    font-weight: $font-normal;
    letter-spacing: 0.15px;
    text-align: center;
    margin-top: 48px;
    margin-bottom: 63px;
  }
}
</style>
