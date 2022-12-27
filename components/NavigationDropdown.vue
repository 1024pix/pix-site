<template>
  <div class="btn-group navigation-dropdown">
    <ul class="dropdown-menu">
      <pix-prismic-link
        v-for="option in options"
        :key="option.key"
        :field="option.link"
      >
        <li>
          {{ $prismic.asText(option.name) }}
        </li>
      </pix-prismic-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavigationDropdown',
  props: {
    dropdownIndex: {
      type: String,
      default: null,
    },
    options: {
      type: [Array, Object],
      default: null,
    },
  },
}
</script>

<style scoped lang="scss">
.navigation-dropdown {
  box-shadow: 0 24px 32px 0 rgba(0, 0, 0, 0.03),
    0 8px 32px 0 rgba(0, 0, 0, 0.06);
  color: $grey-60;
  font-size: 0.875rem;
  font-weight: $font-medium;
  letter-spacing: 0.009rem;
  position: absolute;
  border-radius: 3px;
  background: $white;
  margin-top: 8px;
  min-width: 232px;
  z-index: 1;

  ul,
  li {
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-align: left;

    &::before {
      content: '';
      margin-right: 0;
    }
  }

  li {
    padding: 12px 16px;
    border-bottom: 1px solid $grey-20;

    &:last-of-type {
      border: none;
    }
  }

  a {
    color: $grey-60;
    &:hover {
      color: $blue;
    }
    &:visited {
      color: $grey-60;
      &:hover {
        color: $blue;
      }
    }
    &.nuxt-link-active {
      color: $blue;
    }
  }
}
</style>
