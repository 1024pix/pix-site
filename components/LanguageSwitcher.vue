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
          class="language-switcher__lang--active"
          >{{ option.name }}</span
        >
        <span v-else class="language-switcher__lang">
          <a :href="'/' + option.lang">
            {{ option.name }}
          </a>
        </span>
      </li>
    </ul>
    <span class="separator"></span>
  </div>
  <div v-else-if="showLanguageDropdown && type === 'only-text'">
    <ul>
      <li v-for="option in languageLocales" :key="option.key">
        <span
          v-if="option !== currentLanguage"
          class="language-switcher-text__lang"
        >
          <a :href="'/' + option.lang" @click="update(option)">
            {{ option.name }}
          </a>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LanguageSwitcher',
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
        process.env.isPixSite &&
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

<style lang="scss">
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
    font-size: 0.9rem;
    font-weight: $font-medium;
    color: $grey-50;
    letter-spacing: 0.13px;
    line-height: 22px;
    border: none;
    outline: inherit;
    height: 1.5rem;
    background-size: 1.5rem;
    padding: 4px 3px 0 30px;
    cursor: pointer;
    background-image: url('/images/globe.svg');
    background-repeat: no-repeat;
    &:hover,
    &:focus {
      color: $blue;
      background-image: url('/images/globe-blue.svg');
    }
  }
  &__dropdown-menu {
    position: absolute;
    z-index: 5;
    float: left;
    min-width: 120px;
    padding: 5px 0;
    margin: 35px 0 0 0px;

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
  &__lang a {
    color: $grey-200;

    &:focus,
    &:hover {
      color: $blue-hover;
    }
    &--active {
      color: $grey-40;
    }
  }
  &-text__lang a {
    color: $white;

    &:focus,
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
