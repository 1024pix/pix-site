<template>
  <div
    v-if="type === 'with-dropdown'"
    class="locale-switcher"
    @keydown.esc="hideMenu"
  >
    <button
      class="locale-switcher__button"
      :aria-label="$t('locale-switcher-label')"
      aria-haspopup="true"
      :aria-expanded="showMenu.toString()"
      @click.stop.prevent="toggleMenu()"
    >
      {{ $t(currentLocaleCode) }}
      <fa
        v-if="showMenu"
        icon="angle-up"
        class="locale-switcher-button__angle"
      />
      <fa v-else icon="angle-down" class="locale-switcher-button__angle" />
    </button>
    <ul v-if="showMenu" class="locale-switcher__dropdown-menu">
      <li
        v-for="(option, index) in languages.menu"
        :key="`locale-switcher-${index}`"
        :class="{
          'locale-switcher__dropdown-menu--active':
            option.localeCode === currentLocaleCode,
        }"
      >
        <div class="locale-switcher__locale">
          <template v-if="option.children">
            <button
              v-if="option.children"
              class="locale-switcher-sub-menu-button"
              @click.stop.prevent="toggleSubMenu()"
            >
              <img
                class="locale-switcher__img"
                :src="'/images/' + option.icon"
                alt=""
              />
              <div class="locale__text">{{ $t(option.name) }}</div>
              <fa
                icon="angle-right"
                class="locale-switcher__icon locale-switcher-button__angle"
              />
            </button>
            <locale-switcher-sub-menu
              :show-sub-menu="showSubMenu"
              :available-languages="option.children"
              :current-locale-code="currentLocaleCode"
              :selected-menu="selectedMenu"
            />
          </template>
          <pix-link v-else-if="!option.children" :href="getIndexUrl(option)">
            <img
              class="locale-switcher__img"
              :src="'/images/' + option.icon"
              alt=""
            />
            <div class="locale__text">
              <div>{{ $t(option.name) }}</div>
              <div v-if="option.subtitle" class="locale-switcher__subtitle">
                {{ $t(option.subtitle) }}
              </div>
            </div>
          </pix-link>
        </div>
      </li>
    </ul>
    <span class="separator" />
  </div>
  <div v-else-if="type === 'only-text'">
    <ul class="locale-switcher-burger-menu">
      <li v-for="option in languages.menu" :key="option.key">
        <template v-if="option.children">
          <span
            v-for="child in option.children"
            :key="child.name"
            :class="{
              'locale-switcher-burger-menu__locale': true,
              'locale-switcher-burger-menu--active':
                child.localeCode === currentLocaleCode,
            }"
          >
            <pix-link :href="getIndexUrl(child)">
              {{ $t(option.name) }} - {{ $t(child.name) }}
            </pix-link>
            <br />
          </span>
        </template>
        <template v-if="!option.children">
          <span
            :class="{
              'locale-switcher-burger-menu__locale': true,
              'locale-switcher-burger-menu--active':
                option.localeCode === currentLocaleCode,
            }"
          >
            <pix-link :href="getIndexUrl(option)">
              {{ $t(option.name) }}
            </pix-link>
          </span>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { language } from '~/config/language'
import { getAbsoluteUrlIfSwitchWebsite } from '~/services/get-absolute-url-if-switch-website'

export default {
  name: 'LocaleSwitcher',
  props: {
    type: {
      type: String,
      default: 'with-dropdown',
    },
  },
  data() {
    const languages = language
    return {
      showMenu: false,
      showSubMenu: false,
      languages,
    }
  },
  computed: {
    currentLocaleCode() {
      return this.$i18n.locale || this.$i18n.defaultLocale
    },
    selectedMenu() {
      return this.languages.menu
        .flatMap((menuItem) => menuItem.children ?? menuItem)
        .find((locale) => locale.localeCode === this.currentLocaleCode)
    },
  },
  mounted() {
    const page = document.getElementsByTagName('body')[0]

    page.addEventListener('click', this.hideMenu)
  },
  beforeDestroy() {
    const page = document.getElementsByTagName('body')[0]
    page.removeEventListener('click', this.hideMenu)
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    toggleSubMenu() {
      this.showSubMenu = !this.showSubMenu
    },
    hideMenu() {
      this.showMenu = false
      this.showSubMenu = false
    },
    getIndexUrl(menuItem) {
      const locale = language.locales.find(
        (locale) => locale.code === menuItem.localeCode
      )
      return getAbsoluteUrlIfSwitchWebsite({
        relativeTarget: locale.code === 'fr-fr' ? '/' : `/${locale.code}`,
        targetDomain: locale.domain,
      })
    },
  },
}
</script>

