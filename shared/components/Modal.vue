<template>
  <div ref="modalRef" tabindex="0" class="modal" @click="$emit('closeModal')" @keydown.esc="$emit('closeModal')">
    <div class="modal__content" @click.stop="">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

defineEmits(['closeModal']);

const modalRef = ref(null);

onMounted(() => {
  modalRef.value.focus();
});
</script>

<style lang="scss">
.modal {
  position: fixed;
  z-index: 1;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.5);
}
</style>
