<template>
  <client-only>
    <easiware-form :solution-id="data.data.solution_id" :form-id="data.data.form_id" />
  </client-only>
</template>

<script setup>
const { client } = usePrismic();
const { locale: i18nLocale } = useI18n();
const route = useRoute();

/* Routes */
defineI18nRoute({
  paths: {
    en: "/support/:slug",
    fr: "/support/:slug",
    "fr-fr": "/support/:slug",
    "fr-be": "/support/:slug"
  }
});

const { data } = await useAsyncData(() => {
  return client.getByUID("easiware_form", route.params.slug, {
    lang: i18nLocale.value
  });
});
</script>
