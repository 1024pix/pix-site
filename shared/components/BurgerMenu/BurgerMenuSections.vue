<template>
  <ul class="burger-menu-nav-sections-list">
    <li
      v-for="(section, index) in sections"
      :key="`burger-menu-section-${index}`"
      class="burger-menu-nav-sections-list__item"
    >
      <div class="burger-menu-nav-sections-list-item__title">
        {{ section.title }}
      </div>
      <ul class="burger-menu-nav-sections-list-item__sub-list">
        <li
          v-for="link in section.links"
          :key="link.url"
          class="burger-menu-nav-sections-list-item-sub-list__sub-item"
          @click="handleLinkClick"
        >
          <nuxt-link
            :to="getEnvironmentUrl(link.url)"
            class="burger-menu-nav-sections-list-item-sub-list-sub-item__link"
          >
            {{ link.name }}
          </nuxt-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  sections: {
    type: Array,
    required: true,
  },
  field: {
    type: Object,
    required: true,
  },
});
const emits = defineEmits(['close-menu']);
const { getEnvironmentUrl } = useEnvironmentUrl();

const handleLinkClick = () => {
  emits('close-menu');
};
</script>

<style lang='scss' scoped>
.burger-menu-nav-sections-list {
  padding: 0.75rem 0;
  border-bottom: 1px solid $grey-20;

  &__item:not(:first-child) {
    margin-top: 0.75rem;
  }
}

.burger-menu-nav-sections-list-item {
  &__title {
    padding: 0.25rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 400;
    text-transform: uppercase;
    color: $grey-60;
  }

  &__sub-list {
    padding: 0;
    margin: 0;
  }
}

.burger-menu-nav-sections-list-item-sub-list {
  &__sub-item {
    padding: 0;
  }
}

.burger-menu-nav-sections-list-item-sub-list-sub-item {
  &__link {
    display: block;
    padding: 0.5rem 1.5rem;
    color: $grey-90;
    font-weight: $font-medium;

    &:hover,
    &:focus {
      background-color: $grey-10;
    }

    &:active {
      background-color: $grey-15;
    }
  }
}
</style>