<style lang="scss">
.locale-switcher {
  display: none;
}
@include device-is('large-screen') {
  .locale-switcher {
    display: flex;

    .separator {
      margin-left: 15px;
      border-left: 1px solid $grey-20;
      display: block;
      height: 1.5rem;
    }
    &__button {
      font-family: $font-roboto;
      font-size: 0.875rem;
      font-weight: $font-medium;
      color: $grey-60;
      letter-spacing: 0.008rem;
      line-height: 1.375rem;
      margin-bottom: 2px;
      border: none;
      outline: inherit;
      height: 1.5rem;
      background-size: 1.3rem;
      background-position: 5% 50%;
      padding: 2px 3px 0 30px;
      cursor: pointer;
      background: url('/images/globe.svg') no-repeat left;
      &:hover {
        color: $blue;
      }
    }
    &__dropdown-menu {
      position: absolute;
      z-index: 5;
      float: left;
      min-width: 150px;
      padding: 0;
      margin: 35px 0 0 0;

      list-style: none;
      font-size: 14px;
      text-align: left;
      background-color: $white;
      border: 1px solid $grey-20;
      border-radius: 4px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
      background-clip: padding-box;

      .child {
        top: -1px;
        left: 100%;
        margin: 0;
        padding: 0;
        box-shadow: 0 0;
        display: block;
        min-height: 25px;
        .locale-switcher__locale > a {
          line-height: 23px;
        }
      }

      & > li {
        list-style: none;
        width: 100%;
        position: relative;
        margin: 0;
        padding: 0;
        &::before {
          content: '';
          margin: 0;
        }
        &:hover {
          background: $grey-10;
          .child {
            display: block;
          }
        }
      }
      & > li > a,
      & > li > span {
        display: block;
        line-height: 1.6rem;
        color: $grey-20;
        white-space: nowrap;
        text-decoration: none;
      }
      & > li > a:hover,
      & > li > span {
        background: $grey-10;
      }
      & > li:not(:last-child) {
        border-bottom: 1px solid $grey-20;
      }
      &--active {
        color: $grey-30;
        pointer-events: none;
        a {
          color: white;
        }
      }
    }
    &__locale {
      min-height: 25px;
      a,
      span,
      button {
        padding: 10px;
        font-family: $font-roboto;
        font-size: 0.9rem;
        font-weight: $font-medium;
        letter-spacing: 0.008rem;
        line-height: 1;
        color: inherit;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:hover {
          color: $blue;
          background: $grey-10;
        }
        .locale {
          &__text {
            flex: 1;
          }
        }
      }
      button {
        width: 100%;
        border: none;
        background: white;
        &:hover {
          color: $blue;
          background: $grey-10;
        }
        .locale {
          &__text {
            flex: 1;
            text-align: left;
          }
        }
      }
    }
    &__icon {
      font-size: large;
      float: right;
    }
    &__subtitle {
      font-size: smaller;
    }
    &__img {
      margin-right: 10px;
      height: 23px;
      width: 23px;
    }
  }
  .locale-switcher-button {
    &__angle {
      margin-left: 8px;
    }
  }
}

.locale-switcher-burger-menu {
  margin: 0 0 50px 0;
  font-size: 1rem;
  line-height: 1.5rem;
  color: $grey-30;
  list-style: none;
  ul {
    padding: 0;
  }
  li {
    list-style-type: none;
    padding-left: 0;
  }
  li::before {
    content: '';
    margin: 0;
  }
  &__locale {
    a {
      color: $grey-80;
      &:visited,
      &:focus,
      &:active,
      &:hover {
        color: $grey-80;
        text-decoration: underline;
      }
    }
  }
  &--active {
    pointer-events: none;
    a {
      color: $grey-25 !important;
    }
  }
}
</style>
