<template>
  <main class="home">
    <div class="locale-choice">
      <h1>
        <img class="logo-pix" src="/images/logo-pix-blanc.svg" alt="Pix" />
      </h1>
      <a
        v-for="locale in availableLocales"
        :key="locale.code"
        class="locale-link"
        :href="`${locale.domain}/${locale.code === 'fr-fr' ? '' : locale.code}`"
        @click="updateLocale(locale.code)"
      >
        <img class="locale-link__icon" :src="'/images/' + locale.icon" alt="" />
        <span class="locale-link__text">{{ locale.name }}</span>
      </a>
      <img class="planet" src="/images/planet.svg" />
    </div>
  </main>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const availableLocales = runtimeConfig.public.availableLocales;

const { setLocaleCookie } = useLocaleCookie();

function updateLocale(localeCode) {
  setLocaleCookie(localeCode);
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
  background:
    url('/images/stars.svg') repeat,
    $default-gradient;

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

.locale-link + .locale-link {
  margin-top: 1rem;
}

.planet {
  margin: 5vh auto 0;
  display: block;
  width: max(16vw, 90%);
}

.locale-link {
  display: flex;
  align-items: center;
  min-width: min(18em, 90vw);
  padding: 16px;
  background: rgba(255, 255, 255, 0.8);
  transition: background-color ease-out 320ms;
  box-shadow: $shadow-xs;
  border-radius: 16px;
  font-family: $font-roboto;
  font-weight: $font-medium;
  font-size: 18px;
  color: $grey-90;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  &:focus,
  &:active {
    transition: none;
    background: rgba(193, 199, 208, 0.6);
  }

  &__icon {
    flex-shrink: 0;
    margin-right: 16px;
  }

  &__text {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-wrap: break-word;
  }
}

[href$='/fr'],
[href$='/en'] {
  .locale-link__icon {
    filter: brightness(50%);
  }
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
