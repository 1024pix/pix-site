<template>
  <prismic-custom-slice-zone :slices="data.data.body" />
</template>

<script setup>
const { client } = usePrismic();
const { locale: i18nLocale } = useI18n();

const { data } = await useAsyncData(() => {
  return client.getByUID("slices_page", "index-pix-site", {
    lang: i18nLocale.value,
  });
});
</script>
