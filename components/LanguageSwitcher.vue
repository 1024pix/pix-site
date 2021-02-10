<template>
  <div
    v-if="showLanguageDropdown && type === 'with-dropdown'"
    class="language-switcher"
  >
    <button
      class="language-switcher__button"
      :aria-label="$t('language-switcher-label')"
      aria-haspopup="true"
      :aria-expanded="showMenu.toString()"
      @click="toggleMenu()"
      @click.stop.prevent
    ></button>
    <ul v-if="showMenu" class="language-switcher__dropdown-menu">
      <li v-for="option in availableLocales" :key="option.key">
        <span
          v-if="option === currentLanguage"
          class="language-switcher__lang--active"
          >{{ option.name }}</span
        >
        <span v-else class="language-switcher__lang">
          <a href="javascript:void(0)" @click="update(option)">
            {{ option.name }}
          </a>
        </span>
      </li>
    </ul>
    <span class="separator"></span>
  </div>
  <div v-else-if="showLanguageDropdown && type === 'only-text'">
    <ul>
      <li v-for="option in availableLocales" :key="option.key">
        <span
          v-if="option !== currentLanguage"
          class="language-switcher-text__lang"
        >
          <a href="javascript:void(0)" @click="update(option)">
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
    const allLocales = this.$i18n.locales.map((locale) => {
      return { name: this.$t(locale.code), lang: locale.code }
    })
    const availableLocales = allLocales.filter(
      (locale) => locale.lang !== 'fr-fr'
    )
    return {
      showMenu: false,
      availableLocales,
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
      return this.availableLocales.find(
        (locale) => locale.lang === this.currentLocale
      )
    },
  },
  mounted() {
    const page = document.getElementsByTagName('body')[0]
    const menu = document.getElementsByClassName('language-switcher')[0]
    page.addEventListener('click', this.hideMenu)
    menu.addEventListener('keydown', this.hideMenu)
  },
  beforeDestroy() {
    const page = document.getElementsByTagName('body')[0]
    const menu = document.getElementsByClassName('language-switcher')[0]
    page.removeEventListener('click', this.hideMenu)
    menu.addEventListener('keydown', this.hideMenu)
  },
  methods: {
    update(chosenLocale) {
      this.showMenu = false
      this.$router.push('/' + chosenLocale.lang)
    },

    toggleMenu() {
      this.showMenu = !this.showMenu
    },

    hideMenu(event) {
      if (event && event.keyCode) {
        if (event.keyCode === 27) {
          this.showMenu = false
        }
      } else {
        this.showMenu = false
      }
    },
  },
}
</script>

<style lang="scss">
.language-switcher {
  display: flex;
  fill: blue;

  .separator {
    margin-left: 10px;
    border-left: 1px solid $grey-20;
    display: block;
    height: 1.5rem;
  }
}
.language-switcher__button {
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  outline: inherit;
  width: 2rem;
  height: 2rem;
  background-size: 2rem;

  padding: 4px 3px 0px 3px;
  background-image: url('/images/globe.svg');
  background-repeat: no-repeat;
}
.language-switcher__button:hover,
.language-switcher__button:focus {
  background-image: url('/images/globe-blue.svg');
}

.language-switcher__dropdown-menu {
  position: absolute;
  z-index: 5;
  float: left;
  min-width: 100px;
  padding: 5px 0;
  margin: 2px 0 0;
  margin-top: 35px;
  margin-left: -30px;

  list-style: none;
  font-size: 14px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
}

.language-switcher__dropdown-menu > li > a {
  padding: 0;
  display: block;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  color: #333333;
  white-space: nowrap;
  text-decoration: none;
}
.language-switcher__dropdown-menu > li > a:hover {
  background: #efefef;
  color: #409fcb;
}

.language-switcher__dropdown-menu > li {
  overflow: hidden;
  width: 100%;
  position: relative;
  margin: 0;
  padding: 5px 0;
}

.language-switcher__dropdown-menu > li:not(:last-child) {
  border-bottom: 1px solid $grey-20;
}

li {
  list-style: none;
}

ul li::before {
  content: '';
  margin: 0;
}
.language-switcher__lang a {
  color: $grey-200;

  &:focus,
  &:hover {
    color: $blue-hover;
  }
  &--active {
    color: $grey-40;
  }
}

.language-switcher-text__lang a {
  color: $white;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
}
</style>
