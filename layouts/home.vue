<template>
  <main class="home">
    <nuxt />
  </main>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang="scss">
.home {
  width: 100%;
  min-width: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 1rem 0;
  background: url('/images/stars.svg') repeat, $default-gradient;

  @include device-is('large-mobile') {
    padding: 0;
  }
}
</style>
