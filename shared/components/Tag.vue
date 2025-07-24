<template>
  <span class="tag">{{ label }}</span>
</template>

<script setup>
defineProps({
  label: {
    required: true,
    type: String,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.tag {
  border-radius: 2rem;
  background: $blue;
  color: $grey-5;
  padding: .5rem 1rem;
}
</style>
