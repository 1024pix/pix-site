<template>
  <div id="easiwareform"></div>
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
#easiwareform {
  padding: 40px;
  display: flex;
  justify-content: center;
  background-color: #452d9d;
}
</style>
