<template>
  <div class="page formable-page">
    <header class="page-header">
      <div class="container sm padding-container">
        <h1 class="page-header__title">
          {{ $t(title) }}
        </h1>
      </div>
    </header>
    <div class="formable-page__form" :style="`height:${height}`">
      <!-- eu.123formbuilder.com script begins here -->
      <iframe
        id="123formbuilder"
        allowTransparency="true"
        style="min-height: 300px; height: inherit; overflow: auto;"
        width="100%"
        name="123formbuilder"
        marginwidth="0"
        marginheight="0"
        frameborder="0"
        :src="formSrc"
      >
        <p>
          Your browser does not support iframes. The contact form cannot be
          displayed. Please use another contact method (phone, fax etc)
        </p>
      </iframe>
      <!-- eu.123formbuilder.com script ends here -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormablePage',
  props: {
    title: {
      type: String,
      default: '',
    },
    formId: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '600px',
    },
  },
  computed: {
    formSrc() {
      return `//eu.123formbuilder.com/my-contact-form-${this.formId}.html`
    },
  },
}
</script>
