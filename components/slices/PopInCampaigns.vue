<template>
  <div
    :id="`slice-${indexForId}`"
    class="pop-in-campaigns"
    :class="{ collapse: isClosed }"
  >
    <div
      class="pop-in-campaigns-content"
      v-on="isClosed ? { click: togglePopIn } : {}"
    >
      <template v-if="!isClosed">
        <img
          class="pop-in-campaigns-content__close"
          alt="Fermer le panneau des campagnes"
          src="/images/close-icon.svg"
          @click="togglePopIn()"
        />
        <img
          class="pop-in-campaigns-content__logo"
          alt=""
          src="/images/logo-join-campaign.svg"
        />
      </template>
      <prismic-rich-text
        :field="description"
        class="pop-in-campaigns-content__title"
      />
    </div>
    <a
      v-if="!isClosed"
      class="pop-in-campaigns__btn"
      :href="slice.primary.button_link.url"
      >{{ $prismic.asText(slice.primary.button_title) }}</a
    >
  </div>
</template>

<script>
export default {
  name: 'PopInCampaigns',
  props: {
    slice: {
      type: Object,
      default: null,
    },
    indexForId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isClosed: false,
    }
  },
  computed: {
    description() {
      return this.isClosed
        ? this.slice.primary.short_description
        : this.slice.primary.description
    },
  },
  methods: {
    togglePopIn() {
      this.isClosed = !this.isClosed
    },
  },
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

    font-family: $font-roboto;
    font-size: 1rem;
    font-family: $font-roboto;
    font-weight: 200;
    line-height: 1.25rem;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    user-select: none;
    letter-spacing: 0.5px;
    text-decoration: none;

    position: relative;
    background: $blue;
    color: $white;
    border-radius: 5px;
    -webkit-backface-visibility: hidden;
    z-index: 1;

    &:hover {
      background-color: $blue-hover;
      transition: all ease-out 0.25s;
    }

    span {
      position: relative;
      z-index: 3;
    }

    @include device-is('large-mobile') {
      width: 190px;
      margin-top: 35px;
      padding-top: 15px;
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
  background: $default-gradient;
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
    font-family: $font-open-sans;
    font-size: 0.9rem;
    line-height: 1.125rem;
    color: $white;
    transition: none;

    p {
      margin: 0;
    }

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
  background: $default-gradient;
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
