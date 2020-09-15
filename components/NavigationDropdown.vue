<template>
  <div class="btn-group navigation-dropdown">
    <ul class="dropdown-menu">
      <li v-for="option in options" :key="option.key">
        <pix-link :field="option.link">
          {{ $prismic.asText(option.name) }}
        </pix-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavigationDropdown',
  props: {
    options: {
      type: [Array, Object],
      default: null,
    },
  },
  data() {
    return {
      eventListener: (event) => {
        if (!event.target.classList.contains('dropdown-toggle')) {
          this.closeDropdown()
        }
      },
    }
  },
  mounted() {
    const page = document.getElementsByTagName('body')[0]
    page.addEventListener('click', this.eventListener)
  },
  beforeDestroy() {
    const page = document.getElementsByTagName('body')[0]
    page.removeEventListener('click', this.eventListener)
  },

  methods: {
    closeDropdown() {
      this.$emit('closeNavigationDropdown')
    },
  },
}
</script>

<style scoped lang="scss">
.navigation-dropdown {
  box-shadow: 0 24px 32px 0 rgba(0, 0, 0, 0.03),
    0 8px 32px 0 rgba(0, 0, 0, 0.06);
  color: $grey-9;
  font-size: 0.875rem;
  font-weight: $font-normal;
  position: absolute;
  left: -50px;
  border-radius: 3px;
  background: $white;
  margin-top: 29px;
  min-width: 228px;
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
    color: $grey-9;
    &:hover {
      color: $blue-1;
    }
    &:visited {
      color: $grey-9;
      &:hover {
        color: $blue-1;
      }
    }
    &.nuxt-link-active {
      color: $blue-1;
    }
  }
}
</style>
