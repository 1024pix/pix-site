<template>
  <nav ref="navigationZoneRef" class="navigation-zone" role="navigation">
    <ul class="navigation-zone__main">
      <li
        v-for="(menuItem, index) in menuLinks"
        :key="`item-${index}`"
        class="navigation-zone__item"
        :class="{
          'navigation-zone__item--active': activeSubMenu === index,
        }"
      >
        <template v-if="menuItem.subItems && menuItem.subItems.length > 0">
          <button @click.stop.prevent="toggleSubMenu(index)">
            {{ menuItem.name }}
          </button>
          <ul
            v-show="activeSubMenu === index"
            class="navigation-zone__sub-menu"
          >
            <li v-for="(subItem, index) in menuItem.subItems">
              <a :href="getEnvironmentUrl(subItem.link.url)">
                {{ subItem.name[0].text }}
              </a>
            </li>
          </ul>
        </template>
        <a v-else :href="getEnvironmentUrl(menuItem.link.url)">
          {{ menuItem.name[0].text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";

const { getEnvironmentUrl } = useEnvironmentUrl();

const props = defineProps({
  navigationZoneItems: {
    type: Array,
    default: () => [],
  },
});

const navigationZoneRef = ref(null);

const activeSubMenu = ref(undefined);

/* Generate menu */
const menuLinks = props.navigationZoneItems[0].items.reduce(
  (accumulator, currentMenuItem) => {
    if (!currentMenuItem.group.length) {
      return [...accumulator, currentMenuItem];
    }

    const existingGroup = accumulator.find(
      (item) => item.name === currentMenuItem.group[0].text
    );
    if (existingGroup) {
      existingGroup.subItems.push(currentMenuItem);
      return accumulator;
    } else {
      return [
        ...accumulator,
        {
          name: currentMenuItem.group[0].text,
          subItems: [currentMenuItem],
        },
      ];
    }
  },
  []
);

/* Methods */
function toggleSubMenu(subMenuIndex) {
  if (activeSubMenu.value === subMenuIndex) {
    activeSubMenu.value = undefined;
  } else {
    activeSubMenu.value = subMenuIndex;
  }
}

onClickOutside(
  navigationZoneRef,
  () => {
    toggleSubMenu();
  }
  // { ignore: [buttonRef] }
);
</script>

<style scoped lang="scss">
.navigation-zone {
  font-family: $font-roboto;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.5em;

  ul {
    list-style: none;
    padding-left: 0;
  }

  li {
    padding: 0;

    &::before {
      content: none;
    }
  }
}

.navigation-zone__main {
  display: flex;
  margin: 0;
}

.navigation-zone__item {
  position: relative;

  & + .navigation-zone__item {
    margin-left: 1.5em;
  }

  button {
    align-items: center;
    appearance: none;
    padding: 0;
    background: transparent;
    border: none;
    font: inherit;
    line-height: inherit;
    cursor: pointer;

    &::after {
      content: "";
      display: block;
      width: 0.5em;
      height: 0.5em;
      margin-left: 0.75em;
      border-bottom: 2px solid currentColor;
      border-right: 2px solid currentColor;
      transform: translateY(-0.15em) rotate(45deg);
    }
  }

  a,
  button {
    display: flex;
    color: $grey-60;

    &:hover,
    &:focus {
      color: $blue;
    }
  }

  & > a,
  & > button {
    padding: 1.5em 0;
  }
}

.navigation-zone__item--active {
  button::after {
    transform: translateY(0.15em) rotate(-135deg);
  }
}

.navigation-zone__sub-menu {
  position: absolute;
  z-index: 1;
  top: calc(100% - 1em);
  left: -1em;
  margin: 0;
  padding: 0.5em 0;
  background-color: white;

  a {
    display: block;
    padding: 0.75em 1em;
    white-space: nowrap;
    font-weight: 400;
  }
}
</style>
