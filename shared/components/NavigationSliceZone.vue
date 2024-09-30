<template>
  <header class="navigation-slice-zone">
    <div class="navigation-slice-zone__content">
      <div class="navigation-slice-zone-content__left-side">
        <burger-menu class="burger-menu" :items="burgerMenuLinks()" />
        <section v-for="(slice, index) in logos" :key="`navigation-slice-left-${index}`">
          <slices-logos-zone :slice="slice" :max-height="48" />
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
      <slices-navigation-zone :navigation-zone-items="navigation[0].items" />
    </section>
  </header>
</template>

<script setup>
const appConfig = useAppConfig();
const { locale: i18nLocale } = useI18n();
const { client, filter } = usePrismic();

const { data: mainNav } = await useAsyncData(async () => {
  const { results: nav } = await client.getByType('main_navigation_v2', {
    filters: [filter.at('my.main_navigation_v2.navigation_for', appConfig.site)],
    lang: i18nLocale.value,
  });

  return nav[0].data.body;
});

const logos = mainNav.value.filter(block => block.slice_type === 'logos_zone');

const actions = mainNav.value.filter(block => block.slice_type === 'actions_zone');

const navigation = mainNav.value.filter(block => block.slice_type === 'navigation_zone');

const burgerMenuLinks = () => {
  const logosZone = mainNav.value.find(slice => slice.slice_type === 'logos_zone') || { items: [] };
  const navigationZone = mainNav.value.find(slice => slice.slice_type === 'navigation_zone') || { items: [] };
  const actionsZone = mainNav.value.find(slice => slice.slice_type === 'actions_zone') || { items: [] };

  const reversedActionsZoneItems = [...actionsZone.items].reverse();

  return {
    logosZone: logosZone.items,
    navigationZone: navigationZone.items,
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
