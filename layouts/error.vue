<template>
  <div class="error">
    <nuxt-link to="/">
      <img
        class="logo"
        src="/images/pix-logo.svg"
        alt="Lien pour revenir à l'accueil"
      />
    </nuxt-link>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="$t('error-content')"></div>
  </div>
</template>
<script>
export default {
  layout: 'simple',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    return {
      title: 'Error | Pix',
    }
  },
}
</script>

<style lang="scss">
.error {
  width: 300px;
  margin-left: auto;
  margin-right: auto;

  @include device-is('tablet') {
    width: 500px;
  }

  .logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
