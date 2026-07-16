<template>
  <prismic-custom-slice-zone :slices="indexContent.data.body" />
</template>

<script setup>
definePageMeta({
  layout: 'default',
});

/* Routes */
// cf index.vue we declare prefix root path to each locale manually
defineI18nRoute({
  paths: {
    en: '/',
    fr: '/',
    it: '/',
    es: '/',
    'fr-fr': '/',
    'fr-be': '/',
    'nl-be': '/',
    'de-AT': '/',
  },
});

const appConfig = useAppConfig();
const { locale: i18nLocale } = useI18n();
const { client } = usePrismic();

const { data: indexContent } = await useAsyncData(async () => {
  const indexPages = await client.getAllByTag('index', {
    lang: i18nLocale.value,
  });

  const currentSiteIndexPage = indexPages.find(page => page.tags.includes(appConfig.site));

  return currentSiteIndexPage;
});

useSeoMeta({
  title: indexContent.value.data.title[0]?.text,
  ogTitle: indexContent.value.data.title[0]?.text,
  description: indexContent.value.data.seo_description?.[0]?.text,
  ogDescription: indexContent.value.data.seo_description?.[0]?.text,
  ogImage: indexContent.value.data?.seo_image?.url,
});
</script>
