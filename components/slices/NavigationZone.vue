<template>
  <div class="navigation-zone">
    <div v-for="(menuItem, index) in slice.items" :key="`item-${index}`">
      <pix-link :field="menuItem.link" class="navigation-zone__item">
        {{ $prismic.asText(menuItem.name) }}
      </pix-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationZone',
  props: {
    slice: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped lang="scss">
.navigation-zone {
  display: none;
  justify-content: space-around;

  @include device-is('large-screen') {
    display: flex;
    width: 652px;
    align-items: center;
    height: 100%;

    &__item {
      color: $grey-9;
      font-family: $font-roboto;
      font-size: 14px;
      font-weight: 500;
      height: 22px;
      letter-spacing: 0.13px;
      line-height: 22px;
    }

    a {
      &:active,
      &:hover {
        color: $blue-1;
      }
    }
  }
}
</style>
