<template>
  <locale-choice />
</template>

<script setup>
defineI18nRoute(false)
// due to i18n strategy prefix, root path `/` redirect to default local page `/fr`
// we disable i18n route to disable redirect

definePageMeta({
  layout: 'empty'
})


const appConfig = useAppConfig();
const { locale: i18nLocale } = useI18n();
const { client } = usePrismic();
const { localeCookie } = useLocaleCookie();
const route = useRoute();
</script>
