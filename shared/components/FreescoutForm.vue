<template>
  <section class="freescout-form">
    <div class="freescout-form__container">
      <slot></slot>
      <iframe ref="iframeRef" class="freescout-form__iframe" :src="freescoutUrl" @load="resizeIframe()">
        {{ $t(`form.not-supported`) }}
      </iframe>
    </div>
  </section>
</template>

<script setup>
const iframeRef = ref(null);
defineProps({
  freescoutUrl: {
    type: String,
    default: null,
  },
});

const resizeIframe = () => {
  if (!iframeRef.value) return;

  try {
    const height = iframeRef.value.contentWindow.document.documentElement.scrollHeight;
    iframeRef.value.style.height = `${height}px`;
  } catch (e) {
    console.warn('Cannot access iframe content:', e);
  }
};
</script>

<style lang="scss" scoped>
.freescout-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
  background-color: #452d9d;
}

.freescout-form__container {
  position: relative;
  max-width: 50rem;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  line-height: 1.25;
  overflow: hidden;
}

.freescout-form__iframe {
  width:100%;
  border:none;
  height: 1000px;
}
</style>
