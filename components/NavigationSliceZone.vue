<template>
  <div class="navigation-slice-zone">
    <client-only>
      <push-menu width="230">
        <burger-menu-nav :items="burgerMenuLinks" />
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
      <template v-if="slice.slice_type === 'navigation_zone'">
        <navigation-zone :slice="slice" />
      </template>
      <template v-if="slice.slice_type === 'actions_zone'">
        <actions-zone :slice="slice" />
      </template>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LogosZone from '@/components/slices/LogosZone'
import NavigationZone from '@/components/slices/NavigationZone'
import ActionsZone from '@/components/slices/ActionsZone'
import BurgerMenuNav from '@/components/BurgerMenuNav'

export default {
  name: 'NavigationSliceZone',
  components: {
    ActionsZone,
    LogosZone,
    NavigationZone,
    BurgerMenuNav,
  },
  computed: {
    ...mapState(['mainNavigation']),
    burgerMenuLinks() {
      const navigationZone = this.mainNavigation.data.body.find(
        (slice) => slice.slice_type === 'navigation_zone'
      )
      const actionsZone = this.mainNavigation.data.body.find(
        (slice) => slice.slice_type === 'actions_zone'
      )
      return [...navigationZone.items, ...actionsZone.items]
    },
  },
}
</script>

<style lang="scss">
.navigation-slice-zone {
  display: flex;
  justify-content: flex-end;

  @include device-is('large-screen') {
    justify-content: center;
    margin: 0 98px;
  }
}
</style>
