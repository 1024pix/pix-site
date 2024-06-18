<template>
  <ul class="burger-menu__nav-list">
    <li v-for="(item, index) in navigationLinks" :key="`navigation-links-${index}`" class="burger-menu-nav-list__item">
      <div v-if="item.sections.length > 0" v-show="isCategoryOpen(index) || openDropdownIndex === -1">
        <div class="burger-menu-nav-list-item__category">
          <button
            class="burger-menu-nav-list-item-category__button"
            :aria-expanded="isCategoryOpen(index) ? 'true' : 'false'"
            :aria-label="
              isCategoryOpen(index)
                ? `${$t('burger-menu.close-category')} ${item.name}`
                : `${$t('burger-menu.open-category')} ${item.name}`
            "
            :style="{
              justifyContent: isCategoryOpen(index) ? 'flex-start' : 'space-between',
            }"
            @click="toggleCategory(index)"
          >
            {{ item.name }}
          </button>
        </div>
        <div v-show="isCategoryOpen(index)">
          <burger-menu-sections :sections="item.sections" @close-menu="handleLinkClick" />
        </div>
      </div>
      <div v-else v-show="openDropdownIndex === -1" @click="handleLinkClick">
        <nuxt-link
          :to="getEnvironmentUrl(item.url)"
          class="burger-menu-nav-list-item__link"
          :class="{ 'blue-link': shouldApplyBlueClass(item.url) }"
        >
          <img
            v-if="item.beforeIcon"
            :src="`/images/${item.beforeIcon}`"
            :alt="item.alternativeTextForBeforeIcon"
            width="22"
            height="18"
          />
          {{ item.name }}
          <img
            v-if="item.afterIcon"
            :src="`/images/${item.afterIcon}`"
            :alt="item.alternativeTextForAfterIcon"
            width="22"
            height="18"
          />
        </nuxt-link>
      </div>
    </li>
  </ul>
</template>

<script setup>
const appConfig = useAppConfig();
const { getEnvironmentUrl } = useEnvironmentUrl();

const props = defineProps({
  items: {
    type: Array,
    default: null,
  },
  isLocaleSwitcherOpen: {
    type: Boolean,
    default: false,
  },
});

const openDropdownIndex = ref(-1);

const isLocaleSwitcherOpenLocal = computed({
  get() {
    return props.isLocaleSwitcherOpen;
  },
  set(value) {
    if (value) {
      openDropdownIndex.value = -1;
    }
  },
});

const navigationLinks = useMainNavigationLinks(props.items);

watch(
  () => props.isLocaleSwitcherOpen,
  (newValue) => {
    isLocaleSwitcherOpenLocal.value = newValue;
  },
);
const isCategoryOpen = (categoryDropdownIndex) => {
  return openDropdownIndex.value === categoryDropdownIndex;
};

const shouldApplyBlueClass = (url) => {
  if (appConfig.site) {
    return url.includes('pro.pix');
  }
  return false;
};

const toggleCategory = (categoryDropdownIndex) => {
  if (isCategoryOpen(categoryDropdownIndex)) {
    openDropdownIndex.value = -1;
  } else {
    openDropdownIndex.value = categoryDropdownIndex;
  }
};

const emits = defineEmits(['close-menu']);

const handleLinkClick = () => {
  emits('close-menu');
  openDropdownIndex.value = -1;
};
</script>

<style lang="scss" scoped>
.burger-menu-nav-list-item {
  &__category {
    display: flex;
    align-items: center;
    height: 3.563rem;
    border-bottom: 1px solid $grey-22;
    background-color: $white;
  }

  &__link {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid $grey-22;
    background-color: $white;
    color: $grey-90;

    &:hover,
    &:focus {
      background-color: $grey-10;
    }

    &:active {
      background-color: $grey-15;
    }
  }
}

.burger-menu-nav-list-item-category {
  &__button {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    height: 100%;
    width: 100%;
    border: none;
    text-align: left;
    background-color: $white;
    color: $grey-90;

    &:hover,
    &:focus {
      background-color: $grey-10;
    }

    &:active {
      background-color: $grey-15;
    }

    &::before,
    &::after {
      width: 0.5rem;
      height: 0.5rem;
      border-top: 2px solid currentColor;
      transform-origin: center center;
    }

    &[aria-expanded='false']::after {
      content: '';
      border-right: 2px solid currentColor;
      transform: rotate(45deg) translate(-25%, 15%);
    }

    &[aria-expanded='true']::before {
      content: '';
      margin-right: 0.75em;
      border-left: 2px solid currentColor;
      transform-origin: center center;
      transform: rotate(-45deg) translate(25%, 15%);
    }
  }
}

.blue-link {
  color: $blue;

  img {
    filter: invert(30%) sepia(70%) saturate(1972%) hue-rotate(216deg) brightness(103%) contrast(101%);
  }

  &:hover,
  &:focus {
    color: $blue-hover;

    img {
      filter: invert(18%) sepia(100%) saturate(7289%) hue-rotate(233deg) brightness(98%) contrast(110%);
    }
  }
}
</style>
