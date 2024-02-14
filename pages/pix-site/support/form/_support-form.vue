<template>
  <EasiwareForm :solution-id="solution_id" :form-id="form_id"></EasiwareForm>
</template>
<script>
import { DOCUMENTS } from '~/services/document-fetcher'

export default {
  name: 'SupportForm',
  nuxtI18n: {
    paths: {
      en: '/support/form/:slug',
      fr: '/support/form/:slug',
      'fr-fr': '/support/form/:slug',
      'fr-be': '/support/form/:slug',
    },
  },
  async asyncData({ app, error, route }) {
    try {
      const locale = app.i18n.locale || app.i18n.defaultLocale
      const documents = await app.$prismic.api.query(
        [
          app.$prismic.predicates.at(
            'document.type',
            DOCUMENTS.EASIWARE_FORM_PAGE
          ),
          app.$prismic.predicates.at(
            `my.${DOCUMENTS.EASIWARE_FORM_PAGE}.uid`,
            route.params.slug
          ),
        ],
        { lang: locale }
      )
      return documents.results[0].data
    } catch (err) {
      console.error(err)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>
