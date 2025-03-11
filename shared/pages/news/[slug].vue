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
    en: '/news/[slug]',
    fr: '/actualites/[slug]',
    'fr-FR': '/actualites/[slug]',
    'fr-BE': '/actualites/[slug]',
    'nl-BE': '/actualites/[slug]',
  },
});

/* Fetch news item */
const { data: newsItem } = await useAsyncData(
  `news-item-${route.params.slug}`,
  () => {
    return client.getByUID('news_item', route.params.slug, {
      lang: i18nLocale.value,
    });
  });

useSeoMeta({
  title: newsItem.value.data.title[0]?.text,
  ogTitle: newsItem.value.data.title[0]?.text,
  description: newsItem.value.data.excerpt[0]?.text,
  ogDescription: newsItem.value.data.excerpt[0]?.text,
  ogImage: newsItem.value.data.illustration?.url,
});
</script>
