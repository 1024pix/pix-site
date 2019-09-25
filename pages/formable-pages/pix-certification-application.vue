<template>
  <div>
    <formable-page
      :title="'pix-certification-application-page-title'"
      :form-id="'23331'"
    />
  </div>
</template>

<script>
import FormablePage from '~/components/formable-page'

export default {
  name: 'PixCertificationApplication',
  components: { FormablePage },
  nuxtI18n: {
    paths: {
      'fr-fr': '/formulaire/demande-agrement-centre-certification',
      'en-gb': '/form/pix-certification-application'
    }
  }
}
</script>

<style lang="scss"></style>
