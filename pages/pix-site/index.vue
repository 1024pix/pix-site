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
        <locale-link
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
    const chosenLocale = this.getLocaleFromCookie()
    if (chosenLocale) {
      return this.$router.push(`/${chosenLocale}/`)
    }
    this.shouldDisplayLocaleChoice = true
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

.locale-choice {
  padding: 3rem 0;
}

.logo-pix {
  margin: 0 auto 5vh;
  display: block;
  width: 11rem;
  max-width: 100%;
}

.locale-choice__link + .locale-choice__link {
  margin-top: 1rem;
}

.planet {
  margin: 5vh auto 0;
  display: block;
  width: max(16vw, 90%);
}

@include device-is('large-mobile') {
  .locale-choice {
    position: relative;
  }

  .planet {
    position: absolute;
    top: 50%;
    right: calc(100% + 4vw);
    max-width: unset;
    margin: 0;
    transform: translateY(-50%);
  }
}
</style>
