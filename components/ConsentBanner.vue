<template>
  <div v-if="isOpen" class="consent-banner">
    <iframe
      class="iframe"
      src="https://pix-stats.cloud-ed.fr/index.php?module=CoreAdminHome&action=optOut&language=fr"
    ></iframe>
    <img
      class="close"
      src="/images/close-icon-black.svg"
      alt="Fermer"
      @click.stop="closeBanner"
    />
  </div>
</template>

<script>
export default {
  name: 'ConsentBanner',
  data() {
    return {
      isOpen: true,
    }
  },
  methods: {
    closeBanner() {
      this.isOpen = false
    },
  },
}
</script>

<style lang="scss">
.consent-banner {
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 200;
  position: absolute;
  color: $grey-200;
  background-color: #ffbe00aa;

  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    padding: 10px 5px;

    text-align: center;
    line-height: 1rem;
    font-size: 0.875rem;
    margin: 0 auto;

    p {
      margin: 0;
    }
  }

  a {
    color: $grey-200;
    text-decoration: underline;
  }
}
.close {
  margin-right: 20px;
  opacity: 0.5;
  transition: 0.5s;
  cursor: pointer;
  height: 20px;

  @media (min-width: 769px) {
    margin-right: 32px;
  }

  &:hover {
    opacity: 1;
  }
}

.iframe {
  border: 0;
  width: 100%;
}
</style>
