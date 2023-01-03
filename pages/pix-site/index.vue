<template>
  <client-only v-if="shouldDisplayLocaleChoice">
    <div class="locale-choice">
      <h1>
        <pix-image
          class="logo-pix"
          :field="{ url: '/images/logo-pix-blanc.svg', alt: 'Pix' }"
        />
      </h1>
      <LocaleLink
        v-for="locale in locales"
        :key="locale.code"
        class="locale-choice__link"
        :locale="locale"
      />
      <pix-image class="planet" :field="{ url: '/images/planet.svg' }" />
    </div>
  </client-only>
</template>

<script>
import { language } from '~/config/language'
export default {
  layout: 'home',
  nuxtI18n: false,
  data() {
    return {
      locales: language.locales,
      shouldDisplayLocaleChoice: false,
    }
  },
  mounted() {
    const preferredLocale = this.getLocaleFromCookie()
    if (preferredLocale) {
      return this.$router.push(preferredLocale)
    } else {
      this.shouldDisplayLocaleChoice = true
    }
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
