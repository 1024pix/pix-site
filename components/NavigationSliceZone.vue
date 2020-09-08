<template>
  <div class="navigation-slice-zone">
    <section
      v-for="(slice, index) in slices"
      :key="`navigation-slice-${index}`"
    >
      <template v-if="slice.slice_type === 'logos_zone'">
        <logos-zone :slice="slice" />
      </template>
    </section>
  </div>
</template>

<script>
import LogosZone from '@/components/slices/LogosZone'

export default {
  name: 'NavigationSliceZone',
  components: {
    LogosZone,
  },
  props: {
    slices: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style></style>
