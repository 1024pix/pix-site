<template>
  <div v-if="showLanguageDropdown" class="language-switcher">
    <button
      class="language-switcher__button"
      aria-label="$t('language-switcher-label')"
      aria-haspopup="true"
      aria-expanded="false"
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
  </div>
</template>

<script>
export default {
  name: 'LanguageSwitcher',
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

  methods: {
    update(chosenLocale) {
      this.showMenu = false
      this.$router.push('/' + chosenLocale.lang)
    },

    toggleMenu() {
      this.showMenu = !this.showMenu
    },
  },
}
</script>

<style lang="scss">
.language-switcher {
  display: flex;
  width: 2rem;
  fill: blue;

  .dropdown-toggle {
    color: #636b6f;
    min-width: 160px;
    padding: 3px;
    text-transform: none;
    font-weight: 300;
    margin-bottom: 7px;
    border: 0;
    transition: background 0s ease-out;
    float: none;
    box-shadow: none;
    border-radius: 0;
  }
  .dropdown-toggle:hover {
    background: #e1e1e1;
    cursor: pointer;
  }

  .dropdown-menu {
    position: absolute;
    z-index: 1000;
    float: left;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    margin-top: 40px;

    list-style: none;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    background-clip: padding-box;
  }

  .dropdown-menu > li > a {
    padding: 0;
    display: block;
    clear: both;
    font-weight: normal;
    line-height: 1.6;
    color: #333333;
    white-space: nowrap;
    text-decoration: none;
  }
  .dropdown-menu > li > a:hover {
    background: #efefef;
    color: #409fcb;
  }

  .dropdown-menu > li {
    overflow: hidden;
    width: 100%;
    position: relative;
    margin: 0;
  }

  .caret {
    width: 0;
    position: relative;
    top: 10px;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-top: 4px solid \9;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    float: right;
  }

  li {
    list-style: none;
  }

  ul li::before {
    content: '';
    margin: 0;
  }
}
</style>
