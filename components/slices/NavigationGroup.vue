<template>
  <div class="navigation-group">
    <prismic-rich-text
      :field="slice.primary.title"
      class="navigation-group__title"
    />
    <div class="navigation-group__wrapper">
      <ul>
        <li
          v-for="(link, index) in slice.items"
          :key="`link-${index}`"
          class="navigation-group-link"
        >
          <pix-link :field="link.link_url">
            <prismic-rich-text :field="link.link_name" />
          </pix-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationGroup',
  props: {
    slice: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.navigation-group {
  &__title h2 {
    color: $grey-60;
    font-size: 1.125rem;
    letter-spacing: 0.009rem;
    font-weight: $font-bold;
    margin-top: 32px;
  }

  &__wrapper {
    ul,
    li {
      margin: 0;
      padding: 0;
      list-style: none;
      &::before {
        content: none;
      }
    }
  }
}

.navigation-group-link {
  p {
    margin: 6px 0;
  }

  a {
    font-size: 0.875rem;
    color: $grey-45;
    &:hover {
      color: $grey-90;
    }
  }
}
</style>
