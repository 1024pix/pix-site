<template>
  <div>
    <formable-page
      :title="'higher-education-establishment-registration.page-title'"
      :form-id="$t('higher-education-establishment-registration.form-id')"
      :height="'1400px'"
    />
  </div>
</template>

<script>
import FormablePage from '~/components/formable-page'

export default {
  name: 'HigherEducationEstablishmentRegistration',
  components: { FormablePage },
  nuxtI18n: {
    paths: {
      'fr-fr': '/formulaire/inscription-etablissement-superieur',
      'en-gb': '/form/higher-education-establishment-registration',
    },
  },
  head() {
    const pageTitle = 'Demande d’espace | Pix Orga sup'
    return {
      title: pageTitle,
    }
  },
}
</script>

<style lang="scss"></style>
