<template>
  <div v-if="organizationNavItems.length > 1" class="nav-switch">
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
export default {
  props: {
    organizationNavItems: {
      type: Array,
      default: null
    }
  }
}
</script>

<style></style>
