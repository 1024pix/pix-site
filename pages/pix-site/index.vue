<template>
  <client-only v-if="shouldDisplayLocaleChoice">
    <main class="home">
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
    </main>
  </client-only>
</template>

<script>
import { language } from '~/config/language'
export default {
  layout: 'empty',
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
      document.location = `/${preferredLocale}/`
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

<style lang="scss" scoped>
.home {
  width: 100%;
  min-width: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 1rem 0;
  background: url('/images/stars.svg') repeat, $default-gradient;

  @include device-is('large-mobile') {
    padding: 0;
  }
}
</style>
