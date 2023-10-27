<template>
  <header v-if="isNewMenuAvailable" class="navigation-slice-zone-v2">
    <div class="navigation-slice-zone-v2__content">
      <div class="navigation-slice-zone-v2-content__left-side">
        <client-only>
          <burger-menu-nav-v2
            class="burger-menu-v2"
            :items="burgerMenuLinksV2"
          />
        </client-only>
        <section
          v-for="(slice, index) in logos"
          :key="`navigation-slice-left-${index}`"
        >
          <slices-logos-zone :slice="slice" :max-height="48" />
        </section>
      </div>
      <section
        v-for="(slice, index) in actions"
        :key="`navigation-slice-right-${index}`"
        class="navigation-slice-zone-v2-content__right-side"
      >
        <slices-actions-zone-v2 :slice="slice" />
      </section>
    </div>
    <section class="navigation-slice-zone-content-v2__bottom-side">
      <slices-navigation-zone-v2 :navigation-zone-items="navigation[0].items" />
    </section>
  </header>
  <header v-else class="navigation-slice-zone" role="banner">
    <client-only>
      <slide-menu width="320" class="burger-menu" :close-on-navigation="true">
        <burger-menu-nav :items="burgerMenuLinks" />
      </slide-menu>
    </client-only>
    <div class="navigation-slice-zone__content">
      <div class="navigation-slice-zone-content__left-side">
        <section
          v-for="(slice, index) in logos"
          :key="`navigation-slice-left-${index}`"
        >
          <slices-logos-zone :slice="slice" :max-height="50" />
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
import { documentFetcher } from '~/services/document-fetcher'
import SlicesNavigationZoneV2 from '~/components/slices/NavigationZoneV2.vue'
import BurgerMenuNavV2 from '~/components/BurgerMenuNavV2.vue'
import SlicesLogosZone from '~/components/slices/LogosZone.vue'
import SlicesActionsZone from '~/components/slices/ActionsZone.vue'
import SlicesNavigationZone from '~/components/slices/NavigationZone.vue'
import BurgerMenuNav from '~/components/BurgerMenuNav.vue'

export default {
  name: 'NavigationSliceZone',
  components: {
    BurgerMenuNav,
    SlicesNavigationZone,
    SlicesActionsZone,
    SlicesLogosZone,
    BurgerMenuNavV2,
    SlicesNavigationZoneV2,
  },
  data() {
    return {
      usedMainNavigation: [],
      isNewMenuAvailable: process.env.FT_IS_NEW_MENU_AVAILABLE === 'true',
    }
  },
  async fetch() {
    const mainNavigation = await documentFetcher(
      this.$prismic,
      this.$i18n
    ).findMainNavigation()

    this.usedMainNavigation = mainNavigation.data.body
  },
  computed: {
    logos() {
      const headerBlocks = this.usedMainNavigation
      return headerBlocks.filter((block) => block.slice_type === 'logos_zone')
    },

    actions() {
      const headerBlocks = this.usedMainNavigation
      return headerBlocks.filter((block) => block.slice_type === 'actions_zone')
    },

    navigation() {
      const headerBlocks = this.usedMainNavigation
      return headerBlocks.filter(
        (block) => block.slice_type === 'navigation_zone'
      )
    },

    burgerMenuLinksV2() {
      const logosZone = this.usedMainNavigation.find(
        (slice) => slice.slice_type === 'logos_zone'
      ) || { items: [] }
      const navigationZone = this.usedMainNavigation.find(
        (slice) => slice.slice_type === 'navigation_zone'
      ) || { items: [] }
      const actionsZone = this.usedMainNavigation.find(
        (slice) => slice.slice_type === 'actions_zone'
      ) || { items: [] }

      const reversedActionsZoneItems = [...actionsZone.items].reverse()

      return {
        logosZone: logosZone.items,
        navigationZone: navigationZone.items,
        actionsZone: reversedActionsZoneItems,
      }
    },

    burgerMenuLinks() {
      const logosZone = this.usedMainNavigation.find(
        (slice) => slice.slice_type === 'logos_zone'
      ) || { items: [] }
      const navigationZone = this.usedMainNavigation.find(
        (slice) => slice.slice_type === 'navigation_zone'
      ) || { items: [] }
      const actionsZone = this.usedMainNavigation.find(
        (slice) => slice.slice_type === 'actions_zone'
      ) || { items: [] }

      return {
        logosZone: logosZone.items,
        navigationZone: navigationZone.items,
        actionsZone: actionsZone.items,
      }
    },
  },
  watch: {
    '$i18n.locale': '$fetch',
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
    height: 80px;
    padding-right: 36px;
    margin-left: 80px;

    @include device-is('tablet') {
      margin-left: 112px;
    }
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
      margin: 0 5rem;
      padding-right: 0;
    }

    .navigation-slice-zone-content {
      &__left-side {
        display: flex;
      }
    }
  }
}

.navigation-slice-zone-v2 {
  box-shadow: -1px 9px 29px -16px rgba(199, 191, 199, 0.9);

  .navigation-slice-zone-v2__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    margin: 0 1rem;
  }

  .navigation-slice-zone-v2-content {
    &__bottom-side {
      border-top: 1px solid $grey-15;
      display: flex;
      justify-content: center;
    }

    &__left-side {
      display: flex;
      align-items: center;
    }
  }

  .navigation-slice-zone-content-v2__bottom-side {
    height: 4.5rem;
    padding: 0 5rem;
    border-top: 1px solid $grey-15;
    display: none;

    @include device-is('large-screen') {
      display: flex;
    }
  }

  @include device-is('large-screen') {
    .burger-menu-v2 {
      display: none;
    }

    .navigation-slice-zone-v2__content {
      justify-content: space-between;
      margin: 0 5rem;
      padding-right: 0;
    }
  }
}
</style>
