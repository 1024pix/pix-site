<template>
  <div class="nav-switch">
    <div class="nav-switch__languages">
      <language-dropdown></language-dropdown>
    </div>
    <div class="container padding-container">
      <a
        v-for="item in organizationNavItems"
        :key="item.id"
        class="text text-xs text-left text-up regular text-black"
        :href="item.primary.link.url"
      >
        {{ $prismic.richTextAsPlain(item.primary.title) }}
      </a>
    </div>
  </div>
</template>

<script>
import LanguageDropdown from '~/components/language-dropdown'
export default {
  components: {
    LanguageDropdown
  },
  props: {
    organizationNavItems: {
      type: Array,
      default: null
    }
  }
}
</script>

<style></style>
