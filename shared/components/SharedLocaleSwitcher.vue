<template>
  <div class="locale-switcher">
    <button
      ref="buttonRef"
      class="locale-switcher__button"
      @click="toggleLanguagesMenu()"
      @keyup.esc="isLanguagesMenuActive && toggleLanguagesMenu()"
    >
      <img :src="`/images/${localeProperties.icon}`" />
      <span>{{ localeProperties.name }}</span>
    </button>
    <ul
      v-if="isLanguagesMenuActive"
      ref="languagesMenuRef"
      class="locale-switcher__languages-menu"
    >
      <li>
        <span>International</span>
        <ul>
          <li>
            <a :href="getEnvironmentUrl(`${frLocale.domain}/fr`)">
              {{ frLocale.name }}
            </a>
          </li>
          <li>
            <a :href="getEnvironmentUrl(`${enLocale.domain}/en`)">
              {{ enLocale.name }}
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a :href="getEnvironmentUrl(`${frBeLocale.domain}/fr-be`)">
          {{ frBeLocale.name }}
        </a>
      </li>
      <li>
        <a :href="getEnvironmentUrl(`${frFrLocale.domain}/`)">
          {{ frFrLocale.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import useEnvironmentUrl from "@shared/hooks/useEnvironmentUrl";

const { getEnvironmentUrl } = useEnvironmentUrl();

const { localeProperties, locales } = useI18n();

const frLocale = locales.value.find((l) => l.code === "fr");
const enLocale = locales.value.find((l) => l.code === "en");
const frFrLocale = locales.value.find((l) => l.code === "fr-fr");
const frBeLocale = locales.value.find((l) => l.code === "fr-be");

const buttonRef = ref(null);
const languagesMenuRef = ref(null);
const isLanguagesMenuActive = ref(false);

function toggleLanguagesMenu() {
  isLanguagesMenuActive.value = !isLanguagesMenuActive.value;
}

onClickOutside(
  languagesMenuRef,
  () => {
    toggleLanguagesMenu();
  },
  { ignore: [buttonRef] }
);
</script>

<style lang="scss">
.locale-switcher {
  position: relative;
}

.locale-switcher__button {
  display: flex;
  height: 1.5rem;
  margin-bottom: 2px;
  align-items: center;
  padding: 2px 3px;
  font-family: $font-roboto;
  font-size: 0.875rem;
  font-weight: $font-medium;
  color: $grey-60;
  letter-spacing: 0.008rem;
  line-height: 1.375rem;
  border: none;
  outline: inherit;
  background-size: 1.3rem;
  background-position: 5% 50%;
  cursor: pointer;

  &:hover {
    color: $blue;
  }

  img {
    margin-right: 8px;
  }
}

.locale-switcher__languages-menu {
  position: absolute;
  background: white;
  padding: 10px;
}
</style>
