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

const { localeCookie, setLocaleCookie } = useLocaleCookie();
const locale = localeCookie.value;
onBeforeMount(() => {
  const router = useRouter();
  if (locale) {
    return router.replace(`/${locale}/`);
  }
});

const config = useAppConfig();
const domainOrg = config.domainOrg;
const currentUrl = useRequestURL();

onMounted(async () => {
  const { shouldRedirectToFrFr } = await useGeolocationActions(currentUrl, $fetch);
  if (shouldRedirectToFrFr) {
    setLocaleCookie('fr-fr');
    window.location = `${domainOrg || ''}/fr-fr`;
  }
});
</script>
