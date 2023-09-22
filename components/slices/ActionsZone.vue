<template>
  <nav class="actions-zone">
    <locale-switcher></locale-switcher>
    <ul>
      <li v-for="(menuItem, index) in slice.items" :key="`item-${index}`">
        <nuxt-link
          :to="menuItem.link"
          class="actions-zone__item"
          :class="{
            'button button--with-border-focus': menuItem.style === 'button',
            link: menuItem.style === 'link',
          }"
        >
          <img
            v-if="menuItem.icon"
            :src="`/images/${menuItem.icon}`"
            class="actions-zone__item__icon"
            alt
            role="presentation"
            width="23"
            height="22"
          />
          {{ $prismic.asText(menuItem.name) }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "SlicesActionsZone",
  props: {
    slice: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped lang="scss">
.actions-zone {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 5px;

  ul {
    list-style: none;
    display: flex;
    padding-left: 0;

    @include device-is("tablet") {
      padding-left: 10px;
    }

    li::before {
      content: none;
    }
    li {
      align-self: center;
      display: flex;
    }
  }

  &__item {
    font-size: 0;
    color: $grey-60;
    font-family: $font-roboto;
    font-weight: $font-medium;
    letter-spacing: 0.008rem;
    line-height: 1.375rem;
    display: inline-flex;
    align-items: center;

    @include device-is("tablet") {
      font-size: 0.875rem;
    }

    &__icon {
      margin-right: 5px;
    }

    &.link:hover {
      color: $blue;
    }

    &.button {
      display: none;
    }
  }

  @include device-is("large-screen") {
    &__item {
      &.button {
        display: flex;
        color: $white;
        height: 36px;
      }
    }
  }
}
</style>
