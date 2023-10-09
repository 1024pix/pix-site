<template>
  <div class="locale-switcher">
    <button
      ref="buttonRef"
      class="locale-switcher__button"
      @click="toggleLanguagesMenu"
      @keyup.esc="isLanguagesMenuVisible && toggleLanguagesMenu()"
      :aria-label="t('locale-switcher.button.main-label')"
      aria-haspopup="menu"
      :aria-expanded="isLanguagesMenuVisible"
    >
      <img :src="`/images/${localeProperties.icon}`" />
      <span>{{ localeProperties.name }}</span>
    </button>
    <ul
      v-if="isLanguagesMenuVisible"
      ref="languagesMenuRef"
      class="locale-switcher__languages-menu"
    >
      <li>
        <button
          class="sub-menu-toggler"
          @click="toggleInternationalLanguages"
          :aria-label="t('locale-switcher.button.international-label')"
        >
          <img :src="`/images/${frLocale.icon}`" />
          <span>{{ t("locale-switcher.locales.international") }}</span>
        </button>
        <ul v-if="isInternationalLanguagesVisible" class="sub-menu">
          <li
            v-if="frLocale.active"
            :class="{ active: localeProperties.code === frLocale.code }"
          >
            <a
              :href="getEnvironmentUrl(`${frLocale.domain}/fr`)"
              :aria-current="localeProperties.code === frLocale.code && 'page'"
            >
              {{ frLocale.name }}
            </a>
          </li>
          <li
            v-if="enLocale.active"
            :class="{ active: localeProperties.code === enLocale.code }"
          >
            <a
              :href="getEnvironmentUrl(`${enLocale.domain}/en`)"
              :aria-current="localeProperties.code === enLocale.code && 'page'"
            >
              {{ enLocale.name }}
            </a>
          </li>
        </ul>
      </li>
      <li
        v-if="frBeLocale.active"
        :class="{ active: localeProperties.code === frBeLocale.code }"
      >
        <a
          :href="getEnvironmentUrl(`${frBeLocale.domain}/fr-be`)"
          :aria-current="localeProperties.code === frBeLocale.code && 'page'"
        >
          <img :src="`/images/${frBeLocale.icon}`" />
          <span>{{ frBeLocale.name }}</span>
        </a>
      </li>
      <li
        v-if="frFrLocale.active"
        :class="{ active: localeProperties.code === frFrLocale.code }"
      >
        <a
          :href="getEnvironmentUrl(`${frFrLocale.domain}/`)"
          :aria-current="localeProperties.code === frFrLocale.code && 'page'"
        >
          <img :src="`/images/${frFrLocale.icon}`" />
          <span>{{ frFrLocale.name }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";

const { getEnvironmentUrl } = useEnvironmentUrl();

const { localeProperties, locales, t } = useI18n();

const frLocale = locales.value.find((l) => l.code === "fr");
const enLocale = locales.value.find((l) => l.code === "en");
const frFrLocale = locales.value.find((l) => l.code === "fr-fr");
const frBeLocale = locales.value.find((l) => l.code === "fr-be");

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
  border-right: 1px solid $grey-20;
  padding-right: 1.5em;
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
  outline: inherit;
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
