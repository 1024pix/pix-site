<template>
  <header class="navigation-slice-zone" role="banner">
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

export default {
  name: 'NavigationSliceZone',
  data() {
    return {
      usedMainNavigation: null,
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

    burgerMenuLinks() {
      const navigationZone = this.usedMainNavigation.find(
        (slice) => slice.slice_type === 'navigation_zone'
      )
      const actionsZone = this.usedMainNavigation.find(
        (slice) => slice.slice_type === 'actions_zone'
      )
      return {
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
      margin: 0 4vw;
      padding-right: 0;
    }

    .navigation-slice-zone-content {
      &__left-side {
        display: flex;
      }
    }
  }
}
</style>
