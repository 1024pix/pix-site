<template>
  <client-only>
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
    }
  },
}
</script>

<style lang="scss" scoped>
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
