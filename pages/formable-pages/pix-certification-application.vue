<template>
  <div>
    <formable-page
      :title="'pix-certification-application.page-title'"
      :form-id="$t('pix-certification-application.form-id')"
      :height="'9000px'"
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
  },
  head() {
    const pageTitle = "Demande d'agrément comme centre de certification | Pix"
    return {
      title: pageTitle
    }
  }
}
</script>

<style lang="scss"></style>
