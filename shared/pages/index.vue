<template>
  <locale-choice />
</template>

<script setup>
defineI18nRoute(false)
// due to i18n strategy prefix, root path `/` redirect to default local page `/fr`
// we disable i18n route to disable redirect
definePageMeta({
  layout: 'empty',
  middleware: ['locale-cookie']
})
</script>
