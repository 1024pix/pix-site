<template>
  <div class="nav-top">
    <ul>
      <li
        v-for="item in items"
        :key="item.id"
        :class="
          item.style === 'button' ? 'nav-top__link--login' : 'nav-top__link'
        "
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
      type: Array,
      default: null,
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
      padding-left: 0;
      list-style: none;

      & > li {
        padding-left: 0;

        &::before {
          display: none;
        }
      }
    }

    .nav-top {
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

          &:hover {
            text-decoration: underline;
          }
        }

        a[href*='app.pix'] {
          color: blue;
        }

        &--login {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 225px;
          height: 44px;
          background-color: $blue;
          border-radius: 4px;

          a {
            color: $white;
            font-size: 0.875rem;
            font-weight: 600;
          }
        }
      }
    }

    .bm-item-list {
      height: 100%;
      //padding: 0 25px;

      & > * {
        padding: 0;
        flex-direction: column;
        height: 100%;
      }
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
