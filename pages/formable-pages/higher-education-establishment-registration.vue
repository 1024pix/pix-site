<template>
  <div>
    <formable-page
      :title="'higher-education-establishment-registration.page-title'"
      :form-id="$t('higher-education-establishment-registration.form-id')"
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
      'fr-be': '/formulaire/inscription-etablissement-superieur',
      'en-gb': '/form/higher-education-establishment-registration'
    }
  }
}
</script>

<style lang="scss"></style>
