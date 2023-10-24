<template>
  <nav
    class="burger-menu-nav"
    role="navigation"
    :aria-label="$t('burger-menu.name')"
    @keydown.esc="closeMenu"
  >
    <button
      class="burger-menu-nav__toggle"
      :aria-label="
        isMenuOpen ? $t('burger-menu.close') : $t('burger-menu.open')
      "
      :aria-expanded="isMenuOpen"
      aria-controls="menu"
      @click="toggleMenu"
    >
      <fa icon="bars" />
    </button>
    <div
      class="pix-sidebar__overlay"
      :style="{ display: isMenuOpen ? 'block' : 'none' }"
      @click="overlayClick"
    >
      <focus-trap :active="isMenuOpen">
        <div
          id="menu"
          class="burger-menu-nav__container"
          :style="{ display: isMenuOpen ? 'flex' : 'none' }"
        >
          <div>
            <div class="burger-menu-nav-container__header">
              <ul class="burger-menu-nav-container-header__logos">
                <li
                  v-for="(item, index) in items.logosZone"
                  :key="`logo-${index}`"
                  class="burger-menu-nav-container-header-logos__item"
                >
                  <pix-prismic-link v-if="hasLink(item)" :field="item.url">
                    <pix-image
                      :field="item.image"
                      :has-fixed-dimensions="true"
                      :max-height="48"
                    />
                  </pix-prismic-link>
                  <pix-image
                    v-else
                    :field="item.image"
                    :has-fixed-dimensions="true"
                    :max-height="48"
                  />
                </li>
              </ul>
              <button
                role="button"
                class="burger-menu-nav-container-header-logos-item__close-button"
                :aria-label="$t('burger-menu.close')"
                @click="closeMenu"
              >
                <fa icon="xmark" />
              </button>
            </div>
            <div class="burger-menu-nav-container__content">
              <div
                v-show="isLocaleSwitcherOpen"
                class="burger-menu-nav-container-content__locale-switcher"
              >
                <button
                  class="burger-menu-nav-container-content-locale-switcher__button"
                  :aria-expanded="isLocaleSwitcherOpen"
                  :aria-label="
                    isLocaleSwitcherOpen
                      ? $t('burger-menu.close-locale-switcher')
                      : $t('burger-menu.open-locale-switcher')
                  "
                  @click="toggleLocaleSwitcher"
                >
                  <div
                    class="burger-menu-nav-container-content-locale-switcher-button__come-back"
                  >
                    <fa icon="angle-left" />
                  </div>
                  <img
                    class="burger-menu-nav-container-content-locale-switcher-button__icon"
                    :src="`/images/${localeSwitcherData.icon}`"
                    alt=""
                  />
                  {{ $t(localeSwitcherData.name) }}
                </button>
                <div ref="localeSwitcher" tabindex="0">
                  <locale-switcher
                    type="only-text"
                    class="burger-menu-nav-container-content-locale-switcher__list"
                    @locale-switcher-data="handleLocaleSwitcherClick"
                  />
                </div>
              </div>
              <burger-menu-nav-categories
                v-show="!isLocaleSwitcherOpen"
                :items="items.navigationZone"
                :is-locale-switcher-open="isLocaleSwitcherOpen ? true : false"
                @close-menu="closeMenu"
              />
            </div>
          </div>
          <div class="burger-menu-nav-container__footer">
            <burger-menu-nav-actions-zone :actions="items.actionsZone" />
            <div class="burger-menu-nav-container-footer__locale">
              <button
                class="burger-menu-nav-container-footer-locale__button"
                :aria-label="
                  $t('burger-menu.change-locale-switcher') +
                  ' ' +
                  $t(localeSwitcherData.name)
                "
                @click="toggleLocaleSwitcher"
              >
                <span
                  class="burger-menu-nav-container-footer-locale-button__current"
                >
                  <img
                    class="burger-menu-nav-container-footer-locale-button-current__icon"
                    :src="`/images/${localeSwitcherData.icon}`"
                    alt=""
                  />
                  {{ $t(localeSwitcherData.name) }}
                </span>
                <span
                  class="burger-menu-nav-container-footer-locale-button__change"
                >
                  {{ $t('burger-menu.change-locale-switcher-button') }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </focus-trap>
    </div>
  </nav>
</template>

<script>
import { ref, watch, nextTick } from 'vue'
import BurgerMenuNavCategories from '~/components/BurgerMenuNavCategories.vue'
import BurgerMenuNavActionsZone from '~/components/BurgerMenuNavActionsZone.vue'
import LocaleSwitcher from '~/components/LocaleSwitcher/LocaleSwitcher.vue'

export default {
  name: 'BurgerMenuNavV2',
  components: {
    BurgerMenuNavActionsZone,
    BurgerMenuNavCategories,
    LocaleSwitcher,
  },
  props: {
    items: {
      type: Object,
      default: null,
    },
  },
  setup() {
    const isMenuOpen = ref(false)
    const isLocaleSwitcherOpen = ref(false)
    const localeSwitcher = ref(null)

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const toggleLocaleSwitcher = async () => {
      isLocaleSwitcherOpen.value = !isLocaleSwitcherOpen.value

      if (isLocaleSwitcherOpen.value) {
        await nextTick()
        localeSwitcher.value.focus()
      }
    }

    const handleOverflow = () => {
      if (isMenuOpen.value) {
        document.body.style.position = 'fixed'
      } else {
        document.body.style.position = 'static'
      }
    }

    watch(isMenuOpen, () => {
      handleOverflow()
    })

    return {
      isMenuOpen,
      isLocaleSwitcherOpen,
      localeSwitcher,
      toggleMenu,
      toggleLocaleSwitcher,
    }
  },
  data() {
    return {
      localeSwitcherData: { name: '', icon: '' },
    }
  },
  methods: {
    hasLink(item) {
      return item.url.link_type !== 'Any'
    },
    closeMenu() {
      this.isMenuOpen = false
    },
    overlayClick(event) {
      if (event.target === event.currentTarget) {
        this.closeMenu()
      }
    },
    handleLocaleSwitcherClick(localeSwitcherData) {
      this.localeSwitcherData = localeSwitcherData
    },
  },
}
</script>

<style lang="scss">
.pix-sidebar__overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(52, 69, 99, 0.7);
  transition: all 0.3s ease-in-out;
}

