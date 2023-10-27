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
          <pix-prismic-link
            :field="link"
            class="burger-menu-nav-sections-list-item-sub-list-sub-item__link"
          >
            {{ link.name }}
          </pix-prismic-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BurgerMenuNavSections',
  props: {
    sections: {
      type: Array,
      default: null,
    },
  },
  methods: {
    handleLinkClick() {
      this.$emit('close-menu')
    },
  },
}
</script>

<style lang="scss">
.burger-menu-nav-sections-list {
  margin: 0;
  padding: 0.75rem 0;
  background-color: $grey-5;
  border-bottom: 1px solid $grey-20;

  &__item {
    padding: 0;
  }
}

.burger-menu-nav-sections-list-item {
  &__title {
    color: $grey-60;
    text-transform: uppercase;
    padding: 0.5rem 1.5rem;
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
