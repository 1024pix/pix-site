<template>
  <section class="easiware-form">
    <div class="easiware-form__container">
      <slot></slot>
      <div id="easiwareform"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'EasiwareForm',
  props: {
    solutionId: {
      type: String,
      default: null,
    },
    formId: {
      type: Number,
      default: null,
    },
  },
  mounted: function () {
    this.$easiware.create({
      solutionId: this.solutionId,
      formId: this.formId,
      language: 'fr',
      elementToBuildIn: 'easiwareform',
    })
  },
}
</script>

<style lang="scss" scoped>
.easiware-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
  background-color: #452d9d;
}

.easiware-form__container {
  max-width: 34rem;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  line-height: 1.25;
}
</style>
