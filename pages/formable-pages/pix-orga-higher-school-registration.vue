<template>
  <div>
    <formable-page
      :title="'pix-orga-higher-school-registration.page-title'"
      :form-id="$t('pix-orga-higher-school-registration.form-id')"
      :height="'1300px'"
    />
  </div>
</template>

<script>
import FormablePage from '~/components/formable-page'

export default {
  name: 'PixOrgaHigherSchoolRegistration',
  components: { FormablePage },
  nuxtI18n: {
    paths: {
      'fr-fr': '/formulaire/finalisation-pix-orga-sup',
      'en-gb': '/form/pix-orga-higher-school-registration',
    },
  },
  head() {
    const pageTitle = "Finaliser la demande d'espace | Pix Orga sup"
    return {
      title: pageTitle,
    }
  },
}
</script>

<style lang="scss"></style>
