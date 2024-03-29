<template>
  <div class="news">
    <header class="page-header">
      <div class="container md padding-container">
        <h1 class="page-header__title">
          {{ t('news-page-title') }}
        </h1>
      </div>
    </header>

    <main class="page-body">
      <h2 class="sr-only">
        {{ t('news-page-title-level-two') }}
      </h2>
      <ul class="news__list">
        <template v-if="newsItems && newsItems.length">
          <news-item-card
            v-for="(item, index) in newsItems"
            :key="`item-${index}`"
            :slice="item.data"
            :uid="item.uid"
          />
        </template>
        <template v-else>
          <p>{{ t('news-page-no-news') }}</p>
        </template>
      </ul>
    </main>
  </div>
</template>

<script setup>
const { client } = usePrismic();
const { locale: i18nLocale, t } = useI18n();

/* I18n Routes */
defineI18nRoute({
  paths: {
    en: '/news',
    fr: '/actualites',
    'fr-fr': '/actualites',
    'fr-be': '/actualites',
    'nl-be': '/actualites',
  },
});

/* Metadata */
useHead({
  title: t('page-titles.news'),
});

/* Fetch news items */
const { data: newsItems } = await useAsyncData(() => {
  return client.getAllByType('news_item', {
    orderings: {
      field: 'my.news_item.date',
      direction: 'desc',
    },
    lang: i18nLocale.value,
  });
});
</script>

<style lang="scss">
.news {
  h1,
  h2,
  h3,
  h4,
  p {
    font-family: $font-open-sans;
  }

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
}
</style>
