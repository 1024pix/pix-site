<template>
  <div class="navigation-slice-zone">
    <client-only>
      <push-menu width="230">
        <burger-menu-nav :items="mainNavigation.data.body[1].items" />
      </push-menu>
    </client-only>
    <section
      v-for="(slice, index) in mainNavigation.data.body"
      id="page-wrap"
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
import BurgerMenuNav from '@/components/BurgerMenuNav'

export default {
  name: 'NavigationSliceZone',
  components: {
    LogosZone,
    BurgerMenuNav,
  },
  computed: mapState(['mainNavigation']),
}
</script>

<style></style>
