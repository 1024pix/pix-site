<template>
  <div>
    <formable-page
      :title="'contact-digital-mediation-page-title'"
      :form-id="'24665'"
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
      'en-gb': '/form/contact-digital-mediation'
    }
  }
}
</script>

<style lang="scss"></style>
