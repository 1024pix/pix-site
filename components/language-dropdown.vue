<template>
  <div
    v-if="
      availableLocale.length > 1 &&
      $config.languageSwitchEnabled &&
      $config.isOrgDomainExtension
    "
    class="language-dropdown"
  >
    <dropdown-button
      :options="options"
      :selected="currentLanguage"
      @updateOption="languageDidChange"
    >
    </dropdown-button>
  </div>
</template>

<script>
import DropdownButton from '~/components/dropdown-button'

export default {
  name: 'LanguageDropdown',
  components: {
    DropdownButton,
  },
  data() {
    const availableLocales = this.$i18n.locales.map((locale) => {
      return { name: this.$t(locale.code), lang: locale.code }
    })
    return {
      availableLocales,
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale || this.$i18n.defaultLocale
    },
    currentLanguage() {
      return this.availableLocales.find(
        (locale) => locale.lang === this.currentLocale
      )
    },
    options() {
      return this.availableLocales.filter(
        (locale) => locale.lang !== this.currentLocale
      )
    },
  },
  methods: {
    languageDidChange(selectedLocale) {
      this.$i18n.setLocale(selectedLocale.lang)
      const page = this.switchLocalePath(selectedLocale.lang)
      this.$router.push(page)
    },
  },
}
</script>

<style lang="scss"></style>
