<template>
  <div v-if="availableLocale.length > 1" class="language-dropdown">
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
  data() {
    const availableLocale = this.$i18n.locales.map((locale) => {
      return { name: this.$t(locale.code), lang: locale.code }
    })
    return {
      availableLocale
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale || this.$i18n.defaultLocale
    },
    currentLanguage() {
      return this.availableLocale.find(
        (locale) => locale.lang === this.currentLocale
      )
    },
    options() {
      return this.availableLocale.filter(
        (locale) => locale.lang !== this.currentLocale
      )
    }
  },

  methods: {
    languageDidChange(selectedLocale) {
      this.$i18n.setLocale(selectedLocale.lang)
      const page = this.switchLocalePath()
      this.$router.push(page)
    }
  }
}
</script>

<style lang="scss"></style>
