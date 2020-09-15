<template>
  <div class="navigation-zone">
    <div v-for="(menuItem, index) in navigationLinks" :key="`item-${index}`">
      <pix-link
        v-if="!menuItem.hasOwnProperty('subNavigationLinks')"
        :field="menuItem.link"
        class="navigation-zone__item"
      >
        {{ $prismic.asText(menuItem.name) }}
      </pix-link>
      <button
        v-else
        class="dropdown-toggle navigation-zone__item links-group"
        @click="toggleDropdown"
      >
        {{ menuItem.name }} <fa v-if="showDropdown" icon="angle-up" />
        <fa v-else icon="angle-down" />
        <navigation-dropdown
          v-if="showDropdown"
          type="button"
          :options="menuItem.subNavigationLinks"
          @closeNavigationDropdown="toggleDropdown"
        >
        </navigation-dropdown>
      </button>
    </div>
  </div>
</template>

<script>
import NavigationDropdown from '@/components/NavigationDropdown'

export default {
  name: 'NavigationZone',
  components: {
    NavigationDropdown,
  },
  props: {
    slice: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showDropdown: false,
    }
  },
  computed: {
    navigationLinks() {
      const navigation = new Navigation()
      this.slice.items.forEach((item) => {
        if (item.group.length > 0) {
          const groupName = item.group[0].text
          navigation.addSubNavigationLink(groupName, item)
        } else {
          navigation.addNavigationLink(item)
        }
      })
      return navigation.links
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
  },
}

class Navigation {
  constructor() {
    this.links = []
  }

  addNavigationLink(navigationLink) {
    this.links.push(navigationLink)
  }

  addSubNavigationLink(groupName, subNavigationLink) {
    const group = this._groupAlreadyInLinks(groupName)
    if (!group) {
      this._createNewGroup(groupName, [subNavigationLink])
    } else {
      group.subNavigationLinks.push(subNavigationLink)
    }
  }

  _groupAlreadyInLinks(groupName) {
    return this.links.find(
      (link) => link.name === groupName && link.subNavigationLinks
    )
  }

  _createNewGroup(groupName, subNavigationLinks) {
    this.links.push({
      name: groupName,
      subNavigationLinks,
    })
  }
}
</script>

<style scoped lang="scss">
.navigation-zone {
  display: none;

  & > div {
    position: relative;
  }

  @include device-is('large-screen') {
    display: flex;
    width: 652px;
    align-items: center;
    height: 100%;

    &__item {
      color: $grey-9;
      margin: 0 4px;
      font-family: $font-roboto;
      font-size: 14px;
      font-weight: $font-medium;
      height: 22px;
      letter-spacing: 0.13px;
      line-height: 22px;
      padding: 0 8px 10px 8px;
      cursor: pointer;

      &.current-active-link {
        border-bottom: 2px solid $blue-1;
      }
      &.current-active-link,
      &:active,
      &:hover {
        color: $blue-1;
      }

      &.links-group {
        border-left: 1px solid $grey-20;
        border-right: 1px solid $grey-20;
        border-top: none;
        border-bottom: none;
        background-color: transparent;
      }
    }
  }
}
</style>
