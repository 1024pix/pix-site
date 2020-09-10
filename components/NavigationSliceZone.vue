<template>
  <div class="navigation-slice-zone">
    <section
      v-for="(slice, index) in mainNavigation.data.body"
      :key="`navigation-slice-${index}`"
    >
      <template v-if="slice.slice_type === 'logos_zone'">
        <logos-zone :slice="slice" />
      </template>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LogosZone from '@/components/slices/LogosZone'

export default {
  name: 'NavigationSliceZone',
  components: {
    LogosZone,
  },
  computed: mapState(['mainNavigation']),
}
</script>

<style></style>
