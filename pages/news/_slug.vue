<template>
  <div class="page news-show">
    <div class="page-banner-layout">
      <div class="page-banner"></div>
      <div class="container padding-container page-banner-content">
        <news-item-post v-if="newsItem" :news-item="newsItem" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineI18nRoute({
  paths: {
    en: "/news/:slug",
    fr: "/actualites/:slug",
    "fr-fr": "/actualites/:slug",
    "fr-be": "/actualites/:slug",
  },
});
</script>
