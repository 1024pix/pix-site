<template>
  <div class="nav-switch">
    <language-dropdown />
    <div class="container padding-container">
      <div
        v-for="item in organizationNavItems"
        :key="item.id"
        class="text text-xs text-left text-up regular text-black"
      >
        <pix-link :field="item.primary.link">
          {{ $prismic.richTextAsPlain(item.primary.title) }}
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
}
</script>

<style></style>
