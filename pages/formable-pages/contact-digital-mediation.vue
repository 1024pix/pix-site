<template>
  <div>
    <formable-page
      :title="'contact-digital-mediation.page-title'"
      :form-id="$t('contact-digital-mediation.form-id')"
      :height="'800px'"
    />
  </div>
</template>

<script>
import FormablePage from '~/components/formable-page'

export default {
  name: 'ContactDigitalMediation',
  components: { FormablePage },
  nuxtI18n: {
    paths: {
      'fr-fr': '/formulaire/contact-mediation-numerique',
      'en-gb': '/form/contact-digital-mediation',
    },
  },
  head() {
    const pageTitle = this.$t('page-titles.contact-digital-mediation')
    return {
      title: pageTitle,
    }
  },
}
</script>

<style lang="scss"></style>
