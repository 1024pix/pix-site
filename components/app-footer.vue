<template>
  <footer>
    <div class="container padding-container">
      <div class="sitelogo">
        <a href=""
          ><img class="mb-2 logo" alt="pix" src="/images/pix-logo.svg"
        /></a>
        <div>
          <img
            style="margin-left: -4px;"
            class="ministere"
            alt="ministere de l education"
            src="/images/ministere-logo-2.svg"
          />
        </div>
      </div>
      <div class="sitenav">
        <div class="column">
          <about-nav />
        </div>
        <div class="column">
          <resources-nav />
        </div>
        <div class="padding social-links">
          <h4
            class="text text-sm text-up text-left text-black mb-3 semi-bold social-links__title"
          >
            Nous suivre
          </h4>
          <ul class="unstyled social-links__list">
            <li class="social-links__item social-link">
              <a
                class="social-link__facebook"
                href="https://www.facebook.com/Pix-148371465913378/"
                target="pix_facebook"
                ><i class="icon-parent"
                  ><img
                    style="max-width: 11px;"
                    alt="facebook"
                    src="/images/icn-facebook.svg"/></i
              ></a>
            </li>
            <li class="social-links__item social-link">
              <a
                class="social-link__twitter"
                href="https://twitter.com/pix_officiel"
                target="pix_twitter"
                ><i class="icon-parent"
                  ><img
                    style="max-width: 22px;"
                    alt="twitter"
                    src="/images/icn-twitter.svg"/></i
              ></a>
            </li>
            <li class="social-links__item social-link">
              <a
                class="social-link__linkedin"
                href="https://www.linkedin.com/company/gip-pix/"
                target="pix_linkedin"
                ><i class="icon-parent"
                  ><img
                    style="max-width: 23px;"
                    alt="linkedin"
                    src="/images/icn-linkedin.svg"/></i
              ></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import ResourcesNav from '~/components/resources-nav'
import AboutNav from '~/components/about-nav'

export default {
  name: 'AppFooter',
  components: {
    AboutNav,
    ResourcesNav
  }
}
</script>

<style lang="scss">
footer {
  background-color: #f5f5f5;
  padding-top: 34px;
  padding-bottom: 64px;

  @include device-is('tablet') {
    padding-top: 114px;
    padding-bottom: 64px;
  }

  ul,
  li {
    list-style: none;
  }

  .icon-parent {
    background-color: $blue-1;
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    border-radius: 3px;
    margin-right: 5px;
    transition: all ease-in 0.2s;

    &:hover {
      background-color: $blue-3;
      transition: all ease-out 0.25s;
    }
  }

  .sitelogo {
    margin-bottom: 40px;
    width: 50%;

    @include device-is('tablet') {
      margin-bottom: 0;
      width: 43%;
    }

    .ministere {
      max-width: 280px;

      @include device-is('large-mobile') {
        max-width: 100%;
        height: auto;
        display: block;
      }
    }

    img {
      display: block;
    }

    .logo {
      width: 50%;
    }
  }

  .sitenav {
    display: flex;
    flex-flow: column;
    width: 100%;

    @include device-is('large-mobile') {
      flex-flow: row;
    }

    @include device-is('tablet') {
      justify-content: flex-end;
    }

    .mb-2 {
      margin-bottom: 12px;

      @include device-is('large-mobile') {
        margin-bottom: 26px;
      }
    }

    .mb-3 {
      margin-bottom: 12px;

      @include device-is('large-mobile') {
        margin-bottom: 32px;
      }
    }

    .column {
      padding-right: 50px;
      margin-bottom: 26px;

      @include device-is('large-mobile') {
        margin-bottom: 0;
      }
    }

    .padding {
      @include device-is('tablet') {
        padding-left: 10px;
      }

      li {
        display: inline-block;
      }
    }
  }

  a {
    line-height: 28px !important;

    &:hover {
      color: $blue-1 !important;
    }
  }

  .container {
    display: flex;
    flex-flow: column;

    @include device-is('tablet') {
      flex-flow: row;
    }
  }
}
</style>
