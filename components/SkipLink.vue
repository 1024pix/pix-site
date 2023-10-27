<template>
  <pix-link class="skip-link" href="#main"> {{ $t('skip-link') }}</pix-link>
</template>

<script>
import PixLink from '~/components/PixLink.vue'

export default {
  name: 'SkipLink',
  components: { PixLink },
}
</script>

<style scoped lang="scss">
.skip-link {
  position: absolute;
  z-index: 1;
  margin: 8px;
  padding: 0.5em;
  color: $white;
  background-color: $blue;
  transform: translateY(calc(-100% - 16px));
  transition: transform 0.3s;

  &:focus,
  &:active {
    transform: translateY(0);
  }
}
</style>
