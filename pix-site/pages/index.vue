<template>
  <NuxtLayout v-if="localeCookie" name="default">
    <prismic-custom-slice-zone :slices="indexContent.data.body" />
  </NuxtLayout>
  <locale-choice v-else />
</template>

<script setup>
const appConfig = useAppConfig();
const { locale: i18nLocale } = useI18n();
const { client } = usePrismic();
const { localeCookie } = useLocaleCookie();

definePageMeta({
  layout: false, // We want an empty layout for the LocaleChoice page
});

const { data: indexContent } = await useAsyncData(async () => {
  const indexPages = await client.getAllByTag("index", {
    lang: i18nLocale.value,
  });

  const currentSiteIndexPage = indexPages.find((page) =>
    page.tags.includes(appConfig.site)
  );

  return currentSiteIndexPage;
});
</script>
