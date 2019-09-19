<template>
  <div class="navigation">
    <a
      v-for="item in mainNavItems"
      :key="item.id"
      class="text text-s text-left regular text-black"
      :href="item.primary.link.url"
    >
      {{ $prismic.richTextAsPlain(item.primary.title) }}
    </a>
    <div>
      <a
        class="text text-s text-left regular text-black"
        href="https://app.pix.fr/"
        >Se connecter</a
      >
    </div>
    <div>
      <a class="btn-nav" href="https://app.pix.fr/inscription">S'inscrire</a>
    </div>
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
