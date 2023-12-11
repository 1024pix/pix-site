<template>
  <prismic-custom-slice-zone
    v-if="hasLocale"
    :slices="indexContent.data.body"
  />
  <locale-choice v-else />
</template>

<script setup>
const appConfig = useAppConfig();
const { locale: i18nLocale } = useI18n();
const { client } = usePrismic();
const { localeCookie } = useLocaleCookie();
const route = useRoute();

const hasLocale = computed(() => {
  const hasLocaleUrl = route.path !== "/";
  return localeCookie || hasLocaleUrl || process.env.SITE_DOMAIN === "FR";
});

const { data: indexContent } = await useAsyncData(async () => {
  const indexPages = await client.getAllByTag("index", {
    lang: i18nLocale.value
  });

  const currentSiteIndexPage = indexPages.find((page) =>
    page.tags.includes(appConfig.site)
  );

  return currentSiteIndexPage;
});

useHead({
  title: `${indexContent.value.data.title[0].text}`
});
</script>
