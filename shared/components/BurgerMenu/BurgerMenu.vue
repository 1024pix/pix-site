<template>
  <nav class="burger-menu" role="navigation" :aria-label="t('burger-menu.name')">
    <button
      class="burger-menu__toggle"
      :aria-label="isMenuOpen ? t('burger-menu.close') : t('burger-menu.open')"
      :aria-expanded="isMenuOpen"
      aria-controls="menu"
      @click="toggleMenu"
    >
      <span class="burger-menu-toggle__icon" />
      <span class="burger-menu-toggle__icon" />
      <span class="burger-menu-toggle__icon" />
    </button>
    <UseFocusTrap v-if="isMenuOpen" @keydown.esc="toggleMenu">
      <div class="burger-menu__overlay" @click="toggleMenu"></div>
      <div id="menu" class="burger-menu__container" @click.stop>
        <burger-menu-header :logos-zone="items.logosZone" @close-menu="toggleMenu" />
        <div class="burger-menu__content">
          <burger-menu-locales-list
            v-show="isLocaleSwitcherOpen"
            :is-locale-switcher-open="isLocaleSwitcherOpen"
            @close="toggleLocaleSwitcher"
          />
          <burger-menu-first-level-list
            v-show="!isLocaleSwitcherOpen"
            :items="items.navigationZone"
            :is-locale-switcher-open="isLocaleSwitcherOpen ? true : false"
            @close-menu="toggleMenu"
          />
        </div>
        <burger-menu-footer :actions="items.actionsZone" @toggle-locale-switcher="toggleLocaleSwitcher" />
      </div>
    </UseFocusTrap>
  </nav>
</template>

<script setup>
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component';

const { t } = useI18n();

defineProps({
  items: {
    type: Object,
    default: null,
  },
});

const isMenuOpen = ref(false);
const isLocaleSwitcherOpen = ref(false);

watch(isMenuOpen, () => {
  if (isMenuOpen && isMenuOpen.value) {
    document.body.style.position = 'fixed';
  } else {
    document.body.style.position = 'static';
  }
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleLocaleSwitcher = async () => {
  isLocaleSwitcherOpen.value = !isLocaleSwitcherOpen.value;
};
</script>

<style lang="scss">
.burger-menu {
  font-family: $font-roboto;
  font-size: 1rem;
  font-weight: $font-medium;

  button {
    cursor: pointer;
    font: inherit;
  }

  ul,
  li {
    list-style-type: none;
    text-align: left;
    margin: 0;
    padding: 0;

    &::before {
      content: '';
      margin-right: 0;
    }
  }
}
</style>

<style lang="scss" scoped>
.burger-menu__overlay {
  position: fixed;
  z-index: 99;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(52, 69, 99, 0.7);
  transition: all 0.3s ease-in-out;
}

.burger-menu__toggle {
  border: none;
  background-color: transparent;
  color: $grey-80;
  width: 2.75rem;
  height: 2.75rem;
  margin-right: 0.8rem;
  padding: 0.8rem;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: $grey-20;

    span {
      background: $grey-60;
    }
  }

  &:focus {
    background-color: $grey-60;
    outline: 1px solid $white;
    outline-offset: -3px;

    span {
      background: $white;
    }
  }
}

.burger-menu-toggle {
  &__icon {
    background: $grey-90;
    display: block;
    width: 22px;
    height: 3px;
    border-radius: 3px;

    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }
}

.burger-menu__container {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 100vh;
  height: 100svh;
  background-color: $white;
  overflow-y: auto;
}

.burger-menu__content {
  background: $grey-5;
}
</style>
