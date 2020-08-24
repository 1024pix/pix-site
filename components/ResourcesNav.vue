<template>
  <div class="resources-nav">
    <h4 class="text text-sm text-up text-left text-black mb-2 semi-bold">
      {{ $t('resources-title') }}
    </h4>
    <ul class="unstyled">
      <li v-for="(item, index) in resourcesNavItems" :key="`item-${index}`">
        <pix-link
          :field="item.primary.link"
          class="text text-xs text-left regular text-black-l"
        >
          {{ $prismic.asText(item.primary.title) }}
        </pix-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ResourcesNav',
  computed: mapState(['resourcesNavItems']),
}
</script>

<style scoped></style>
