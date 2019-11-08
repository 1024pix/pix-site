<template>
  <div class="about">
    <hero-banner
      :section-class="'about__hero-banner'"
      :background-class="'hero-banner__background'"
      :content-class="'hero-banner__content'"
      :button-class="'hero-banner-content__button'"
      :content="document[0]"
    />

    <section-slice
      :content="document[1]"
      :section-class="'about__mission'"
      :container-class="'mission__container'"
      :flex-container-class="'mission-container__list'"
      :flex-content-class="'mission-container-list__item'"
    >
    </section-slice>

    <section-column-slice
      :content="document[2]"
      :section-class="'about__goal'"
      :ul-class="'goal__list'"
      :li-class="'goal__item'"
      :right-class="'goal__image'"
    >
    </section-column-slice>

    <section-slice
      :content="document[3]"
      :section-class="'about__public-service'"
      :container-class="'public-service__container'"
      :flex-container-class="'public-service-container__list'"
      :flex-content-class="'public-service-container-list__item'"
    >
    </section-slice>

    <section-slice
      :content="document[4]"
      :section-class="'about__co-built-service'"
      :container-class="'co-built-service__container'"
      :flex-container-class="'co-built-service-container__list'"
      :flex-content-class="'co-built-service-container-list__item'"
    >
    </section-slice>
    <prismic-edit-button :document-id="documentId" />
  </div>
</template>
<script>
import { documents, documentFetcher } from '~/services/document-fetcher'
import HeroBanner from '~/components/slices/hero-banner'
import SectionSlice from '~/components/slices/section'
import SectionColumnSlice from '~/components/slices/section-column'

