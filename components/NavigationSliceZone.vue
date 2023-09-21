<template>
  <header class="navigation-slice-zone" role="banner">
    <!-- <slide-menu width="320" class="burger-menu" :close-on-navigation="true">
      <burger-menu-nav :items="burgerMenuLinks" />
    </slide-menu> -->
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

<script setup>
const { client } = usePrismic();
const { locale: i18nLocale } = useI18n();

const { data } = await useAsyncData(async () => {
  let navs = await client.getAllByType("main_navigation", {
    lang: i18nLocale.value,
  });

  const menu = navs.find((nav) => {
    return nav.data.navigation_for === "pix-site";
  });

  return menu;
});

const logos = data.value.data.body.filter(
  (block) => block.slice_type === "logos_zone"
);

const actions = data.value.data.body.filter(
  (block) => block.slice_type === "actions_zone"
);

const navigation = data.value.data.body.filter(
  (block) => block.slice_type === "navigation_zone"
);
</script>

<style lang="scss">
.navigation-slice-zone {
  box-shadow: -1px 9px 29px -16px rgba(199, 191, 199, 0.9);
  position: relative;

  .burger-menu {
    display: block;
  }

  .navigation-slice-zone__content {
    display: flex;
    justify-content: space-between;
    height: 80px;
    padding-right: 36px;
    margin-left: 80px;

    @include device-is("tablet") {
      margin-left: 112px;
    }
  }

  .navigation-slice-zone-content__bottom-side {
    border-top: 1px solid $grey-15;
    display: flex;
    justify-content: center;
  }

  @include device-is("large-screen") {
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
