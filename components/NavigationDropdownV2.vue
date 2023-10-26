<template>
  <div class="btn-group navigation-dropdown">
    <div class="navigation-dropdown__description">
      <p
        class="navigation-dropdown-description__title"
        :aria-describedby="`description-${id}`"
      >
        {{ description.title }}
      </p>
      <p
        :id="`description-${id}`"
        class="navigation-dropdown-description__text"
      >
        {{ description.text }}
      </p>
    </div>
    <ul class="navigation-dropdown__list">
      <li
        v-for="(section, index) in sections"
        :key="`section-${index}`"
        class="navigation-dropdown-list__item"
      >
        <div class="navigation-dropdown-list-item__text">
          {{ section.title }}
        </div>
        <ul class="navigation-dropdown__sub-list">
          <li
            v-for="(link, indexLink) in section.links"
            :key="`link-${indexLink}`"
            class="navigation-dropdown-sub-list__sub-item"
          >
            <pix-prismic-link
              class="navigation-dropdown-sub-list-sub-item__link"
              :field="link"
            >
              {{ link.name }}
            </pix-prismic-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavigationDropdown',
  props: {
    description: {
      type: Object,
      default: null,
    },
    dropdownIndex: {
      type: String,
      default: null,
    },
    sections: {
      type: [Array, Object],
      default: null,
    },
  },
  data() {
    return {
      id: null,
    }
  },
  mounted() {
    this.id = this._uid
  },
}
</script>

<style scoped lang="scss">
.navigation-dropdown {
  display: flex;
  gap: 48px;
  width: 100%;
  border-top: 1px solid $grey-30;
  border-bottom: 1px solid $grey-30;
  box-shadow: 0px 4px 8px 0px rgba(7, 20, 46, 0.08);
  padding: 1.5rem 5rem;
  color: $grey-60;
  font-family: $font-roboto;
  font-size: 0.875rem;
  font-weight: $font-normal;
  letter-spacing: 0.009rem;
  position: absolute;
  left: 0;
  background: $white;
  margin-top: 0.938rem;
  min-width: 232px;
  z-index: 1;

  &__description {
    width: 200px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
  }

  &__sub-list {
    margin: 0.5rem 0;
    padding: 0;
  }

  ul,
  li {
    list-style-type: none;
    text-align: left;

    &::before {
      content: '';
      margin-right: 0;
    }
  }
}

.navigation-dropdown-description {
  p {
    margin: 0;
  }

  &__title {
    font-size: 1rem;
    font-weight: $font-medium;
    line-height: 1.5rem;
    color: $grey-70;
    margin: 0;
  }

  &__text {
    margin: 0.5rem 0 0 0;
  }
}

.navigation-dropdown-list {
  &__item {
    font-size: 0.813rem;
    padding: 0;
    margin: 0 0.5rem;
  }
}

.navigation-dropdown-sub-list {
  &__sub-item {
    width: 100%;
    font-size: 0.875rem;
    color: $grey-90;
    font-weight: $font-medium;
    padding: 0;
    border-radius: 4px;

    &:hover {
      background-color: $grey-10;
    }

    &:active {
      background-color: $grey-15;
    }
  }
}

.navigation-dropdown-list-item {
  &__text {
    width: auto;
    margin-left: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid $grey-20;
    color: $grey-70;
    text-transform: uppercase;
  }
}

.navigation-dropdown-sub-list-sub-item {
  &__link {
    display: block;
    padding: 0.25rem 0.5rem;
    color: $grey-90;
  }
}
</style>
