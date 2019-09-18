<template>
  <div class="nav-switch">
    <div class="nav-switch__languages">
      <language-dropdown></language-dropdown>
    </div>
    <div class="container padding-container">
      <a
        v-for="item in organizationNavItems"
        :key="item.id"
        class="text text-xs text-left text-up regular text-black"
        :href="item.primary.link.url"
      >
        {{ $prismic.richTextAsPlain(item.primary.title) }}
      </a>
    </div>
  </div>
</template>

<script>
import LanguageDropdown from '~/components/language-dropdown'
export default {
  components: {
    LanguageDropdown
  },
  props: {
    organizationNavItems: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss">
.nav-switch {
  display: none;
  height: 30px;
  background-color: $grey-3;

  @include device-is('tablet') {
    display: flex;
  }

  .container {
    height: 30px;
    display: flex;
    align-items: center;
    flex-flow: row;
    justify-content: flex-end;

    span,
    a {
      font-size: 12px;
    }

    a {
      margin-left: 3px;
      color: $grey-1 !important;
      margin-right: 18px;

      &:hover {
        color: $blue-1 !important;
      }
    }

    div {
      &:last-child {
        a {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
