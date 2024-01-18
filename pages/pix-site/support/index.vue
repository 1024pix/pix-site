<template>
  <div>
    <div class="support__title" v-for="(item, index) in personas" :key="`persona-${index}`">
      <h1>{{item.name[0].text}}</h1>
    </div>
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
      const personas = documents.results.filter((persona) => {
        return !persona.data.parent_persona?.slug
      }).map((persona) => {
        return persona.data
      })
      console.log({personas})
      return { personas }
    } catch (error) {
      console.error(error)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="scss">
.support {
  &__title {

  }
}

</style>
