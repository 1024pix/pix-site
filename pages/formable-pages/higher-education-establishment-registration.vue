<template>
  <div>
    <formable-page
      :title="'higher-education-establishment-registration-page-title'"
      :form-id="'22367'"
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
      'en-gb': '/form/higher-education-establishment-registration'
    }
  }
}
</script>

<style lang="scss"></style>
