<template>
  <div class="logos-zone">
    <div v-for="(logo, index) in slice.items" :key="`logo-${index}`" class="logos-zone__content">
      <nuxt-link v-if="hasLink(logo)" :to="logo.url.url">
        <img :src="logo.image.url" :alt="logo.image.alt" />
      </nuxt-link>
      <img v-else :src="logo.image.url" :alt="logo.image.alt" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  slice: {
    type: Object,
    default: null,
  },
  maxHeight: {
    type: Number,
    default: undefined,
  },
});

function hasLink(item) {
  return item.url.link_type !== 'Any';
}
</script>

<style scoped lang="scss">
.logos-zone {
  display: flex;
  justify-content: flex-end;

  .logos-zone__content {
    margin-right: 12px;

    @include device-is('large-screen') {
      margin-right: 24px;
    }

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

  @include device-is('large-screen') {
    margin-right: 40px;
  }
}
</style>
