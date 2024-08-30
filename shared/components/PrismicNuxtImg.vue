<template>
  <nuxt-img v-bind="$attrs" :provider="provider" />
</template>

<script setup>
import { ref } from 'vue';

const { value: isPrismicPreviewEnabled } = useCookie('io.prismic.preview');

const { domainOrg } = useAppConfig();
const isDev = domainOrg.includes('integration');

const provider = ref(isPrismicPreviewEnabled && isDev ? 'prismic' : null);
</script>
