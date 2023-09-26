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
            <a href="#" @click.prevent.stop="setLocale('fr')">Français</a>
          </li>
          <li>
            <a href="#" @click.prevent.stop="setLocale('en')">English</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#" @click.prevent.stop="setLocale('fr-be')">
          Fédération Wallonie-Bruxelles
        </a>
      </li>
      <li>
        <a href="#" @click.prevent.stop="setLocale('fr-fr')">France</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";

const { setLocale, localeProperties } = useI18n();

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
