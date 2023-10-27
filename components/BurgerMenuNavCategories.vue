<template>
  <ul class="burger-menu-nav-list">
    <li
      v-for="(item, index) in navigationLinks"
      :key="`navigation-links-${index}`"
      class="burger-menu-nav-list__item"
    >
      <div
        v-if="item.sections.length > 0"
        v-show="isCategoryOpen(index) || openDropdownIndex === -1"
      >
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
              justifyContent: isCategoryOpen(index)
                ? 'flex-start'
                : 'space-between',
            }"
            @click="toggleCategory(index)"
          >
            <fa
              v-if="isCategoryOpen(index)"
              class="burger-menu-nav-list-item-category__come-back"
              icon="angle-left"
            />
            {{ item.name }}
            <fa
              v-if="!isCategoryOpen(index)"
              class="burger-menu-nav-list-item-category__come-back"
              icon="angle-right"
            />
          </button>
        </div>
        <div v-show="isCategoryOpen(index)">
          <burger-menu-nav-sections
            :sections="item.sections"
            @close-menu="handleLinkClick"
          />
        </div>
      </div>
      <div v-else v-show="openDropdownIndex === -1" @click="handleLinkClick">
        <pix-prismic-link
          :field="item"
          class="burger-menu-nav-list-item__link"
          :class="{ 'blue-link': shouldApplyBlueClass(item.url) }"
        >
          <img
            v-if="item.beforeIcon"
            :src="`/images/${item.beforeIcon}`"
            :alt="item.alternativeTextForBeforeIcon"
            role="presentation"
            width="22"
            height="18"
          />
          {{ item.name }}
          <img
            v-if="item.afterIcon"
            :src="`/images/${item.afterIcon}`"
            :alt="item.alternativeTextForAfterIcon"
            role="presentation"
            width="22"
            height="18"
          />
        </pix-prismic-link>
      </div>
    </li>
  </ul>
</template>

<script>
import BurgerMenuNavSections from '~/components/BurgerMenuNavSections.vue'

export default {
  name: 'BurgerMenuNavCategories',
  components: {
    BurgerMenuNavSections,
  },
  props: {
    items: {
      type: Array,
      default: null,
    },
    isLocaleSwitcherOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openDropdownIndex: -1,
    }
  },
  computed: {
    isLocaleSwitcherOpenLocal: {
      get() {
        return this.isLocaleSwitcherOpen
      },
      set(value) {
        if (value) {
          this.openDropdownIndex = -1
        }
      },
    },
    navigationLinks() {
      if (this.items.length === 0) {
        return null
      }

      return this.items.reduce((formattedData, currentItem) => {
        const isCategory =
          currentItem.categoryName.length > 0 &&
          currentItem.categoryName[0].text

        if (!isCategory) {
          formattedData.push({
            name: this.getTextFromArray(currentItem.menuName),
            beforeIcon: currentItem.beforeIcon,
            alternativeTextForBeforeIcon: currentItem
              .alternativeTextForBeforeIcon[0]
              ? currentItem.alternativeTextForBeforeIcon[0].text
              : '',
            afterIcon: currentItem.afterIcon,
            alternativeTextForAfterIcon: currentItem
              .alternativeTextForAfterIcon[0]
              ? currentItem.alternativeTextForAfterIcon[0].text
              : '',
            url: currentItem.menuLink.url,
            sections: [],
          })

          return formattedData
        }

        const currentCategoryName = this.getTextFromArray(
          currentItem.categoryName
        )
        const lastCategoryIndex = formattedData.length - 1
        const isDifferentCategory =
          lastCategoryIndex === -1 ||
          formattedData[lastCategoryIndex].name !== currentCategoryName

        if (isDifferentCategory) {
          formattedData.push(
            this.createCategory(
              currentCategoryName,
              this.getTextFromArray(currentItem.menuSectionTitle),
              this.getTextFromArray(currentItem.menuName),
              currentItem.menuLink.url
            )
          )

          return formattedData
        }

        const currentCategory = formattedData[lastCategoryIndex]
        const currentTitle = this.getTextFromArray(currentItem.menuSectionTitle)
        const existingSectionIndex = currentCategory.sections.findIndex(
          (section) => section.title === currentTitle
        )

        if (existingSectionIndex !== -1) {
          currentCategory.sections[existingSectionIndex].links.push({
            name: this.getTextFromArray(currentItem.menuName),
            url: currentItem.menuLink.url,
          })
        } else {
          currentCategory.sections.push(
            this.createSection(
              currentTitle,
              this.getTextFromArray(currentItem.menuName),
              currentItem.menuLink.url
            )
          )
        }
        return formattedData
      }, [])
    },
  },
  watch: {
    isLocaleSwitcherOpen(newValue) {
      this.isLocaleSwitcherOpenLocal = newValue
    },
  },
  methods: {
    createSection(menuSectionTitle, menuName, menuLink) {
      return {
        title: menuSectionTitle,
        links: [{ name: menuName, url: menuLink }],
      }
    },
    createCategory(categoryName, menuSectionTitle, menuName, menuLink) {
      return {
        name: categoryName,
        sections: [this.createSection(menuSectionTitle, menuName, menuLink)],
      }
    },
    getTextFromArray(array) {
      return array.length ? array[0].text : ''
    },
    isCategoryOpen(categoryDropdownIndex) {
      return this.openDropdownIndex === categoryDropdownIndex
    },
    shouldApplyBlueClass(url) {
      if (process.env.SITE === 'pix-site') {
        return url === 'https://pro.pix.fr'
      }
      return false
    },
    toggleCategory(categoryDropdownIndex) {
      if (this.isCategoryOpen(categoryDropdownIndex)) {
        this.openDropdownIndex = -1
      } else {
        this.openDropdownIndex = categoryDropdownIndex
      }
    },
    handleLinkClick() {
      this.$emit('close-menu')
      this.openDropdownIndex = -1
    },
  },
}
</script>

<style lang="scss">
.burger-menu-nav-list {
  padding: 0;
  margin: 0;

  &__item {
    padding: 0;
    margin: 0;
  }
}

.burger-menu-nav-list-item {
  &__category {
    display: flex;
    align-items: center;
    height: 3.563rem;
    border-bottom: 1px solid $grey-22;
  }

  &__link {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid $grey-22;
    font-weight: $font-medium;
    font-size: 1rem;
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
    font-weight: $font-medium;
    font-size: 1rem;
    background-color: transparent;
    color: $grey-90;

    &:hover,
    &:focus {
      background-color: $grey-10;
    }

    &:active {
      background-color: $grey-15;
    }
  }

  &__come-back {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    padding: 0.25rem;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    color: $grey-60;

    &:hover {
      background-color: $grey-15;

      svg {
        color: $grey-80;
      }
    }

    svg {
      color: $grey-60;
    }
  }

  &__icon {
    padding-right: 0.5rem;
  }
}

.blue-link {
  color: $blue;

  img {
    filter: invert(30%) sepia(70%) saturate(1972%) hue-rotate(216deg)
      brightness(103%) contrast(101%);
  }

  &:hover,
  &:focus {
    color: $blue-hover;

    img {
      filter: invert(18%) sepia(100%) saturate(7289%) hue-rotate(233deg)
        brightness(98%) contrast(110%);
    }
  }
}
</style>
