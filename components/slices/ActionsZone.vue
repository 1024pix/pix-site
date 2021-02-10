<template>
  <div class="actions-zone">
    <language-switcher />

    <div v-for="(menuItem, index) in slice.items" :key="`item-${index}`">
      <pix-link
        :field="menuItem.link"
        class="actions-zone__item"
        :class="{
          button: menuItem.style === 'button',
          link: menuItem.style === 'link',
        }"
      >
        {{ $prismic.asText(menuItem.name) }}
      </pix-link>
    </div>
  </div>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default {
  name: 'ActionsZone',
  components: {
    LanguageSwitcher,
  },
  props: {
    slice: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped lang="scss">
.actions-zone {
  display: none;
  margin-left: 22px;

  @include device-is('large-screen') {
    display: flex;
    align-items: center;
    height: 100%;

    & > div {
      margin-right: 16px;

      &:last-of-type {
        margin-right: 0;
      }
    }

    &__item {
      font-size: 0.875rem;
      color: $grey-50;
      font-family: $font-roboto;
      font-weight: $font-medium;
      letter-spacing: 0.13px;
      line-height: 22px;

      &.link:hover {
        color: $blue;
      }

      &.button {
        color: $white;
        height: 36px;
      }
    }
  }
}
</style>
