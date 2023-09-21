<template>
  <nav class="navigation-zone" role="navigation">
    <ul>
      <li
        v-for="(menuItem, index) in menuLinks"
        :key="`item-${index}`"
        class="navigation-zone-block"
      >
        <div v-if="menuItem.subItems && menuItem.subItems.length > 0">
          <button
            :dropdown-index="`${index}`"
            class="dropdown-toggle navigation-zone__item links-group"
            :class="{
              'current-active-link': subIsActive(menuItem.subItems),
            }"
            @click="toggleDropdown(`${index}`)"
            @click.stop.prevent
          >
            {{ menuItem.name }}
            <fa icon="angle-down" />
          </button>
        </div>
        <a v-else :href="menuItem.link.url" class="navigation-zone__item">
          {{ menuItem.name[0].text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const route = useRoute();

const props = defineProps({
  navigationZoneItems: {
    type: Array,
    default: () => [],
  },
});

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
function subIsActive(subNavigationLinks) {
  const paths = subNavigationLinks
    .filter((subNavigationLink) => subNavigationLink.link.url !== undefined)
    .map((subNavigationLink) => {
      const splittedLink = subNavigationLink.link.url.split("/");
      const linkIndex = splittedLink.length - 1;
      return splittedLink[linkIndex];
    });
  return paths.some((path) => {
    return route.path.includes(path);
  });
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

  @include device-is("large-screen") {
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
