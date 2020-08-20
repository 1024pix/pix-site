<template>
  <div v-if="showLanguageDropdown || frenchDomain" class="nav-switch">
    <language-dropdown />
    <div v-if="frenchDomain" class="container padding-container">
      <div
        v-for="item in organizationNavItems"
        :key="item.id"
        class="text text-xs text-left text-up regular text-black"
      >
        <pix-link :field="item.primary.link">
          {{ $prismic.asText(item.primary.title) }}
        </pix-link>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageDropdown from '~/components/language-dropdown'

export default {
  components: {
    LanguageDropdown,
  },
  props: {
    organizationNavItems: {
      type: Array,
      default: null,
    },
  },
  computed: {
    showLanguageDropdown() {
      return this.$config.languageSwitchEnabled
    },

    frenchDomain() {
      return !(this.$store.state.host === this.$config.orgDomain)
    },
  },
}
</script>

<style></style>
