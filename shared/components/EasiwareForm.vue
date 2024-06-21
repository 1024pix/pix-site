<template>
  <section class="easiware-form">
    <div class="easiware-form__container">
      <slot></slot>
      <div id="easiwareform"></div>
    </div>
  </section>
</template>

<script setup>
import { create as createEasiwareForm } from '@shared/services/easiware';

const props = defineProps({
  solutionId: {
    type: String,
    default: null,
  },
  formId: {
    type: Number,
    default: null,
  },
});

onMounted(() => {
  createEasiwareForm({
    solutionId: props.solutionId,
    formId: props.formId,
    elementToBuildIn: 'easiwareform',
  });
});
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
  position: relative;
  max-width: 34rem;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  line-height: 1.25;
  overflow: hidden;
}
</style>
