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
      <ul v-if="tagNames.length" class="news__filters" :aria-label="t('news-page-filter-label')">
        <li v-for="tag in tagNames" :key="tag">
          <button type="button" class="news__filter" :aria-pressed="selectedTag === tag" @click="toggleTag(tag)">
            <tag :label="tag" :class="{ 'tag--active': selectedTag === tag }" />
          </button>
        </li>
      </ul>

      <ul class="news__list">
        <template v-if="filteredNewsItems.length">
          <news-item-card
            v-for="item in filteredNewsItems"
            :key="item.uid"
            :slice="item.data"
            :tags="item.tags"
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
    es: '/actualidad',
    it: '/notizie',
    'de-AT': '/aktuelles',
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

const prefixTag = 'tag-';

const tagNames = computed(() =>
  (newsItems.value ?? [])
    .flatMap(item => item.tags ?? [])
    .filter(tag => tag.startsWith(prefixTag))
    .map(tag => tag.slice(prefixTag.length))
    .filter((tag, index, tags) => tags.indexOf(tag) === index),
);

const selectedTag = ref(null);

function toggleTag(tag) {
  selectedTag.value = selectedTag.value === tag ? null : tag;
}

const filteredNewsItems = computed(() => {
  const items = newsItems.value ?? [];
  if (!selectedTag.value) return items;
  return items.filter(item => item.tags?.includes(`${prefixTag}${selectedTag.value}`));
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
  &__filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    max-width: 1140px;
    margin: 10px auto 2rem;
    padding: 0;
    list-style: none;

    li::before {
      content: none;
    }
  }

  &__filter {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    margin: 0.5rem 0;

    .tag:not(.tag--active) {
      background-color: $dark-blue-pro;
    }
  }
}
</style>
