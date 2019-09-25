<template>
  <div class="page formable-page">
    <header class="page-header">
      <div class="container sm padding-container">
        <h1 class="page-header__title">
          {{ $t(title) }}
        </h1>
      </div>
    </header>
    <!-- eu.123formbuilder.com script begins here -->
    <script
      type="text/javascript"
      defer
      :src="formSrc"
      data-role="form"
      data-default-width="650px"
    ></script>
    <!-- eu.123formbuilder.com script ends here -->
  </div>
</template>

<script>
export default {
  name: 'FormablePage',
  props: {
    title: {
      type: String,
      default: ''
    },
    formId: {
      type: String,
      default: ''
    }
  },
  computed: {
    formSrc() {
      return `//eu.123formbuilder.com/embed/${this.formId}.js`
    }
  }
}
</script>

<style></style>
