<template>
  <template v-if="isDevelopmentMode">
    <h1>Nuxt error</h1>
    <pre>{{ error }}</pre>
  </template>
  <template v-else>
    <div class="error">
      <a :href="t('home-page-url')">
        <img class="logo" src="/images/pix-logo.svg" alt="Lien pour revenir à l'accueil" />
      </a>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="t('error-content')" />
    </div>
  </template>
</template>

<script setup>
const { locale: i18nLocale, t } = useI18n();

useHead({
  title: 'Error | Pix',
  htmlAttrs: {
    lang: i18nLocale,
  },
});

const error = useError();
const isDevelopmentMode = process.env.NODE_ENV !== 'production';

if (isDevelopmentMode) {
  console.table(error.value);
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
