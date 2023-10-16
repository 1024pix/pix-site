<template>
  <nav class="navigation-zone" role="navigation">
    <ul>
      <li
        v-for="(menuItem, index) in navigationLinks"
        :key="`item-${index}`"
        class="navigation-zone-block"
        :class="{ 'navigation-separator': menuItem === SEPARATOR }"
      >
        <template v-if="menuItem !== SEPARATOR">
          <div v-if="menuItem.children && menuItem.children.length > 0">
            <button
              :dropdown-index="`${index}`"
              class="dropdown-toggle navigation-zone__item links-group"
              :class="{
                'current-active-link': subIsActive(menuItem.children),
              }"
              @click="toggleDropdown(`${index}`)"
              @click.stop.prevent
            >
              {{ menuItem.name }}
              <fa v-if="isOpenDropdown(`${index}`)" icon="angle-up" />
              <fa v-else icon="angle-down" />
            </button>
            <navigation-dropdown
              v-show="isOpenDropdown(`${index}`)"
              type="button"
              :options="menuItem.children"
              :dropdown-index="`${index}`"
            >
            </navigation-dropdown>
          </div>
          <pix-prismic-link
            v-else
            :field="menuItem.link"
            class="navigation-zone__item"
          >
            {{ $prismic.asText(menuItem.name) }}
          </pix-prismic-link>
        </template>
      </li>
    </ul>
  </nav>
</template>

<script>
const SEPARATOR = Symbol('SEPARATOR')

export default {
  name: 'SlicesNavigationZone',
  props: {
    navigationZoneItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      openDropdownIndex: undefined,
      SEPARATOR,
    }
  },
  computed: {
    navigationLinks() {
      if (this.navigationZoneItems.length === 0) {
        return null
      }

      return this.navigationZoneItems
        .map(({ items: navItems }) =>
          navItems.reduce((navGroup, navItem) => {
            if (navItem.group.length > 0) {
              const groupName = navItem.group[0].text
              const prevNavItem = navGroup[navGroup.length - 1]

              if (prevNavItem?.name === groupName) {
                prevNavItem.children.push(navItem)
                return navGroup
              }

              return [...navGroup, { name: groupName, children: [navItem] }]
            }

            return [...navGroup, navItem]
          }, [])
        )
        .reduce((prevNavGroup, nextNavGroup) => [
          ...prevNavGroup,
          SEPARATOR,
          ...nextNavGroup,
        ])
    },
  },
  mounted() {
    const page = document.getElementsByTagName('body')[0]
    page.addEventListener('click', this.toggleDropdown)
  },
  beforeDestroy() {
    const page = document.getElementsByTagName('body')[0]
    page.removeEventListener('click', this.toggleDropdown)
  },
  methods: {
    isOpenDropdown(dropdownIndex) {
      return this.openDropdownIndex === dropdownIndex
    },
    toggleDropdown(dropdownIndex) {
      if (this.isOpenDropdown(dropdownIndex)) {
        this.openDropdownIndex = undefined
      } else {
        this.openDropdownIndex = dropdownIndex
      }
    },
    subIsActive(subNavigationLinks) {
      const currentPath = this.$route.path
      const subLinksUrls = subNavigationLinks.map((link) => link.link.url)

      const isHomePage = currentPath === '/'
      if (isHomePage) return false

      return subLinksUrls.find((link) => {
        return link.endsWith(currentPath) || link.endsWith(currentPath + '/')
      })
    },
  },
}
</script>

<style scoped lang="scss">
@mixin active-link($theme: DarkGray) {
  border-bottom: 2px solid $blue;

  &:active,
  &:hover {
    color: $blue;
  }
}

.navigation-zone {
  display: none;

  ul {
    list-style: none;
    display: flex;
    padding: 0;
    li::before {
      content: none;
    }
    li {
      align-self: center;
      display: inline;
      padding: 0;
    }
  }

  .navigation-zone-block {
    height: 24px;
  }

  .navigation-separator {
    margin: auto 10px;
    height: 24px;
    border-left: 1px solid $grey-60;
  }

  & > div {
    position: relative;
  }

  @include device-is('large-screen') {
    display: flex;
    align-items: center;
    height: 100%;

    button.dropdown-toggle {
      height: 30px;
      &.current-active-link {
        @include active-link;
      }
    }

    &__item {
      color: $grey-60;
      font-family: $font-roboto;
      font-size: 14px;
      font-weight: $font-medium;
      height: 22px;
      letter-spacing: 0.13px;
      line-height: 22px;
      padding: 0 8px 10px 8px;
      cursor: pointer;
      white-space: nowrap;

      &.current-active-link {
        @include active-link;
      }

      &.links-group {
        border: none;
        background-color: transparent;
      }
    }
  }
}
</style>
