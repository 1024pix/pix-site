<template>
  <div>
    <div v-if="data.type === 'form_page'">
      <form-page :content="data.data" />
    </div>
    <div v-if="data.type === 'simple_page'">
      <simple-page :content="data.data" />
    </div>
    <div v-if="data.type === 'slices_page'">
      <prismic-custom-slice-zone :slices="data.data.body" />
    </div>
  </div>
</template>

<script setup>
const appConfig = useAppConfig();
const { locale: i18nLocale } = useI18n();
const { client, filter } = usePrismic();
const route = useRoute();

const { data } = await useAsyncData(async () => {
  const formPage = await client.get({
    filters: [filter.at('my.form_page.uid', route.params.uri), filter.any('document.tags', [appConfig.site])],
    lang: i18nLocale.value,
  });

  if (formPage.total_results_size > 0) return formPage.results[0];

  const simplePage = await client.get({
    filters: [filter.at('my.simple_page.uid', route.params.uri), filter.any('document.tags', [appConfig.site])],
    lang: i18nLocale.value,
  });

  if (simplePage.total_results_size > 0) return simplePage.results[0];

  const slicesPage = await client.get({
    filters: [filter.at('my.slices_page.uid', route.params.uri), filter.any('document.tags', [appConfig.site])],
    lang: i18nLocale.value,
  });

  if (slicesPage.total_results_size > 0) return slicesPage.results[0];
});

useHead({
  title: `${data.value.data.title[0].text}`,
});
</script>
