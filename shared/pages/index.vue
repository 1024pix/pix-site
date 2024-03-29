<template>
  <locale-choice v-if="!locale" />
</template>

<script setup>
defineI18nRoute(false);
// due to i18n strategy prefix, root path `/` redirect to default local page `/fr`
// we disable i18n route to disable redirect
definePageMeta({
  layout: 'empty',
});

const { localeCookie } = useLocaleCookie();
const locale = localeCookie.value;
onBeforeMount(() => {
  const router = useRouter();
  if (locale) {
    return router.replace(`/${locale}/`);
  }
});
</script>
