<template>
  <div class="page news-show">
    <div class="page-banner-layout">
      <div class="page-banner"></div>
      <div class="container padding-container page-banner-content">
        <news-item-post v-if="newsItem" :news-item="newsItem" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { client } = usePrismic();
const { locale: i18nLocale } = useI18n();
const route = useRoute();

/* Routes */
defineI18nRoute({
  paths: {
    en: "/news/:slug",
    fr: "/actualites/:slug",
    "fr-fr": "/actualites/:slug",
    "fr-be": "/actualites/:slug",
  },
});

/* Fetch news item */
const { data: newsItem } = await useAsyncData(() => {
  return client.getByUID("news_item", route.params.slug, {
    lang: i18nLocale.value,
  });
});

/* Metadata */
useHead({
  meta: newsItem.value.data.meta,
  title: `${newsItem.value.data.title[0].text} | Pix`,
});
</script>