export default {
  name: 'About',
  components: { HeroBanner, SectionColumnSlice, SectionSlice },
  nuxtI18n: {
    paths: {
      'fr-fr': '/qui-sommes-nous',
      'en-gb': '/about'
    }
  },
  async asyncData({ app, error, req, currentPagePath }) {
    try {
      const document = await documentFetcher(app.i18n, req).get(documents.about)
      if (process.client) window.prismic.setupEditButton()
      return {
        currentPagePath,
        document: document.data.body,
        meta: document.data.meta,
        documentId: document.id
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    const meta = this.$getMeta(this.meta, this.currentPagePath, this.$prismic)
    return {
      meta
    }
  }
}
</script>

<style lang="scss">
.about {
  h1,
  h2,
  h3,
  h4,
  p {
    font-family: 'Open Sans', Arial, sans-serif;
  }

  &__hero-banner {
    height: 395px;
    overflow: hidden;
    color: white;
    padding-top: 60px;
    position: relative;

    @include device-is('tablet') {
      padding: 200px 0 100px;
      height: 540px;
      padding-top: 160px;
    }
  }

  .hero-banner {
    &__background {
      position: absolute;
      background: linear-gradient(
          135deg,
          rgba(152, 95, 255, 0.7) 0,
          rgba(56, 138, 255, 0.7) 100%
        ),
        url('/images/img-hero_mobile.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: top center;
      transform-origin: top left;
      transform: skewY(-3deg);
      z-index: -1;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: 100%;

      @include device-is('tablet') {
        background: linear-gradient(
            135deg,
            rgba(152, 95, 255, 0.7) 0,
            rgba(56, 138, 255, 0.7) 100%
          ),
          url('/images/img-hero_desktop.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top center;
      }
    }

    &__content {
      h1 {
        font-size: 30px;
        line-height: 38px;
        margin-top: 100px;
        margin-bottom: 20px;
        font-weight: 700;
        color: $white;
        text-align: left;

        @include device-is('large-mobile') {
          width: 450px;
        }
        @include device-is('tablet') {
          width: 600px;
          font-size: 46px;
          line-height: 62px;
        }
      }

      max-width: 1140px;
      margin: 0 auto;
      padding: 0 20px;
    }

    &-content {
      &__button {
        font-family: 'Roboto', Arial, sans-serif;
        display: inline-block;
        cursor: pointer;
        user-select: none;
        font-size: 16px;
        letter-spacing: 0.5px;
        text-decoration: none;
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        position: relative;
        background: linear-gradient(180deg, #ffbe00 0%, #ff9f00 100%);
        color: #222;
        border-radius: 5px;
        -webkit-backface-visibility: hidden;
        z-index: 1;

        &:hover {
          transition: opacity 0.5s ease-out;
          background: linear-gradient(180deg, #ff9d00 0%, #ff7900 100%);
        }

        &:hover:after {
          opacity: 1;
        }

        span {
          position: relative;
          z-index: 3;
        }
      }
    }
  }

  &__mission {
    position: relative;
    padding: 70px 20px 40px;
    margin-bottom: 36px;

    @include device-is('large-mobile') {
      margin-bottom: 60px;
      padding-left: 0;
      padding-right: 0;
    }
    @include device-is('tablet') {
      padding-top: 80px;
      padding-bottom: 140px;
    }

    h2 {
      font-weight: 400;
      text-align: center;
      font-size: 36px;
      line-height: 49px;
      padding-bottom: 60px;
      margin: 0;
    }

    h3 {
      margin-bottom: 72px;
      margin-top: 0;
      font-weight: 300;
      text-align: center;
      font-size: 18px;
      line-height: 24px;

      @include device-is('large-mobile') {
        padding: 0 90px;
      }
      @include device-is('tablet') {
        padding: 0 0;
        font-size: 22px;
        line-height: 30px;
      }
    }

    .background {
      position: absolute;
      z-index: -1;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: $white;
      transform: skewY(-3deg);
      transform-origin: bottom right;
    }
  }

  .mission {
    &__container {
      max-width: 1140px;
      margin: 0 auto;
    }

    &-container {
      &__list {
        display: flex;
        flex-flow: column;

        @include device-is('large-mobile') {
          flex-flow: row wrap;
        }
      }

      &-list {
        &__item {
          width: 100%;
          text-align: left;

          @include device-is('large-mobile') {
            width: 50%;
            padding: 0 38px;
          }
          @include device-is('tablet') {
            padding: 0 50px;
          }

          h3 {
            line-height: 1rem;
            font-weight: 700;
            margin: 0 0 15px;
            font-size: 1rem;
            text-align: left;
          }

          p {
            font-weight: 300;
            font-size: 15px;
            line-height: 24px;
          }
        }
      }
    }
  }

  &__goal {
    height: 690px;
    color: white;
    padding-top: 60px;
    position: relative;

    @include device-is('tablet') {
      padding: 200px 0 100px;
      height: 860px;
      padding-top: 160px;
    }

    .background {
      position: absolute;
      background: linear-gradient(
          135deg,
          rgba(255, 190, 0, 0.7) 0,
          rgba(255, 159, 0, 0.7) 100%
        ),
        url('/images/img-dev_mobile.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      transform-origin: top left;
      transform: skewY(-3deg);
      z-index: -1;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: 100%;

      @include device-is('tablet') {
        background: linear-gradient(
            135deg,
            rgba(255, 190, 0, 0.7) 0,
            rgba(255, 159, 0, 0.7) 100%
          ),
          url(/images/img-dev_desktop.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
      }
    }

    h2 {
      text-align: left;
      font-weight: 700;
      font-size: 1.875rem;
      line-height: 2.375rem;

      @include device-is('tablet') {
        font-size: 2.875rem;
        line-height: 3.875rem;
      }
    }
  }

  .goal {
    &__list {
      ul,
      li {
        list-style: none;
        padding: 0;
      }

      li:before {
        content: none;
      }

      p {
        margin-bottom: 24px;
        font-size: 1rem;
        line-height: 1.6rem;
        font-weight: 600;

        @include device-is('tablet') {
          font-size: 1.25rem;
          line-height: 1.75rem;
        }
      }
    }
  }

  &__public-service {
    position: relative;
    padding: 50px 20px;
    margin-top: -95px;

    @include device-is('large-mobile') {
      padding-left: 0;
      padding-right: 0;
    }
    @include device-is('tablet') {
      padding-top: 80px;
      padding-bottom: 120px;
    }

    h2 {
      font-size: 2.25rem;
      line-height: 3.125rem;
      font-weight: 400;
      text-align: center;
      padding: 40px 0;
      margin: 0;

      @include device-is('large-mobile') {
        padding: 0 90px;
      }
      @include device-is('tablet') {
        padding: 0 0 20px;
      }
    }

    h3 {
      text-align: center;
      font-size: 1rem;
      font-weight: 300;
      line-height: 1.5rem;
      margin-bottom: 20px;
      margin-top: 0;
    }

    .background {
      position: absolute;
      z-index: -1;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: $grey-3;
      transform: skewY(3deg);
      transform-origin: bottom right;
    }
  }

  .public-service {
    &__container {
      max-width: 1140px;
      margin: 0 auto;
      padding-bottom: 40px;
    }

    &-container {
      &__list {
        display: flex;
        flex-flow: column;
        padding: 20px;

        @include device-is('large-mobile') {
          flex-flow: row wrap;
        }
      }

      &-list {
        &__item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          @include device-is('large-mobile') {
            width: 20%;
            padding: 0 10px;
          }
          @include device-is('tablet') {
            padding: 0 10px;
          }

          div {
            display: flex;
            justify-content: center;
          }

          p {
            &.block-img {
              display: block;
              text-align: center;
              margin: 0;

              @include device-is('tablet') {
                display: flex;
              }

              img {
                max-height: 146px;
                width: 100%;
              }
            }
          }
        }
      }
    }
  }

  &__co-built-service {
    position: relative;
    padding: 70px 20px 40px;
    margin-bottom: 36px;

    @include device-is('large-mobile') {
      margin-bottom: 60px;
      padding-left: 0;
      padding-right: 0;
    }
    @include device-is('tablet') {
      padding-top: 80px;
      padding-bottom: 50px;
    }

    .background {
      background: $white;
    }
  }

  .co-built-service {
    &__container {
      h2 {
        margin-top: 0;
        font-weight: 400;
        text-align: center;
        margin-bottom: 16px;
        font-size: 36px;
        line-height: 49px;
      }

      h3 {
        margin-bottom: 72px;
        margin-top: 0;
        font-weight: 300;
        text-align: center;
        font-size: 18px;
        line-height: 24px;
        @include device-is('tablet') {
          font-size: 22px;
          line-height: 30px;
        }
      }

      max-width: 1140px;
      margin: 0 auto;
      text-align: center;
    }

    &-container {
      &__list {
        display: flex;
        flex-flow: column;
        text-align: left;
        @include device-is('large-mobile') {
          flex-flow: row wrap;
        }
      }

      &__button {
        font-family: 'Roboto', Arial, sans-serif;
        display: inline-block;
        cursor: pointer;
        user-select: none;
        font-size: 16px;
        letter-spacing: 0.5px;
        text-decoration: none;
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        position: relative;
        background: linear-gradient(180deg, #ffbe00 0%, #ff9f00 100%);
        color: #222;
        border-radius: 5px;
        -webkit-backface-visibility: hidden;
        z-index: 1;

        &:hover {
          transition: opacity 0.5s ease-out;
          background: linear-gradient(180deg, #ff9d00 0%, #ff7900 100%);
        }

        &:hover:after {
          opacity: 1;
        }

        span {
          position: relative;
          z-index: 3;
        }
      }

      &-list {
        &__item {
          width: 100%;

          @include device-is('large-mobile') {
            width: 25%;
            padding: 0 30px;
          }

          h4 {
            font-weight: 400;
            text-align: left;
            margin-bottom: 6px;
            font-size: 20px;
            line-height: 27px;
          }

          p {
            font-weight: 300;
            font-size: 15px;
            line-height: 24px;
            text-align: center;

            .big-blue {
              font-weight: 700;
              font-size: 5rem;
              line-height: 10rem;
              display: block;
              color: $blue-1;
              margin: 0;
            }
          }
        }
      }
    }
  }
}
</style>
