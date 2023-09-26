<template>
  <div v-if="data.type === 'form_page'">
    <form-page :content="data.data" />
  </div>
  <div v-if="data.type === 'simple_page'">
    <simple-page :content="data.data" />
  </div>
  <div v-if="data.type === 'slices_page'">
    <prismic-custom-slice-zone :slices="data.data.body" />
  </div>
</template>

<script setup>
const { client } = usePrismic();
const { locale: i18nLocale } = useI18n();
const route = useRoute();

const { data } = await useAsyncData(() => {
  return client.getByUID("slices_page", route.params.uri, {
    lang: i18nLocale.value,
  });
});
</script>
