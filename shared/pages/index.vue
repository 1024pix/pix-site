<template>
  <locale-choice />
</template>

<script setup>

definePageMeta({
  layout: 'empty'
})

// due to i18n strategy prefix, root path `/` redirect to default local page `/fr`
// we disable i18n route to disable redirect
defineI18nRoute(false);

const appConfig = useAppConfig();
const { locale: i18nLocale } = useI18n();
const { client } = usePrismic();
const { localeCookie } = useLocaleCookie();
const route = useRoute();

const hasLocale = computed(() => {
  const hasLocaleUrl = route.path !== "/";
  return localeCookie || hasLocaleUrl || process.env.SITE_DOMAIN === "FR";
});
</script>
