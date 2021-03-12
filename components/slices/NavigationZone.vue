<template>
  <div class="navigation-zone">
    <div
      v-for="(menuItem, index) in navigationLinks"
      :key="`item-${index}`"
      class="navigation-zone-block"
    >
      <pix-link
        v-if="!menuItem.hasOwnProperty('subNavigationLinks')"
        :field="menuItem.link"
        class="navigation-zone__item"
      >
        {{ $prismic.asText(menuItem.name) }}
      </pix-link>
      <div v-else>
        <button
          :dropdown-index="`${index}`"
          class="dropdown-toggle navigation-zone__item links-group"
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
          :options="menuItem.subNavigationLinks"
          :dropdown-index="`${index}`"
        >
        </navigation-dropdown>
      </div>
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
      openDropdownIndex: undefined,
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

  .navigation-zone-block:last-child {
    border-left: 1px solid $grey-20;
  }

  & > div {
    position: relative;
  }

  @include device-is('large-screen') {
    display: flex;
    align-items: center;
    height: 100%;

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
        border-bottom: 2px solid $blue;
      }
      &.current-active-link,
      &:active,
      &:hover {
        color: $blue;
      }

      &.links-group {
        border: none;
        background-color: transparent;
      }
    }
  }
}
</style>
