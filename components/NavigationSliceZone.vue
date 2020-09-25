<template>
  <div class="navigation-slice-zone">
    <client-only>
      <push-menu width="230" class="burger-menu">
        <burger-menu-nav :items="burgerMenuLinks" />
      </push-menu>
    </client-only>
    <div id="page-wrap">
      <organization-nav :organization-nav-items="organizationNavItems" />
      <div class="navigation-slice-zone__wrapper">
        <div class="navigation-slice-zone__content">
          <div class="navigation-slice-zone-content__left-side">
            <section
              v-for="(slice, index) in mainNavigation.data.body"
              :key="`navigation-slice-left-${index}`"
            >
              <template v-if="slice.slice_type === 'logos_zone'">
                <logos-zone :slice="slice" />
              </template>
              <template v-if="slice.slice_type === 'navigation_zone'">
                <navigation-zone :slice="slice" />
              </template>
            </section>
          </div>
          <section
            v-for="(slice, index) in mainNavigation.data.body"
            :key="`navigation-slice-right-${index}`"
            class="navigation-slice-zone-wrapper__right-side"
          >
            <template v-if="slice.slice_type === 'actions_zone'">
              <actions-zone :slice="slice" />
            </template>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LogosZone from '@/components/slices/LogosZone'
import NavigationZone from '@/components/slices/NavigationZone'
import ActionsZone from '@/components/slices/ActionsZone'
import BurgerMenuNav from '@/components/BurgerMenuNav'
import OrganizationNav from '~/components/OrganizationNav'

export default {
  name: 'NavigationSliceZone',
  components: {
    ActionsZone,
    LogosZone,
    NavigationZone,
    BurgerMenuNav,
    OrganizationNav,
  },
  computed: {
    ...mapState(['mainNavigation', 'organizationNavItems']),
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
  box-shadow: -1px 9px 29px -16px rgba(199, 191, 199, 0.9);

  .burger-menu {
    display: block;
  }

  .navigation-slice-zone__wrapper {
    display: grid;
    grid-template-columns: 1.2fr repeat(12, 1fr) 1.2fr;
  }

  .navigation-slice-zone__content {
    display: flex;
    justify-content: flex-end;
    height: 80px;
    grid-column: 2 / span 12;
  }

  @include device-is('large-screen') {
    .burger-menu {
      display: none;
    }

    .navigation-slice-zone__content {
      justify-content: space-between;
    }

    .navigation-slice-zone-content {
      &__left-side {
        display: flex;
      }
    }
  }
}
</style>
