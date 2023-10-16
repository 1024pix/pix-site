<template>
  <prismic-custom-slice-zone
    v-if="localeCookie"
    :slices="indexContent.data.body"
  />
  <locale-choice v-else />
</template>

<script setup>
const appConfig = useAppConfig();
const { locale: i18nLocale } = useI18n();
const { client } = usePrismic();
const { localeCookie } = useLocaleCookie();

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
