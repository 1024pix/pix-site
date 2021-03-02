<template>
  <ul class="burger-menu-nav__items">
    <li
      v-for="item in items"
      :key="item.id"
      class="burger-menu-nav-items__link"
      :class="
        isAction
          ? 'burger-menu-nav-items__link--action'
          : 'burger-menu-nav-items__link--link'
      "
    >
      <pix-link :field="item.link">
        {{ $prismic.asText(item.name) }}
      </pix-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BurgerMenuNavItems',
  props: {
    items: {
      type: Array,
      default: null,
    },
    isAction: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.burger-menu-nav {
  &__items {
    margin: 24px 0 0 0;
    padding: 0;
    list-style: none;

    &:last-child {
      margin-top: 8px;
    }
  }
}

.burger-menu-nav-items {
  &__link {
    padding-left: 0;
    font-weight: 600;
    color: $white;
    text-align: left;
    margin-bottom: 24px;

    &::before {
      display: none;
    }

    a {
      display: block;
      transition: 0.3s;
      font-size: 1rem;
      line-height: 1.5rem;
      color: $grey-60;

      &:hover {
        text-decoration: underline;
      }
    }

    &--link {
      &:last-child {
        & > a {
          width: 256px;
          padding-top: 12px;
          border-top: 1px solid $grey-20;
        }
      }
    }

    &--action {
      & > a {
        color: $blue;
      }

      &:last-child {
        transition: all 0.5s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 225px;
        height: 44px;
        background: $blue;
        border-radius: 4px;
        color: $white;

        & > a {
          color: $white;
        }

        &:hover {
          transition: all 0.5s ease;
          transform: scale(1.03);
        }
      }
    }
  }

  &:last-child {
    margin: 0;
  }
}
</style>
