<template>
  <div>
    <formable-page
      :title="'pix-orga-registration.page-title'"
      :form-id="$t('pix-orga-registration.form-id')"
      :height="'1000px'"
    />
  </div>
</template>

<script>
import FormablePage from '~/components/formable-page'

export default {
  name: 'PixOrgaRegistration',
  components: { FormablePage },
  nuxtI18n: {
    paths: {
      'fr-fr': '/formulaire/contact-pix-pro',
      'en-gb': '/form/pix-orga-registration'
    }
  }
}
</script>

<style lang="scss"></style>
