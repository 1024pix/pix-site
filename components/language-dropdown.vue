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
import DropdownButton from '~/components/dropdown-button'
export default {
  name: 'LanguageDropdown',
  components: {
    DropdownButton
  },
  computed: {
    options() {
      const availableLocale = [
        { name: 'Français', lang: 'fr-fr' },
        { name: 'English', lang: 'en-gb' }
      ]
      const currentLocale = this.$i18n.locale || this.$i18n.defaultLocale

      const selectableLocale = availableLocale.filter(
        (locale) => locale.lang !== currentLocale
      )
      return selectableLocale
    }
  },
  data() {
    const availableLocale = [
      { name: 'Français', lang: 'fr-fr' },
      { name: 'English', lang: 'en-gb' }
    ]
    const currentLocale = this.$i18n.locale || this.$i18n.defaultLocale

    const currentLanguage = availableLocale.find(
      (locale) => locale.lang === currentLocale
    )
    return {
      currentLanguage
    }
  },

  methods: {
    languageDidChange(selectedLocale) {
      const page = this.switchLocalePath(selectedLocale.lang)
      this.$router.push(page)
    }
  }
}
</script>

<style lang="scss"></style>
