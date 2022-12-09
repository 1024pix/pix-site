<template>
  <article>
    <nuxt-link
      v-for="locale in locales"
      :key="locale.lang"
      class="link"
      :to="locale.target"
    >
      <img
        class="language-switcher__img"
        :src="'/images/' + locale.icon"
        alt=""
      />
      {{ locale.name }}
    </nuxt-link>
  </article>
</template>

<script>
import { language } from '~/config/language'

export default {
  layout: 'simple',
  nuxtI18n: false,
  data() {
    return {
      locales: language.menu
        .flatMap((menuItem) => menuItem.children ?? menuItem)
        .filter((l) => l.isOnPixOrg),
    }
  },
}
</script>

<style scoped>
.link {
  display: block;
}
</style>
