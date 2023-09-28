<template>
  <prismic-custom-slice-zone :slices="indexContent.data.body" />
</template>

<script setup>
const { client } = usePrismic();
const { locale: i18nLocale } = useI18n();

const { data: indexContent } = await useAsyncData(async () => {
  const indexPages = await client.getAllByTag("index", {
    lang: i18nLocale.value,
  });

  const currentSiteIndexPage = indexPages.find((page) =>
    page.tags.includes(process.env.SITE)
  );

  return currentSiteIndexPage;
});
</script>
