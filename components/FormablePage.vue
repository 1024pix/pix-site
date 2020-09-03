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

<style lang="scss">
.page.formable-page {
  padding-bottom: 40px;
  font-family: Roboto, Arial, sans-serif;

  h1.Formable__Title {
    display: none;
  }

  h2.Formable__Title {
    margin: 40px 0 20px;
  }

  .Formable__Label {
    font-weight: 500;
    font-size: 15px;
    color: $grey-6;
  }

  .Formable__Input,
  .Formable__Select,
  .Formable__TextArea {
    font-weight: 400;
    font-size: 16px;
    color: $grey-1;
    border: 2px solid $grey-7;
    border-radius: 4px;
    background-color: $white;
    padding: 15px;
    outline: none;
    width: 100%;

    &:active,
    &:focus {
      border-color: $blue-1;
    }
  }

  .Formable__Select {
    height: 53px;
  }

  .Formable__SubmitContainer {
    text-align: center;
  }

  .Formable__SubmitButton {
    background-color: $blue-1;
    border-radius: 4px;
    font-family: Roboto, Arial, sans-serif;
    padding: 12px 30px;

    &:active,
    &:hover,
    &:focus {
      background-color: $blue-3;
    }
  }

  .Formable__OptionsContainer {
    .Formable__Option {
      display: block;
      margin-bottom: 0.5em;
    }
  }

  .form-legal-notices {
    font-size: 14px;
    text-align: justify;
    font-weight: 300;
    font-style: italic;
    padding-top: 25px;
  }
}
</style>
