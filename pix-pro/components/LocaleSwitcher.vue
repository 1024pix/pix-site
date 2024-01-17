<template>
  <client-only>
  </client-only>
</template>

<script setup>
import { reachableLocales }  from "../i18n.config";
import { onClickOutside } from "@vueuse/core";

const { getEnvironmentUrl } = useEnvironmentUrl();
const { setLocaleCookie } = useLocaleCookie();

const { localeProperties, locales, t } = useI18n();

const frLocale = reachableLocales.find((l) => l.code === "fr");
const enLocale = reachableLocales.find((l) => l.code === "en");
const frFrLocale = reachableLocales.find((l) => l.code === "fr-fr");
const frBeLocale = reachableLocales.find((l) => l.code === "fr-be");

const buttonRef = ref(null);
const languagesMenuRef = ref(null);
const isLanguagesMenuVisible = ref(false);
const isInternationalLanguagesVisible = ref(false);

function toggleLanguagesMenu() {
  isLanguagesMenuVisible.value = !isLanguagesMenuVisible.value;

  if (!isLanguagesMenuVisible.value) {
    isInternationalLanguagesVisible.value = false;
  }
}

function toggleInternationalLanguages() {
  isInternationalLanguagesVisible.value =
    !isInternationalLanguagesVisible.value;
}

function updateLocaleCookie(localeCode) {
  setLocaleCookie(localeCode);
}

onClickOutside(
  languagesMenuRef,
  () => {
    if (isLanguagesMenuVisible.value) {
      toggleLanguagesMenu();
    }
  },
  { ignore: [buttonRef] }
);
</script>

<style lang="scss">
.locale-switcher {
  display: none;
}

@include device-is('large-screen') {
  .locale-switcher {
    display: block;
    position: relative;
  }
}

.locale-switcher__button {
  display: flex;
  align-items: center;
  height: 1.5rem;
  padding: 2px 3px;
  font-family: $font-roboto;
  font-size: 0.875rem;
  font-weight: $font-medium;
  color: $grey-60;
  letter-spacing: 0.008rem;
  line-height: 1.375rem;
  border: none;
  background-color: transparent;
  background-size: 1.3rem;
  background-position: 5% 50%;
  cursor: pointer;

  &:hover {
    color: $blue;
  }

  &::after {
    content: "";
    width: 0.5em;
    height: 0.5em;
    margin-left: 0.75em;
    border-bottom: 2px solid currentColor;
    border-right: 2px solid currentColor;
    transform: translateY(-0.15em) rotate(45deg);
  }

  img {
    margin-right: 8px;
  }
}

.locale-switcher__languages-menu {
  top: calc(100% + 0.5rem);

  &,
  .sub-menu {
    position: absolute;
    z-index: 1;
    list-style: none;
    margin: 0;
    padding: 0;
    background: white;
    border: 1px solid $grey-20;
    border-radius: 0.25rem;
  }

  li {
    padding: 0;
    font-size: 0.9rem;
    color: $grey-60;

    &:hover {
      background-color: $grey-10;
      color: $blue;
    }

    &.active {
      color: $grey-30;
      pointer-events: none;
    }

    &::before {
      content: none;
    }

    & + li {
      border-top: 1px solid $grey-20;
    }

    & > *:not(.sub-menu) {
      display: flex;
      align-items: center;
      min-width: max-content;
      padding: 0.75em;
      line-height: 1;
      color: inherit;

      img {
        width: 1.5em;
        margin-right: 0.75em;
      }

      span {
        flex-grow: 1;
        white-space: nowrap;
      }
    }
  }

  .sub-menu {
    top: -1px;
    left: 100%;
    min-width: 150px;
  }

  .sub-menu-toggler {
    align-items: center;
    width: 100%;
    appearance: none;
    background: transparent;
    border: none;
    text-align: left;
    font: inherit;
    cursor: pointer;

    &::after {
      content: "";
      display: block;
      width: 0.6em;
      height: 0.6em;
      margin-left: auto;
      border-bottom: 2px solid currentColor;
      border-right: 2px solid currentColor;
      transform: translateY(-5%) rotate(-45deg);
    }

    span {
      margin-right: 0.65em;
    }
  }
}
</style>
