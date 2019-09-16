<template>
  <div class="nav-switch">
    <div class="container padding-container">
      <a
        v-for="item in organizationNavItems"
        v-bind:key="item.id"
        class="text text-xs text-left text-up regular text-black"
        :href="item.primary.link.url"
      >
        {{ $prismic.richTextAsPlain(item.primary.title) }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['organizationNavItems']
}
</script>

<style lang="scss">
.nav-switch {
  display: none;
  height: 30px;
  background-color: $grey-3;

  @include device-is('tablet') {
    display: block;
  }

  .container {
    height: 30px;
    display: flex;
    align-items: center;
    flex-flow: row;
    justify-content: flex-end;

    span,
    a {
      font-size: 12px;
    }

    a {
      margin-left: 3px;
      color: $grey-1 !important;
      margin-right: 18px;

      &:hover {
        color: $blue-1 !important;
      }
    }

    div {
      &:last-child {
        a {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
