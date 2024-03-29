<template>
  <nav class="navigation-zone" role="navigation">
    <ul>
      <li
        v-for="(menuItem, index) in navigationLinks"
        :key="`item-${index}`"
        class="navigation-zone__list"
        :class="menuItem.separator ? 'navigation-separator' : ''"
      >
        <div v-if="menuItem.sections.length > 0">
          <button
            class="dropdown-toggle navigation-zone-list__item links-group"
            :class="{
              'current-active-link': subIsActive(menuItem.sections),
              'dropdown-toggle--open': isOpenDropdown(`${index}`),
            }"
            @click.stop="toggleDropdown(`${index}`)"
          >
            {{ menuItem.name }}
          </button>
          <navigation-dropdown
            v-show="isOpenDropdown(`${index}`)"
            type="button"
            :sections="menuItem.sections"
            :description="menuItem.description"
            :dropdown-index="`${index}`"
            @sublink-click="handleSubLinkClick"
          >
          </navigation-dropdown>
        </div>
        <div v-else class="navigation-zone-list__link">
          <nuxt-link
            class="navigation-zone-list-link__item"
            :to="getEnvironmentUrl(menuItem.url)"
            active-class="current-active-link"
          >
            <img
              v-if="menuItem.beforeIcon"
              :src="`/images/${menuItem.beforeIcon}`"
              class="navigation-zone-list-item__link-icon--before-name"
              :alt="menuItem.alternativeTextForBeforeIcon"
              width="22"
              height="18"
            />
            {{ menuItem.name }}
            <img
              v-if="menuItem.afterIcon"
              :src="`/images/${menuItem.afterIcon}`"
              class="navigation-zone-list-item__link-icon--after-name"
              :alt="menuItem.alternativeTextForAfterIcon"
              width="22"
              height="18"
            />
          </nuxt-link>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const route = useRoute();
const { getEnvironmentUrl } = useEnvironmentUrl();

const props = defineProps({
  navigationZoneItems: {
    type: Array,
    default: () => [],
  },
});

const openDropdownIndex = ref(-1);

const navigationLinks = useMainNavigationLinks(props.navigationZoneItems);

onMounted(() => {
  const page = document.getElementsByTagName('body')[0];
  page.addEventListener('click', toggleDropdown);
});

onBeforeUnmount(() => {
  const page = document.getElementsByTagName('body')[0];
  page.removeEventListener('click', toggleDropdown);
});

const isOpenDropdown = (dropdownIndex) => {
  return openDropdownIndex.value === dropdownIndex;
};

const toggleDropdown = (dropdownIndex) => {
  if (isOpenDropdown(dropdownIndex)) {
    openDropdownIndex.value = -1;
  } else {
    openDropdownIndex.value = dropdownIndex;
  }
};

const subIsActive = (subNavigationLinks) => {
  const paths = subNavigationLinks
    .flatMap((subNavigationLink) => subNavigationLink.links.map((link) => link.url))
    .map((subNavigationLink) => {
      const splittedLink = subNavigationLink.split('/');
      const linkIndex = splittedLink.length - 1;
      return splittedLink[linkIndex];
    });
  return paths.some((path) => {
    return route.path.includes(path);
  });
};

const handleSubLinkClick = () => {
  toggleDropdown(-1);
};
</script>

<style scoped lang="scss">
@mixin active-link() {
  border-bottom: 2px solid $blue;
  color: $blue;

  img {
    filter: invert(30%) sepia(70%) saturate(1972%) hue-rotate(216deg) brightness(103%) contrast(101%);
  }
}

.navigation-zone {
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0;

    li::before {
      content: none;
    }

    li:first-of-type {
      a {
        margin-left: 0;
      }
    }

    li {
      align-self: center;
      padding: 0;
    }
  }

  &__list {
    height: 1.5rem;
    display: inline-flex;
    align-items: center;
  }

  .navigation-separator {
    margin: auto 2rem;
    height: 54px;
    border-left: 1px solid $grey-20;
  }

  @include device-is('desktop') {
    display: flex;
    align-items: center;
    height: 100%;

    .dropdown-toggle {
      display: flex;
      align-items: center;
      height: 1.875rem;
      padding: 0;

      &::after {
        content: '';
        width: 0.5em;
        height: 0.5em;
        margin-left: 0.75em;
        border-bottom: 2px solid currentColor;
        border-right: 2px solid currentColor;
        transform: translateY(-0.15em) rotate(45deg);
      }

      &--open::after {
        transform: translateY(0.15em) rotate(-135deg);
      }

      &.current-active-link {
        @include active-link;
      }
    }
  }
}

.navigation-zone-list {
  &__item {
    padding: 0 0 26px 0;
  }

  &__link {
    display: flex;
    align-items: center;
  }

  @include device-is('desktop') {
    &__item {
      margin: 0 0 0 2rem;
      color: $grey-70;
      font-family: $font-roboto;
      font-size: 0.875rem;
      font-weight: $font-medium;
      height: 1.375rem;
      letter-spacing: 0.13px;
      line-height: 22px;
      cursor: pointer;
      white-space: nowrap;

      &:hover {
        color: $blue;
      }

      &.current-active-link {
        color: $grey-90;
        @include active-link;
      }

      &.links-group {
        border: none;
        background-color: transparent;
      }
    }
  }
}

.navigation-zone-list-item {
  &__icon {
    padding-left: 0.25rem;
  }

  &__link-icon {
    width: auto;

    &--before-name {
      padding-right: 0.5rem;
    }

    &--after-name {
      padding-left: 0.5rem;
    }
  }
}

.navigation-zone-list-link {
  &__item {
    display: inline-flex;
    align-items: center;

    &:hover {
      color: $blue;

      img {
        filter: invert(30%) sepia(70%) saturate(1972%) hue-rotate(216deg) brightness(103%) contrast(101%);
      }
    }
  }

  @include device-is('desktop') {
    &__item {
      margin: 0 0 0 2rem;
      color: $grey-70;
      font-family: $font-roboto;
      font-size: 0.875rem;
      font-weight: $font-medium;
      height: 1.375rem;
      letter-spacing: 0.13px;
      line-height: 22px;
      cursor: pointer;
      white-space: nowrap;

      &:hover {
        color: $blue;
      }

      &.current-active-link {
        color: $grey-90;
        @include active-link;
      }
    }
  }
}
</style>
