<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
const { fallbackLocale } = useI18n();

useHead({
  htmlAttrs: {
    lang: fallbackLocale,
  },
});
</script>
