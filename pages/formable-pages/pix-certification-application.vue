<template>
  <div>
    <formable-page
      :title="'pix-certification-application.page-title'"
      :form-id="$t('pix-certification-application.form-id')"
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
