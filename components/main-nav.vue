<template>
  <div class="navigation">
    <a
      v-for="item in mainNavItems"
      :key="item.id"
      class="text text-s text-left regular text-black"
      :href="item.primary.link.url"
    >
      <prismic-rich-text :field="item.primary.title" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'NavPrincipal',
  props: {
    mainNavItems: {
      type: Array,
      default: null
    }
  }
}
</script>

<style>
.btn-nav {
  transition: all ease-in 0.2s;
}
</style>
