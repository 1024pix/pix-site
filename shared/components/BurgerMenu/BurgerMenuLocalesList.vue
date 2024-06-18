<template>
  <div class="burger-menu__locales-list">
    <button
      class="burger-menu-locales-list__back-button"
      :aria-expanded="isLocaleSwitcherOpen"
      :aria-label="
        isLocaleSwitcherOpen ? t('burger-menu.close-locale-switcher') : t('burger-menu.open-locale-switcher')
      "
      @click="$emit('close')"
    >
      <nuxt-img
        class="burger-menu-nav-container-content-locale-switcher-button__icon"
        :src="`/images/${localeProperties.icon}`"
        alt=""
      />
      {{ localeProperties.name }}
    </button>
    <ul ref="localeSwitcher" class="burger-menu-locales-list__items" tabindex="0">
      <li v-for="locale in availableLocales" :key="locale.code">
        <a
          :href="getEnvironmentUrl(`${locale.domain || ''}/${locale.code === frFrLocale.code ? '' : locale.code}`)"
          :aria-current="localeProperties.code === locale.code && 'page'"
          @click="updateLocaleCookie(locale.code)"
        >
          <nuxt-img :src="`/images/${locale.icon}`" alt="" />
          <span>{{ locale.name }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { getEnvironmentUrl } = useEnvironmentUrl();
const { setLocaleCookie } = useLocaleCookie();
const runtimeConfig = useRuntimeConfig();
const { localeProperties, t } = useI18n();

const availableLocales = runtimeConfig.public.availableLocales;

const frFrLocale = availableLocales.find((l) => l.code === 'fr-fr');

const props = defineProps({
  isLocaleSwitcherOpen: {
    type: Boolean,
    required: true,
  },
});

const localeSwitcher = ref(null);

const updateLocaleCookie = (localeCode) => {
  setLocaleCookie(localeCode);
};

watch(
  () => props.isLocaleSwitcherOpen,
  async (value) => {
    if (value) {
      await nextTick();
      localeSwitcher.value.focus();
    }
  },
);
</script>

<style lang="scss" scoped>
.burger-menu-locales-list__back-button {
  position: sticky;
  top: 118px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 1.5rem;
  text-align: left;
  font-weight: $font-medium;
  font-size: 1rem;
  color: $grey-90;
  background-color: $white;
  border: none;
  border-bottom: 1px solid $grey-22;

  &:hover,
  &:focus {
    background-color: $grey-10;
  }

  &:active {
    background-color: $grey-15;
  }

  img {
    height: 1.125em;
    margin-right: 0.5em;
  }

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    margin-right: 0.75rem;
    border-top: 2px solid $grey-60;
    border-left: 2px solid $grey-60;
    transform-origin: center center;
    transform: rotate(-45deg) translate(25%, 25%);
  }
}

.burger-menu-locales-list__items {
  a {
    display: flex;
    align-items: center;
    color: $grey-90;
    padding: 0.5rem 1.5rem;

    &:hover,
    &:focus {
      background-color: $grey-10;
    }

    &:active {
      background-color: $grey-15;
    }
  }

  img {
    height: 1.125em;
    margin-right: 0.5em;
  }
}
</style>
