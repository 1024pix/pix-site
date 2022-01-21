<template>
  <div
    v-if="showLanguageDropdown && type === 'with-dropdown'"
    class="language-switcher"
    @keydown.esc="hideMenu"
  >
    <button
      class="language-switcher__button"
      :aria-label="$t('language-switcher-label')"
      aria-haspopup="true"
      :aria-expanded="showMenu.toString()"
      @click="toggleMenu()"
      @click.stop.prevent
    >
      {{ currentLanguage.name }}
      <fa v-if="showMenu" icon="angle-up" />
      <fa v-else icon="angle-down" />
    </button>
    <ul v-if="showMenu" class="language-switcher__dropdown-menu">
      <li v-for="option in languageLocales" :key="option.key">
        <span
          v-if="option === currentLanguage"
          class="language-switcher__lang language-switcher__lang--active"
          >{{ option.name }}</span
        >
        <span v-else class="language-switcher__lang">
          <a :href="'/' + option.lang">
            {{ option.name }}
          </a>
        </span>
      </li>
    </ul>
    <span class="separator" />
  </div>
  <div v-else-if="showLanguageDropdown && type === 'only-text'">
    <ul class="language-switcher-burger-menu">
      <li v-for="option in languageLocales" :key="option.key">
        <span
          v-if="option !== currentLanguage"
          class="language-switcher-burger-menu__lang"
        >
          <a :href="'/' + option.lang">
            {{ option.name }}
          </a>
        </span>
        <span
          v-if="option === currentLanguage"
          class="language-switcher-burger-menu__lang"
        >
          {{ option.name }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { SITES_PRISMIC_TAGS } from '~/services/available-sites'

export default {
  name: 'LanguageSwitcherLegacy',
  props: {
    type: {
      type: String,
      default: 'with-dropdown',
    },
  },
  data() {
    const availableLocales = this.$i18n.locales.map((locale) => {
      return { name: this.$t(locale.code), lang: locale.code }
    })
    const languageLocales = availableLocales.filter(
      (locale) => locale.lang !== 'fr-fr'
    )
    return {
      showMenu: false,
      languageLocales,
    }
  },
  computed: {
    showLanguageDropdown() {
      return (
        process.env.SITE === SITES_PRISMIC_TAGS.PIX_SITE &&
        this.$config.languageSwitchEnabled &&
        this.$i18n.locale !== 'fr-fr'
      )
    },
    currentLocale() {
      return this.$i18n.locale || this.$i18n.defaultLocale
    },
    currentLanguage() {
      return this.languageLocales.find(
        (locale) => locale.lang === this.currentLocale
      )
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

    hideMenu() {
      this.showMenu = false
    },
  },
}
</script>

<style lang="scss" scoped>
.language-switcher {
  display: none;
}
@include device-is('large-screen') {
  .language-switcher {
    display: flex;

    .separator {
      margin-left: 15px;
      border-left: 1px solid $grey-20;
      display: block;
      height: 1.5rem;
    }
    &__button {
      background: none;
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
      background-image: url('/images/globe.svg');
      background-repeat: no-repeat;
      &:hover {
        color: $blue;
      }
    }
    &__dropdown-menu {
      position: absolute;
      z-index: 5;
      float: left;
      min-width: 120px;
      padding: 5px 0;
      margin: 35px 0 0 0;

      list-style: none;
      font-size: 14px;
      text-align: left;
      background-color: $white;
      border: 1px solid $grey-20;
      border-radius: 4px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
      background-clip: padding-box;

      & > li {
        list-style: none;
        overflow: hidden;
        width: 100%;
        position: relative;
        margin: 0;
        padding: 5px 0 5px 10px;
        &::before {
          content: '';
          margin: 0;
        }
      }
      & > li > a {
        padding: 0;
        display: block;
        line-height: 1.6rem;
        color: $grey-20;
        white-space: nowrap;
        text-decoration: none;
      }
      & > li > a:hover {
        background: $grey-10;
        color: $blue;
      }
      & > li:not(:last-child) {
        border-bottom: 1px solid $grey-20;
      }
    }
    &__lang {
      a {
        font-family: $font-roboto;
        font-size: 0.9rem;
        font-weight: $font-medium;
        letter-spacing: 0.008rem;
        line-height: 1.375rem;
        color: $grey-60;

        &:focus,
        &:hover {
          color: $blue-hover;
        }
      }

      &--active {
        color: $grey-30;
      }
    }
  }
}

.language-switcher-burger-menu {
  margin: 0;
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

  &__lang a {
    color: $grey-80;
    &:visited,
    &:active,
    &:focus,
    &:hover {
      color: $grey-80;
      text-decoration: underline;
    }
  }
}
</style>
