<template>
  <div class="navigation">
    <pix-link
      v-for="item in mainNavItems"
      :key="item.id"
      :field="item.primary.link"
      class="text text-s text-left regular text-black"
    >
      <prismic-rich-text :field="item.primary.title" />
    </pix-link>
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
