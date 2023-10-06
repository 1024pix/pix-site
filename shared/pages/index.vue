<template>
  <prismic-custom-slice-zone :slices="indexContent.data.body" />
</template>

<script setup>
const appConfig = useAppConfig();
const { locale: i18nLocale } = useI18n();
const { client } = usePrismic();

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
