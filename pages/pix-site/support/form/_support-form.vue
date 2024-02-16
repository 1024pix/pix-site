<template>
  <EasiwareForm
    :solution-id="supportForm.solution_id"
    :form-id="supportForm.form_id"
  >
    <h1 v-if="supportForm.form_title?.length" class="easiware-form__title">
      {{ supportForm.form_title?.[0].text }}
    </h1>
    <prismic-rich-text
      v-if="supportForm.form_introduction?.length"
      :field="supportForm.form_introduction"
      class="easiware-form__introduction"
    />
    <!-- eslint-disable vue/no-v-html -->
    <p
      class="easiware-form__required-info"
      v-html="$t('support.form.required-info')"
    />
  </EasiwareForm>
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
      const supportForm = await app.$prismic.api.getByUID(
        DOCUMENTS.EASIWARE_FORM_PAGE,
        route.params.slug,
        {
          lang: locale,
        }
      )
      return { supportForm: supportForm.data }
    } catch (err) {
      console.error(err)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="scss" scoped>
.easiware-form__title {
  margin-bottom: 1em;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: $grey-90;
}

.easiware-form__introduction {
  margin: -0.5rem 0 2.5rem;
  color: $grey-60;
  font-family: $font-roboto;
}

.easiware-form__required-info {
  color: $grey-90;
  font-family: $font-roboto;
  font-size: 0.875rem;
  font-weight: 500;
}
</style>

<style lang="scss">
.easiware-form__required-info span {
  font-weight: 500;
  color: $red;
}
</style>
