<template>
  <div>
    <nuxt-link
      v-for="item in personas"
      :key="item.uri"
      :to="`persona/${item.uri}`"
      class="support__title"
    >
      <img v-if="item.icon" :src="item.icon.url" alt="" />
      <h2>{{ item.name[0].text }}</h2>
      <p>{{ item.description[0].text }}</p>
    </nuxt-link>
  </div>
</template>
<script>
import { DOCUMENTS } from '~/services/document-fetcher'

export default {
  name: 'SupportPersonaPage',
  nuxtI18n: {
    paths: {
      en: '/support',
      fr: '/support',
      'fr-fr': '/support',
      'fr-be': '/support',
    },
  },
  async asyncData({ app, error, req }) {
    try {
      const locale = app.i18n.locale || app.i18n.defaultLocale
      const documents = await app.$prismic.api.query(
        [
          app.$prismic.predicates.at(
            'document.type',
            DOCUMENTS.SUPPORT_PERSONA_PAGE
          ),
        ],
        { lang: locale }
      )
      const personas = documents.results
        .filter((persona) => {
          return !persona.data.parent_persona?.slug
        })
        .map((persona) => {
          return { uri: persona.uid, ...persona.data }
        })
      return { personas }
    } catch (error) {
      console.error(error)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>
