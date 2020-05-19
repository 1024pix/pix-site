<template>
  <div class="index">
    <pop-in-campaigns :content="document[3]" />
    <hero-banner
      :section-class="'index__hero-banner'"
      :background-class="'hero-banner__background'"
      :content-class="'hero-banner__content'"
      :button-class="'hero-banner-content__button'"
      :content="document[0]"
    >
    </hero-banner>

    <img-text-column-slice
      :content="document[1]"
      :section-class="'section-demo'"
      :container-class="'section-demo__container'"
      :button-class="'section-demo__button'"
    ></img-text-column-slice>

    <section-slice
      :content="document[2]"
      :section-class="'index__features'"
      :container-class="'features__container'"
      :flex-container-class="'features-container__list'"
      :flex-content-class="'features-container-list__item'"
    >
    </section-slice>
    <prismic-edit-button :document-id="documentId" />
  </div>
</template>

<script>
import { documents, documentFetcher } from '~/services/document-fetcher'
import HeroBanner from '~/components/slices/hero-banner'
import ImgTextColumnSlice from '~/components/slices/img-text-column'
import SectionSlice from '~/components/slices/section'
import PopInCampaigns from '~/components/pop-in-campaigns'
export default {
  components: { PopInCampaigns, HeroBanner, SectionSlice, ImgTextColumnSlice },
  async asyncData({ app, error, req, currentPagePath }) {
    try {
      const document = await documentFetcher(app.i18n, req).get(documents.index)
      if (process.client) window.prismic.setupEditButton()
      return {
        currentPagePath,
        meta: document.data.meta,
        document: document.data.body,
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
.index {
  h1,
  h2,
  h3,
  h4,
  p {
    font-family: 'Open Sans', Arial, sans-serif;
  }

  &__hero-banner {
    overflow: hidden;
    color: white;
    padding-top: 60px;
    padding-bottom: 20px;
    position: relative;

    @include device-is('tablet') {
      padding: 200px 0 100px;
      padding-top: 100px;
    }
  }

  .hero-banner {
    &__background {
      position: absolute;
      background: url(/images/background-hero-mobile-index.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: top center;
      z-index: -1;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: 100%;

      @include device-is('tablet') {
        background: url('/images/background-hero-index.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top center;
      }
    }

    &__content {
      color: $grey-1;

      h1 {
        font-size: 30px;
        line-height: 38px;
        margin-bottom: 20px;
        font-weight: 300;
        text-align: left;

        @include device-is('large-mobile') {
          width: 450px;
        }
        @include device-is('tablet') {
          width: 600px;
          font-size: 90px;
          line-height: 90px;
        }
      }

      h2 {
        font-weight: 300;
        margin-bottom: 40px;
        font-size: 16px;
        line-height: 22px;

        @include device-is('tablet') {
          font-size: 28px;
          line-height: 38px;
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
        background: $blue-1;
        color: $white;
        border-radius: 5px;
        -webkit-backface-visibility: hidden;
        z-index: 1;

        &:hover {
          transition: opacity 0.5s ease-out;
          background: $blue-3;
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

  &__features {
    position: relative;
    background-color: $white;
    padding: 50px 20px;

    @include device-is('large-mobile') {
      padding-left: 0;
      padding-right: 0;
    }
    @include device-is('tablet') {
      padding-top: 80px;
      padding-bottom: 120px;
    }

    h2 {
      @include device-is('large-mobile') {
        padding: 0 90px;
      }
      @include device-is('tablet') {
        padding: 0 0;
      }
    }

    .background {
      background: $white;
    }
  }

  .features {
    &__container {
      margin: 0 auto;

      h2 {
        margin-top: 26px;
        margin-bottom: 60px;
        font-weight: 400;
        text-align: center;
        font-size: 36px;
        line-height: 49px;
      }
    }

    &-container {
      &__list {
        display: flex;
        flex-flow: column;

        @include device-is('large-mobile') {
          margin: 0 30px;
          flex-flow: row wrap;
        }
      }

      &-list {
        &__item {
          width: 100%;
          text-align: center;

          @include device-is('large-mobile') {
            width: 33%;
            padding: 0 38px;
          }
          @include device-is('tablet') {
            padding: 0 50px;
          }

          p {
            &.block-img {
              height: 146px;

              display: flex;
              justify-content: center;

              img {
                max-height: 146px;
              }
            }
          }
        }
        &__item:nth-child(1):nth-last-child(5),
        &__item:nth-child(2):nth-last-child(4),
        &__item:nth-child(3):nth-last-child(3),
        &__item:nth-child(4):nth-last-child(2),
        &__item:nth-child(5):nth-last-child(1) {
          @include device-is('large-mobile') {
            width: 20%;
          }
        }
      }
    }
  }

  .section-demo {
    background-color: #eeeeee;
    padding: 60px 0;

    &__container .column {
      text-align: center;

      img {
        margin-bottom: 20px;
      }

      h1 {
        font-size: 36px;
        line-height: 49px;
        font-weight: 400;
      }

      p {
        margin: 20px 30px;
      }
    }

    &__button {
      display: inline-block;
      background: #3d68ff;
      color: #ffffff;
      border-radius: 5px;
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      letter-spacing: 0.5px;

      &:hover {
        transition: opacity 0.5s ease-out;
        background: $blue-3;
      }

      &:hover:after {
        opacity: 1;
      }
    }

    &__container {
      display: flex;
      flex-flow: column;
      align-items: center;

      @include device-is('tablet') {
        flex-flow: row wrap;
        justify-content: center;

        img {
          margin-right: 100px;
        }

        .column {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .column p {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
