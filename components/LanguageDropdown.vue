<template>
  <div class="language-dropdown">
    <dropdown-button
      :options="options"
      :selected="currentLanguage"
      @updateOption="languageDidChange"
    >
    </dropdown-button>
  </div>
</template>

<script>
import DropdownButton from '@/components/DropdownButton'

export default {
  name: 'LanguageDropdown',
  components: {
    DropdownButton,
  },
  data() {
    const availableLocales = this.$i18n.locales.map((locale) => {
      return { name: this.$t(locale.code), lang: locale.code }
    })
    const nonFrenchFranceLocales = availableLocales.filter(
      (locale) => locale.lang !== 'fr-fr'
    )
    return {
      nonFrenchFranceLocales,
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale || this.$i18n.defaultLocale
    },
    currentLanguage() {
      return this.nonFrenchFranceLocales.find(
        (locale) => locale.lang === this.currentLocale
      )
    },
    options() {
      return this.nonFrenchFranceLocales.filter(
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
