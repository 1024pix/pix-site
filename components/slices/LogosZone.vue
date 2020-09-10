<template>
  <div class="logos-zone">
    <div
      v-for="(logo, index) in slice.items"
      :key="`logo-${index}`"
      class="logos-zone__content"
    >
      <prismic-image :field="logo.image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogosZone',
  props: {
    slice: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped lang="scss">
.logos-zone {
  display: flex;
  justify-content: flex-end;
  margin-right: 64px;

  .logos-zone__content {
    margin-right: 24px;

    img {
      height: 50px;
      margin: 15px 0 15px 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
  @include device-is('desktop') {
    justify-content: flex-start;
  }
}
</style>
