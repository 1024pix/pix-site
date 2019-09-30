<template>
  <div>
    <formable-page
      :title="'pix-orga-higher-school-registration.page-title'"
      :form-id="$t('pix-orga-higher-school-registration.form-id')"
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
      'fr-be': '/formulaire/finalisation-pix-orga-sup',
      'en-gb': '/form/pix-orga-higher-school-registration'
    }
  }
}
</script>

<style lang="scss"></style>
