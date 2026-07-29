<template>
  <header class="navigation-slice-zone">
    <template v-if="data">
      <div class="navigation-slice-zone__content">
        <div class="navigation-slice-zone-content__left-side">
          <burger-menu class="burger-menu" :items="burgerMenuLinks(data)" />

          <section v-for="(slice, index) in data.logos" :key="`navigation-slice-left-${index}`">
            <slices-logos-zone :slice="slice" :max-height="48" />
          </section>
        </div>
        <section
          v-for="(slice, index) in data.actions"
          :key="`navigation-slice-right-${index}`"
          class="navigation-slice-zone-content__right-side"
        >
          <slices-actions-zone :slice="slice" />
        </section>
      </div>
      <section class="navigation-slice-zone-content__bottom-side">
        <slices-navigation-zone :navigation-zone-items="data.navigation[0].items" />
      </section>
    </template>
  </header>
</template>

<script setup>
const appConfig = useAppConfig();
const { locale: i18nLocale } = useI18n();
const { client, filter } = usePrismic();

const { data } = await useAsyncData(async () => {
  try {
    const document = await client.getFirst({
      filters: [
        filter.at('document.type', 'main_navigation_v2'),
        filter.at('my.main_navigation_v2.navigation_for', appConfig.site),
      ],
      lang: i18nLocale.value,
    });

    const mainNav = document.data.body;

    const logos = mainNav.filter(block => block.slice_type === 'logos_zone');
    const actions = mainNav.filter(block => block.slice_type === 'actions_zone');
    const navigation = mainNav.filter(block => block.slice_type === 'navigation_zone');
    const navigationSlices = { logos, actions, navigation };
    return navigationSlices;
  } catch (err) {
    console.warn(err);
  }
});

const burgerMenuLinks = (navigationSlices) => {
  const logosZoneItems = navigationSlices.logos[0]?.items ?? [];
  const navigationZoneItems = navigationSlices.navigation[0]?.items ?? [];
  const actionsZoneItems = navigationSlices.actions[0]?.items ?? [];
  const reversedActionsZoneItems = [...actionsZoneItems].reverse();

  return {
    logosZone: logosZoneItems,
    navigationZone: navigationZoneItems,
    actionsZone: reversedActionsZoneItems,
  };
};
</script>

<style lang="scss">
.navigation-slice-zone {
  box-shadow: -1px 9px 29px -16px rgba(199, 191, 199, 0.9);

  .navigation-slice-zone__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    margin: 0 1rem;
  }

  .navigation-slice-zone-content {
    &__bottom-side {
      border-top: 1px solid $grey-15;
    }

    &__left-side {
      display: flex;
      align-items: center;
    }
  }

  .navigation-slice-zone-content__bottom-side {
    position: relative;
    height: 4.5rem;
    padding: 0 5rem;
    border-top: 1px solid $grey-15;
    display: none;

    @include device-is('large-screen') {
      display: flex;
    }
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
  }
}
</style>
