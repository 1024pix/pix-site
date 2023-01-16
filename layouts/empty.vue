<template>
  <nuxt />
</template>

<script>
export default {
  name: 'Empty',
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.fallbackLocale,
      },
    }
  },
}
</script>
