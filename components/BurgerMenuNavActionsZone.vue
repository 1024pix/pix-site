<template>
  <ul class="burger-menu-nav-actions-zone">
    <li
      v-for="(item, index) in actions"
      :key="`action-${index}`"
      class="burger-menu-nav-actions-zone__item"
    >
      <pix-prismic-link
        :field="item.link"
        class="burger-menu-nav-actions-zone-item__link"
        :class="{
          'button button--with-border-focus': item.style === 'button',
          link: item.style === 'link',
        }"
      >
        <img
          v-if="item.icon"
          :src="`/images/${item.icon}`"
          class="burger-menu-nav-actions-zone-item__icon"
          alt=""
          role="presentation"
          width="15"
          height="14"
        />
        {{ $prismic.asText(item.name) }}
      </pix-prismic-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BurgerMenuNavActionsZone',
  props: {
    actions: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.burger-menu-nav-actions-zone {
  padding: 1.5rem 2rem 1rem 2rem;
  margin: 0;

  &__item {
    width: 100%;
    padding: 0 0 0.5rem 0;
  }
}

.burger-menu-nav-actions-zone-item {
  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: $font-medium;
    letter-spacing: 0.008rem;
    line-height: 1.375rem;
    color: $grey-90;
    border-radius: 0.25rem;
    width: 100%;

    &.link {
      border: 1px solid $grey-60;

      img {
        margin-right: 0.313rem;
      }

      &:hover {
        color: $white;
        background-color: $grey-60;

        img {
          filter: brightness(0) invert(1);
        }
      }

      &:focus {
        color: $white;
        background-color: $grey-90;
        border: 1px solid $grey-90;
        outline: 1px solid $white;
        outline-offset: -4px;

        img {
          filter: brightness(0) invert(1);
        }
      }
    }

    &.button {
      display: flex;
      color: $white;
    }
  }
}
</style>
