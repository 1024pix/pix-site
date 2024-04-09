<template>
  <nav class="actions-zone">
    <locale-switcher />
    <ul>
      <li v-if="slice.primary.helperLink" class="actions-zone__item-helper">
        <a :href="slice.primary.helperLink.url" class="actions-zone-item-helper__link">
          <img
            v-if="slice.primary.helperIcon"
            :src="`/images/${slice.primary.helperIcon}`"
            class="actions-zone-item-helper__icon"
            alt=""
            width="16"
            height="16"
          />
          {{ $prismic.asText(slice.primary.helperName) }}
        </a>
      </li>
      <li v-for="(menuItem, index) in slice.items" :key="`item-${index}`" class="actions-zone__item">
        <a
          :href="menuItem.link.url"
          class="actions-zone-item__link"
          :class="{
            'button button--with-border-focus': menuItem.style === 'button',
            link: menuItem.style === 'link',
          }"
        >
          <img
            v-if="menuItem.icon"
            :src="`/images/${menuItem.icon}`"
            class="actions-zone-item__icon"
            alt=""
            width="15"
            height="14"
          />
          {{ $prismic.asText(menuItem.name) }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  slice: {
    type: Object,
    default: null,
  },
});
</script>

<style scoped lang="scss">
.actions-zone {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 0.313rem;

  ul {
    list-style: none;
    display: flex;
    padding: 0;

    li::before {
      content: none;
    }
    li {
      align-self: center;
      display: flex;
    }
  }

  &__item-helper {
    padding: 0;

    &:hover {
      a {
        color: $blue;
      }
      img {
        filter: invert(30%) sepia(70%) saturate(1972%) hue-rotate(216deg) brightness(103%) contrast(101%);
      }
    }
  }
}

.actions-zone-item {
  &__link {
    font-size: 0;
    color: $grey-90;
    font-family: $font-roboto;
    font-weight: $font-medium;
    letter-spacing: 0.008rem;
    line-height: 1.375rem;
    display: inline-flex;
    align-items: center;
    padding: 0;
    border-radius: 0.25rem;

    &.button {
      display: none;
    }

    @include device-is('tablet') {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      &.link {
        border: 1px solid $grey-60;

        img {
          margin-right: 0.313rem;
        }

        &:hover {
          color: $white;
          background-color: $grey-60;

          img {
            filter: brightness(0) invert(1);
          }
        }
        &:focus {
          color: $white;
          background-color: $grey-90;
          border: 1px solid $grey-90;
          outline: 1px solid $white;
          outline-offset: -4px;

          img {
            filter: brightness(0) invert(1);
          }
        }
      }
    }

    @include device-is('desktop') {
      &.button {
        display: flex;
        color: $white;
        height: 36px;
      }
    }
  }
}

.actions-zone-item-helper {
  &__link {
    display: none;
    font-size: 0.875rem;
    margin-right: 0.75rem;
    padding: 0 1.5rem;
    border-right: 1px solid $grey-20;
    color: $grey-70;
    font-family: $font-roboto;
    font-weight: $font-medium;

    @include device-is('tablet') {
      display: flex;
      align-items: center;
      height: 36px;
    }
  }

  &__icon {
    margin-right: 0.313rem;
  }
}
</style>
