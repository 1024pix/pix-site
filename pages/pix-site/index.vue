<template><div></div></template>

<script>
import { language } from '~/config/language'

export default {
  nuxtI18n: false,
  layout: 'simple',
  mounted() {
    const chosenLocale = this.getLocaleFromCookie()
    const url = chosenLocale ? `/${chosenLocale}/` : '/locale-choice'
    this.$router.push(url)
  },
  methods: {
    getLocaleFromCookie() {
      const localeCookie = document.cookie
        .split('; ')
        .find((item) => item.startsWith('locale'))
      if (!localeCookie) return null

      const chosenLocale = localeCookie.split('=')[1]

      const currentLocales = language.localesForCurrentSite.map(
        ({ code }) => code
      )
      if (!currentLocales.includes(chosenLocale)) return null

      return chosenLocale
    },
  },
}
</script>