.burger-menu-nav {
  font-family: $font-roboto;

  button {
    font-family: $font-roboto;
  }

  ul,
  li {
    list-style-type: none;
    text-align: left;

    &::before {
      content: '';
      margin-right: 0;
    }
  }

  &__toggle {
    border: none;
    background-color: transparent;
    color: $grey-80;
    width: 2.75rem;
    height: 2.75rem;
    margin-right: 0.8rem;
    padding: 0.8rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      height: 1.5rem;
    }

    &:hover {
      background-color: $grey-20;
      color: $grey-60;
    }

    &:focus {
      background-color: $grey-60;
      outline: 1px solid $white;
      outline-offset: -3px;
      color: $white;
    }
  }

  &__container {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    z-index: 100;
    background-color: $white;
    width: 20rem;
    height: 100vh;
    overflow-y: auto;
  }
}

.burger-menu-nav-container {
  &__header {
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1;
    overflow-y: auto;
    justify-content: space-between;
    padding: 2rem;
    box-shadow: 0px -2px 0px 0px $grey-20 inset;
    background-color: $white;
  }

  &__footer {
    position: sticky;
    bottom: 0;
    background-color: $white;
    border-top: 1px solid $grey-22;
  }
}

.burger-menu-nav-container-header {
  &__logos {
    display: flex;
    margin: 0;
    padding: 0;
  }
}

.burger-menu-nav-container-header-logos {
  &__item {
    padding: 0 1rem 0 0;
  }
}

.burger-menu-nav-container-header-logos-item {
  &__close-button {
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    background-color: $grey-10;
    color: $grey-60;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: $grey-20;
    }

    &:focus {
      background-color: $grey-60;
      outline: 1px solid $white;
      outline-offset: -3px;
      color: $white;
    }
  }
}

.burger-menu-nav-container-content-locale-switcher {
  &__button {
    position: sticky;
    top: 118px;
    padding: 1rem 1.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    border: none;
    border-bottom: 1px solid $grey-22;
    text-align: left;
    font-weight: $font-medium;
    font-size: 1rem;
    background-color: $white;
    color: $grey-90;

    &:hover,
    &:focus {
      background-color: $grey-10;
    }

    &:active {
      background-color: $grey-15;
    }
  }

  &__list {
    padding: 0 1.5rem;
    background-color: $grey-5;
    border-bottom: 1px solid $grey-22;
  }
}

.burger-menu-nav-container-content-locale-switcher-button {
  &__come-back {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    padding: 0.25rem;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    color: $grey-60;

    &:hover {
      background-color: $grey-15;

      svg {
        color: $grey-80;
      }
    }

    svg {
      color: $grey-60;
    }
  }

  &__icon {
    padding-right: 0.5rem;
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
