<template>
  <header class="navigation-slice-zone">
    <client-only>
      <slide-menu width="320" class="burger-menu">
        <burger-menu-nav :items="burgerMenuLinks" />
      </slide-menu>
    </client-only>
    <div class="navigation-slice-zone__content">
      <div class="navigation-slice-zone-content__left-side">
        <section
          v-for="(slice, index) in logos"
          :key="`navigation-slice-left-${index}`"
        >
          <slices-logos-zone :slice="slice" />
        </section>
      </div>
      <section
        v-for="(slice, index) in actions"
        :key="`navigation-slice-right-${index}`"
        class="navigation-slice-zone-content__right-side"
      >
        <slices-actions-zone :slice="slice" />
      </section>
    </div>
    <section class="navigation-slice-zone-content__bottom-side">
      <slices-navigation-zone :navigation-zone-items="navigation" />
    </section>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import { keyBy } from '~/services/key-by'

export default {
  name: 'NavigationSliceZone',
  computed: {
    isPixPro() {
      return process.env.isPixPro
    },
    ...mapState(['mainNavigations']),

    usedMainNavigation() {
      const mainNavBySite = keyBy(
        this.mainNavigations,
        (mainNav) => mainNav?.data?.navigation_for
      )
      if (this.isPixPro && mainNavBySite['pix-pro']) {
        return mainNavBySite['pix-pro']
      }
      return mainNavBySite['pix-site']
    },

    logos() {
      const headerBlocks = this.usedMainNavigation.data.body
      return headerBlocks.filter((block) => block.slice_type === 'logos_zone')
    },

    actions() {
      const headerBlocks = this.usedMainNavigation.data.body
      return headerBlocks.filter((block) => block.slice_type === 'actions_zone')
    },

    navigation() {
      const headerBlocks = this.usedMainNavigation.data.body
      return headerBlocks.filter(
        (block) => block.slice_type === 'navigation_zone'
      )
    },

    burgerMenuLinks() {
      const navigationZone = this.usedMainNavigation.data.body.find(
        (slice) => slice.slice_type === 'navigation_zone'
      )
      const actionsZone = this.usedMainNavigation.data.body.find(
        (slice) => slice.slice_type === 'actions_zone'
      )
      return {
        navigationZone: navigationZone.items,
        actionsZone: actionsZone.items,
      }
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

  .navigation-slice-zone__content {
    display: flex;
    justify-content: space-between;
    margin-left: 100px;
    height: 80px;
  }

  .navigation-slice-zone-content__bottom-side {
    border-top: 1px solid $grey-15;
    display: flex;
    justify-content: center;
  }

  @include device-is('large-screen') {
    .burger-menu {
      display: none;
    }

    .navigation-slice-zone__content {
      justify-content: space-between;
      margin: 0 4vw;
    }

    .navigation-slice-zone-content {
      &__left-side {
        display: flex;
      }
    }
  }
}
</style>
