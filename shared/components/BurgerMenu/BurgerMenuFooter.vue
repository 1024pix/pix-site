<template>
  <footer class="burger-menu__footer">
    <ul class="burder-menu-footer__actions-zone">
      <li v-for="(item, index) in actions" :key="`action-${index}`">
        <nuxt-link
          :to="item.link.url"
          :class="{
            'button button--with-border-focus': item.style === 'button',
            link: item.style === 'link',
          }"
        >
          <nuxt-img v-if="item.icon" :src="`/images/${item.icon}`" alt="" />
          {{ item.name[0].text }}
        </nuxt-link>
      </li>
    </ul>
    <button
      class="burger-menu-footer__locale"
      :aria-label="t('burger-menu.change-locale-switcher') + ' ' + localeProperties.name"
      @click="$emit('toggleLocaleSwitcher')"
    >
      <nuxt-img :src="`/images/${localeProperties.icon}`" alt="" />
      {{ localeProperties.name }}
      <span>
        {{ t('burger-menu.change-locale-switcher-button') }}
      </span>
    </button>
  </footer>
</template>

<script setup>
const { localeProperties, t } = useI18n();

const props = defineProps({
  actions: {
    type: Array,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.burger-menu__footer {
  position: sticky;
  bottom: 0;
  margin-top: auto;
  background-color: $white;
}
.burder-menu-footer__actions-zone {
  margin: 0;
  padding: 1.5rem 2rem 1rem 2rem;
  border-top: 1px solid $grey-22;
  border-bottom: 1px solid $grey-22;

  li {
    width: 100%;
    padding: 0 0 0.5rem 0;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: $font-medium;
    letter-spacing: 0.008rem;
    line-height: 1.375rem;
    color: $grey-90;
    border-radius: 0.25rem;
    width: 100%;

    &.button {
      display: flex;
      color: $white;
    }

    &.link {
      border: 1px solid $grey-60;

      img {
        max-height: 1.5em;
        max-width: 1.5em;
        margin-right: 0.5em;
      }

      &:hover {
        color: $white;
        background-color: $grey-60;

        img {
          filter: brightness(0) invert(1);
        }
      }

      &:focus {
        color: $white;
        background-color: $grey-90;
        border: 1px solid $grey-90;
        outline: 1px solid $white;
        outline-offset: -4px;

        img {
          filter: brightness(0) invert(1);
        }
      }
    }
  }
}

.burger-menu-nav-container-footer-locale {
  &__button {
    padding: 1rem 2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    font-weight: $font-medium;
    font-size: 1rem;
    background-color: transparent;
    border-top: 1px solid $grey-22;
    border-bottom: 1px solid $grey-22;

    &:hover,
    &:focus {
      background-color: $grey-10;

      .burger-menu-nav-container-footer-locale-button__change {
        color: $blue-hover;
        text-decoration: underline;
      }
    }

    &:active {
      background-color: $grey-15;
    }
  }
}
.burger-menu-footer__locale {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 2rem;
  appearance: none;
  border: none;
  background: transparent;
  font-size: 1rem;
  font-weight: 500;

  &:hover,
  &:focus {
    background-color: $grey-10;

    span {
      text-decoration: underline;
    }
  }

  img {
    height: 1.125rem;
    margin-right: 0.5rem;
  }

  span {
    margin-left: auto;
    color: $blue;
  }
}

.burger-menu-nav-container-footer-locale-button {
  &__current {
    display: flex;
    align-items: center;
    text-align: left;
    color: $grey-90;
    font-weight: $font-medium;
    text-decoration: none;
    margin: 0;
  }

  &__change {
    color: $blue;
  }
}

.burger-menu-nav-container-footer-locale-button-current {
  &__icon {
    padding-right: 0.5rem;
  }
}
</style>
