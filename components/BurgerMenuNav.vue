<template>
  <div class="burger-navigation">
    <ul>
      <li
        v-for="item in items.navigationZone"
        :key="item.id"
        class="burger-navigation__link"
      >
        <pix-link :field="item.link">
          {{ $prismic.asText(item.name) }}
        </pix-link>
      </li>
    </ul>
    <ul>
      <li
        v-for="item in items.actionsZone"
        :key="item.id"
        class="burger-navigation__link"
        :class="item === signUpButton ? 'button' : 'login'"
      >
        <pix-link :field="item.link">
          {{ $prismic.asText(item.name) }}
        </pix-link>
      </li>
    </ul>
    <language-switcher type="only-text" />
  </div>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default {
  name: 'BurgerMenuNav',
  components: {
    LanguageSwitcher,
  },
  props: {
    items: {
      type: Object,
      default: null,
    },
  },
  computed: {
    signUpButton() {
      return this.items.actionsZone[this.items.actionsZone.length - 1]
    },
  },
}
</script>

<style lang="scss">
.navigation-slice-zone {
  .bm-menu {
    background: $white;

    @include device-is('large-screen') {
      display: none;
    }

    ul {
      margin: 24px 0 0 0;
      padding: 0;
      list-style: none;

      &:last-child {
        margin: 0;
      }

      & > li {
        padding-left: 0;

        &::before {
          display: none;
        }
      }
    }

    .burger-navigation {
      &__link {
        font-weight: 600;
        color: $white;
        text-align: left;
        margin-bottom: 24px;

        a {
          text-decoration: none;
          display: block;
          transition: 0.3s;
          font-size: 1rem;
          line-height: 1.5rem;
          color: $grey-60;

          &[href*='pro.pix'] {
            width: 256px;
            padding-top: 12px;
            border-top: 1px solid $grey-70;
          }

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .login > a {
        color: blue;
      }

      .button {
        width: 225px;
        margin-left: 0;

        a {
          color: $white;
        }
      }
    }
  }

  .bm-item-list {
    height: 100%;

    & > * {
      padding: 0;
      flex-direction: column;
      height: 100%;
    }
  }

  .bm-burger-bars {
    background-color: $grey-45;
  }

  .bm-burger-button {
    top: 25px;

    @include device-is('large-screen') {
      display: none;
    }
  }

  .bm-cross {
    background: $grey-45;
    height: 24px !important;
  }
}
.hot-news + .navigation-slice-zone {
  .bm-burger-button {
    margin-top: 70px;
    @include device-is('large-screen') {
      display: none;
    }
  }
}
</style>
