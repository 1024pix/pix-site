<template>
  <nuxt-link :to="formattedUrl" :target="field.target">
    <slot />
  </nuxt-link>
</template>

<script setup>
const $i18n = useI18n();

const props = defineProps({
  field: {
    required: true,
    type: Object,
  },
});

const formattedUrl = computed(() => {
  return removeHostIfCurrentSite(props.field.url);
});

function removeHostIfCurrentSite(url) {
  try {
    if (!isCurrentLocaleURL(url)) return url;

    const parsedURL = new URL(url);
    return parsedURL.pathname + parsedURL.search + parsedURL.hash;
  } catch (e) { // eslint-disable-line @typescript-eslint/no-unused-vars
    // relative URL
    return url;
  }
}

function isCurrentLocaleURL(url) {
  if (!url.startsWith('/')) return false;

  const locale = getPathLocale(url) ?? $i18n.defaultLocale;
  return locale === $i18n.locale;
}

function getPathLocale(path) {
  const localeCodesWithoutDefault = $i18n.localeCodes.value.filter(code => code !== $i18n.defaultLocale);

  // When fr-fr, no other locale is available, so return undefined
  if (localeCodesWithoutDefault.length === 0) return undefined;

  const rootMatch = new RegExp(`^/(${localeCodesWithoutDefault.join('|')})?($|\\/)`).exec(path);
  if (rootMatch != null) return rootMatch[1];

  return undefined;
}
</script>
