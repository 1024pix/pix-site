<template>
  <section class="freescout-form">
    <div class="freescout-form__container">
      <slot></slot>
      <iframe ref="iframeRef" class="freescout-form__iframe" :src="freescoutUrl" :style="[iframeHeight]">
        {{ $t(`form.not-supported`) }}
      </iframe>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FreescoutForm',
  props: {
    freescoutUrl: {
      type: String,
      default: null,
    },
    heightForIframe: {
      type: String,
      default: null,
    },
  },
  computed: {
    iframeHeight() {
      const style = {};
      style.minHeight = (this.heightForIframe || '900') + 'px';
      return style;
    },
  },
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
