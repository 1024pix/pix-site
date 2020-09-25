<template>
  <div v-if="showLanguageDropdown || isPixPro" class="organization-nav">
    <div class="nav-switch">
      <language-dropdown />
      <div v-if="isPixPro" class="nav-switch__container">
        <div
          v-for="item in organizationNavItems"
          :key="item.id"
          class="text text-xs text-left text-up regular text-black"
        >
          <pix-link :field="item.primary.link">
            {{ $prismic.asText(item.primary.title) }}
          </pix-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageDropdown from '@/components/LanguageDropdown'

export default {
  components: {
    LanguageDropdown,
  },
  props: {
    organizationNavItems: {
      type: Array,
      default: null,
    },
  },
  computed: {
    showLanguageDropdown() {
      return this.$config.languageSwitchEnabled
    },

    isPixPro() {
      return !process.env.isPixSite
    },
  },
}
</script>

<style scoped lang="scss">
.organization-nav {
  display: grid;
  grid-template-columns: 1.2fr repeat(12, 1fr) 1.2fr;
  background-color: $grey-3;
}

.nav-switch {
  display: none;
  height: 30px;

  @include device-is('large-screen') {
    display: flex;
    grid-column: 2 / span 12;
  }

  &__container {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    span,
    a {
      font-size: 12px;
    }

    a {
      margin-left: 3px;
      color: $grey-1;
      margin-right: 18px;

      &:hover {
        color: $blue-1;
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
