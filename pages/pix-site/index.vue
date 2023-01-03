<template><div></div></template>

<script>
export default {
  nuxtI18n: false,
  layout: 'simple',
  mounted() {
    const preferredLocale = this.getLocaleFromCookie()
    document.location = preferredLocale
      ? `/${preferredLocale}`
      : '/locale-choice'
  },
  methods: {
    getLocaleFromCookie() {
      const localeCookie = document.cookie
        .split('; ')
        .find((item) => item.startsWith('locale'))
      if (!localeCookie) return null
      return localeCookie.split('=')[1]
    },
  },
}
</script>
