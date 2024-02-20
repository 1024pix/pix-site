<template>
  <div id="easiwareform"></div>
</template>

<script setup>
import { create } from "../services/easiware.js";

const config = useRuntimeConfig();
const props = defineProps({
  "solutionId": {
    type: String,
    default: null
  },
  "formId": {
    type: String,
    default: null
  }
});

onMounted(() => {
  create({
    easiwareScriptUrl: config.public.easiwareScriptUrl,
    solutionId: props.solutionId,
    formId: props.formId,
    language: "fr",
    elementToBuildIn: "easiwareform"
  });
});
</script>

<style lang="scss" scoped>
#easiwareform {
  padding: 40px;
  display: flex;
  justify-content: center;
}
</style>
