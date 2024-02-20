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
          <nuxt-link :to="getEnvironmentUrl(link.link_url.url)">
            <prismic-rich-text :field="link.link_name" />
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { getEnvironmentUrl } = useEnvironmentUrl();

defineProps({
  slice: {
    type: Object,
    default: null,
  },
});
</script>

<style lang="scss">
.navigation-group {
  margin-top: 32px;

  &__title h2 {
    color: $grey-60;
    font-size: 1.125rem;
    letter-spacing: 0.009rem;
    font-weight: $font-bold;
    margin-top: 0;
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
    color: $grey-60;
    &:hover {
      color: $grey-90;
    }
  }
}

@include device-is("tablet") {
  .navigation-group {
    width: 224px;
    padding: 16px 32px;
    border-right: 1px solid $grey-22;
  }
}
</style>
