<template>
  <nav class="navigation-zone-v2" role="navigation">
    <ul>
      <li
        v-for="(menuItem, index) in navigationLinks"
        :key="`item-${menuItem.name}`"
        class="navigation-zone-v2__list"
        :class="menuItem.separator ? 'navigation-separator' : ''"
      >
        <div v-if="menuItem.sections.length > 0">
          <button
            :dropdown-index="`${index}`"
            class="dropdown-toggle navigation-zone-v2-list__item links-group"
            :class="{
              'current-active-link': subIsActive(menuItem.sections),
              'dropdown-open': isOpenDropdown(`${index}`),
            }"
            @click="toggleDropdown(`${index}`)"
            @click.stop.prevent
          >
            {{ menuItem.name }}
            <fa
              v-if="isOpenDropdown(`${index}`)"
              class="navigation-zone-v2-list-item__icon"
              icon="angle-up"
            />
            <fa
              v-else
              class="navigation-zone-v2-list-item__icon"
              icon="angle-down"
            />
          </button>
          <navigation-dropdown-v2
            v-show="isOpenDropdown(`${index}`)"
            type="button"
            :sections="menuItem.sections"
            :description="menuItem.description"
            :dropdown-index="`${index}`"
          >
          </navigation-dropdown-v2>
        </div>
        <div v-else class="navigation-zone-v2-list__link">
          <pix-prismic-link
            :field="menuItem"
            class="navigation-zone-v2-list-link__item"
          >
            <img
              v-if="menuItem.beforeIcon"
              :src="`/images/${menuItem.beforeIcon}`"
              class="navigation-zone-v2-list-item__link-icon--before-name"
              :alt="menuItem.alternativeTextForBeforeIcon"
              role="presentation"
              width="22"
              height="18"
            />
            {{ menuItem.name }}
            <img
              v-if="menuItem.afterIcon"
              :src="`/images/${menuItem.afterIcon}`"
              class="navigation-zone-v2-list-item__link-icon--after-name"
              :alt="menuItem.alternativeTextForAfterIcon"
              role="presentation"
              width="22"
              height="18"
            />
          </pix-prismic-link>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'SlicesNavigationZoneV2',
  props: {
    navigationZoneItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      openDropdownIndex: -1,
    }
  },
  computed: {
    navigationLinks() {
      if (this.navigationZoneItems.length === 0) {
        return null
      }

      return this.navigationZoneItems.reduce((formattedData, currentItem) => {
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
            separator: currentItem.separator,
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
              currentItem.separator,
              this.getTextFromArray(currentItem.descriptionCategoryTitle),
              this.getTextFromArray(currentItem.descriptionCategoryText),
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
  mounted() {
    const page = document.getElementsByTagName('body')[0]
    page.addEventListener('click', this.toggleDropdown)
  },
  beforeDestroy() {
    const page = document.getElementsByTagName('body')[0]
    page.removeEventListener('click', this.toggleDropdown)
  },
  methods: {
    createSection(menuSectionTitle, menuName, menuLink) {
      return {
        title: menuSectionTitle,
        links: [{ name: menuName, url: menuLink }],
      }
    },
    createCategory(
      categoryName,
      separator,
      descriptionCategoryTitle,
      descriptionCategoryText,
      menuSectionTitle,
      menuName,
      menuLink
    ) {
      return {
        name: categoryName,
        separator,
        description: {
          title: descriptionCategoryTitle,
          text: descriptionCategoryText,
        },
        sections: [this.createSection(menuSectionTitle, menuName, menuLink)],
      }
    },
    getTextFromArray(array) {
      return array.length ? array[0].text : ''
    },
    isOpenDropdown(dropdownIndex) {
      return this.openDropdownIndex === dropdownIndex
    },
    toggleDropdown(dropdownIndex) {
      if (this.isOpenDropdown(dropdownIndex)) {
        this.openDropdownIndex = -1
      } else {
        this.openDropdownIndex = dropdownIndex
      }
    },
    subIsActive(subNavigationLinks) {
      const paths = subNavigationLinks
        .flatMap((subNavigationLink) =>
          subNavigationLink.links.map((link) => link.url)
        )
        .map((subNavigationLink) => {
          const splittedLink = subNavigationLink.split('/')
          const linkIndex = splittedLink.length - 1
          return splittedLink[linkIndex]
        })
      return paths.some((path) => {
        return this.$route.path.includes(path)
      })
    },
  },
}
</script>

<style scoped lang="scss">
@mixin active-link() {
  border-bottom: 2px solid $blue;
  color: $blue;

  img {
    filter: invert(30%) sepia(70%) saturate(1972%) hue-rotate(216deg)
      brightness(103%) contrast(101%);
  }
}

.navigation-zone-v2 {
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

    button.dropdown-toggle {
      height: 1.875rem;

      &.current-active-link {
        @include active-link;
      }
    }
  }
}

.navigation-zone-v2-list {
  &__item {
    padding: 0 0 26px 0;

    &.dropdown-open {
      color: $grey-90;
    }
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

.navigation-zone-v2-list-item {
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

.navigation-zone-v2-list-link {
  &__item {
    display: inline-flex;
    align-items: center;
    padding-bottom: 0.25rem;

    &:hover {
      color: $blue;

      img {
        filter: invert(30%) sepia(70%) saturate(1972%) hue-rotate(216deg)
          brightness(103%) contrast(101%);
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
