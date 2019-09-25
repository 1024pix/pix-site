<template>
  <div class="pop-in-campaigns" :class="{ collapse: isClose }">
    <div
      class="pop-in-campaigns-content"
      v-on="{ click: isClose ? togglePopIn() : null }"
    >
      <template v-if="!isClose">
        <img
          class="pop-in-campaigns-content__close"
          alt="close button"
          src="/images/close-icon.svg"
          @click="togglePopIn()"
        />
        <img
          class="pop-in-campaigns-content__logo"
          alt="Logo rejoindre une campagne"
          src="/images/logo-join-campaign.svg"
        />
      </template>
      <span class="pop-in-campaigns-content__title"
        ><prismic-rich-text :field="title" />
      </span>
    </div>
    <a
      v-if="!isClose"
      class="pop-in-campaigns__btn btn-primary"
      href="https://app.pix.fr/campagnes"
      >Saisir mon code</a
    >
  </div>
</template>

<script>
export default {
  name: 'PopInCampaigns',
  props: {
    content: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isClose: false
    }
  },
  computed: {
    title() {
      return this.isClose
        ? this.content.primary.description
        : this.content.primary.title
    }
  },
  methods: {
    togglePopIn() {
      this.isClose = !this.isClose
    }
  }
}
</script>

<style lang="scss">
.pop-in-campaigns {
  transform: none;
  position: fixed;
  z-index: 400;
  bottom: 10px;
  right: 0;
  margin: 0 5px;
  width: calc(100% - 10px);
  height: 80px;
  background-color: $white;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  transition: height 0.6s ease-in, width 0.6s;

  @include device-is('large-mobile') {
    right: 23px;
    width: 397px;
    height: 289px;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }

  &.collapse {
    width: 40px;
    height: 145px;
    border-radius: 8px;
    background-color: $white;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  }

  &__btn {
    margin: 15px auto;
    width: 116px;
    height: 50px;
    padding: 5px;

    font-size: 1rem;
    font-family: $roboto;
    font-weight: 200;
    line-height: 1.25rem;
    text-align: center;

    @include device-is('large-mobile') {
      width: 190px;
      height: 50px;
      margin-top: 35px;
      padding-top: 15px;

      font-size: 1rem;
      letter-spacing: 0.5px;

      border-radius: 4px;
    }
  }
}

.pop-in-campaigns-content {
  margin-top: 2px;
  margin-left: 2px;
  width: 213px;
  height: 76px;
  display: flex;
  background: $gradient-purple;
  border-radius: 6px 0 0 6px;

  @include device-is('large-mobile') {
    margin: 6px 6px;
    height: 163px;
    width: 385px;
    border-radius: 2px 2px 0 0;
  }

  &__close {
    display: none;

    @include device-is('large-mobile') {
      position: absolute;
      top: 20px;
      right: 20px;
      display: block;
      opacity: 0.5;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
        cursor: pointer;
      }
    }
  }

  &__logo {
    width: 62.5px;
    height: 62.5px;
    margin-top: 13px;
    margin-left: 9px;

    @include device-is('large-mobile') {
      width: 135px;
      height: 135px;
      margin-top: 28px;
      margin-left: 18px;
    }
  }

  &__title {
    width: 116px;
    height: 36px;
    margin-top: 20.5px;
    margin-left: 12.5px;
    font-family: $open-sans;
    font-size: 0.9rem;
    line-height: 1.125rem;
    color: $white;
    transition: none;

    @include device-is('large-mobile') {
      width: 214px;
      height: 107px;
      margin-top: 57.5px;
      margin-left: 18px;
      font-size: 1.5625rem;
      line-height: 1.75rem;
    }

    .bold {
      font-weight: bold;
    }
  }
}

.collapse > .pop-in-campaigns-content {
  height: 139px;
  width: 34px;
  margin: 3px;
  border-radius: 5px;
  background: $gradient-purple;
  transition: height 0.6s ease-in, width 0.6s;

  &:hover {
    cursor: pointer;
  }
}

.collapse > .pop-in-campaigns-content > .pop-in-campaigns-content__title {
  margin: 16px 0;
  display: block;
  font-family: 'Open Sans';
  color: $white;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.375rem;
  white-space: nowrap;
  transform: rotate(-90deg);

  /*  Support IE */
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    position: relative;
    top: 42px;
    left: 40px;
  }
}
</style>
