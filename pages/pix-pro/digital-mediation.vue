<template>
  <div class="page digital-mediation">
    <hero-banner
      :section-class="'digital-mediation__hero-banner'"
      :background-class="'hero-banner__background'"
      :content-class="'hero-banner__content'"
      :button-class="'hero-banner-content__button'"
      :slice="bannerSlice"
    >
    </hero-banner>

    <section-slice
      :slice="document[1]"
      :section-class="'partnerships'"
      :container-class="'container flex padding-container'"
      :flex-container-class="'partners'"
      :flex-content-class="'partner'"
    ></section-slice>

    <section-slice
      :slice="document[2]"
      :section-class="'diagnostic'"
      :container-class="'container flex padding-container'"
      :flex-container-class="'features'"
      :flex-content-class="'feature'"
    >
    </section-slice>

    <section-column-slice
      :slice="document[3]"
      :section-class="'certification'"
      :ul-class="'features'"
      :li-class="'feature'"
      :right-class="'certification-illustration'"
    >
    </section-column-slice>

    <section-slice
      :slice="document[4]"
      :section-class="'prescription'"
      :container-class="'container flex padding-container'"
      :flex-container-class="'features'"
      :flex-content-class="'feature'"
    >
    </section-slice>

    <section class="abc-pix">
      <div class="container padding-container">
        <div class="trapeze">
          <prismic-rich-text
            :field="document[5].primary.title"
            :class="'abc'"
          />
          <prismic-rich-text :field="document[5].primary.description" />

          <div class="container flex">
            <div
              v-for="(item, index) in document[5].items"
              :key="`item-${index}`"
              class="container-column"
            >
              <prismic-rich-text :field="item.column" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { documentFetcher, documents } from '~/services/document-fetcher'
import SectionSlice from '~/components/slices/PageSection'
import SectionColumnSlice from '~/components/slices/SectionColumn'
import HeroBanner from '~/components/slices/HeroBanner'

export default {
  nuxtI18n: {
    paths: {
      fr: '/mediation-numerique',
      'fr-fr': '/mediation-numerique',
      'en-gb': '/digital-mediation',
    },
  },
  components: {
    SectionSlice,
    SectionColumnSlice,
    HeroBanner,
  },

  async asyncData({ app, error, req, currentPagePath }) {
    try {
      const document = await documentFetcher(app.$prismic, app.i18n, req).get(
        documents.mediation
      )
      if (process.client) window.prismic.setupEditButton()
      return {
        currentPagePath,
        document: document.data.body,
        meta: document.data.meta,
        documentId: document.id,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  computed: {
    bannerSlice() {
      return {
        primary: {
          title: this.document[0].primary.title,
          description: this.document[0].items[0].description,
          button_link: this.document[0].items[0].link_button,
          button_title: this.document[0].items[0].title_button,
        },
      }
    },
  },

  head() {
    const meta = this.$getMeta(this.meta, this.currentPagePath, this.$prismic)
    return {
      meta,
    }
  },
}
</script>

<style lang="scss">
.digital-mediation {
  color: #222222;

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

  .abc h1 {
    color: $white;
  }

  h1 {
    font-family: 'Open Sans', Arial, sans-serif;
    font-weight: bold;
    margin: 0 0 30px;
    font-size: 1.875rem;
    line-height: 2.375rem;

    @include device-is('tablet') {
      font-size: 2.875rem;
      line-height: 3.875rem;
    }
  }

  h2 {
    font-family: 'Open Sans', Arial, sans-serif;
    font-size: 2.25rem;
    line-height: 3.125rem;
    font-weight: normal;
    margin: 0;
    text-align: center;
    padding: 40px 0;

    @include device-is('tablet') {
      padding-bottom: 10px;
    }
  }

  h3 {
    font-family: 'Open Sans', Arial, sans-serif;
    font-weight: 300;
    font-size: 1.375rem;
    line-height: 1.875rem;
    margin: 0 0 15px;
  }

  h4 {
    font-family: 'Open Sans', Arial, sans-serif;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: normal;
    margin: 0 0 5px;
  }

  p {
    font-family: 'Open Sans', Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.6rem;
    font-weight: 300;
    margin: 0 0 15px;

    &.block-img {
      text-align: center;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    @include device-is('tablet') {
      flex-direction: row;
      justify-content: space-between;
    }

    li {
      margin: 0;
      padding: 0;
      flex-basis: 0;
      flex-grow: 1;
      text-align: center;
      box-sizing: border-box;

      @include device-is('tablet') {
        margin: 0;
      }

      &::before {
        content: '';
        margin: 0;
        padding: 0;
      }
    }
  }

  section {
    position: relative;

    .features-wrapper {
      display: flex;
      flex-direction: column;

      @include device-is('tablet') {
        flex-direction: row;
        justify-content: space-between;
      }

      .features {
        display: flex;
        flex-direction: column;

        @include device-is('tablet') {
          flex-direction: row;
          margin-left: -15px;
        }

        .feature {
          display: block;
          text-align: left;
          margin-bottom: 15px;

          @include device-is('tablet') {
            margin-bottom: 0;
            padding-left: 15px;
            min-width: 50%;
            max-width: 50%;
          }

          p {
            @include device-is('tablet') {
              min-height: 140px;
            }
          }
        }
      }
    }

    .container-flex {
      display: flex;
      flex-direction: column;

      @include device-is('tablet') {
        flex-direction: row;
        flex-flow: row wrap;
        justify-content: space-between;
      }
    }

    .container-column {
      width: 100%;
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }
      .block-img {
        height: 25px;
        align-self: center;

        & > img {
          width: 50px;
        }
      }

      @include device-is('tablet') {
        width: 50%;
      }
    }

    .hero-banner {
      &__background {
        position: absolute;
        background: linear-gradient(
            180deg,
            rgba(18, 163, 255, 0.65),
            rgba(61, 104, 255, 0.65)
          ),
          url(/images/background-hero-mednum.png);
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
              180deg,
              rgba(18, 163, 255, 0.65),
              rgba(61, 104, 255, 0.65)
            ),
            url(/images/background-hero-mednum.png);
          background-repeat: no-repeat;
          background-size: cover;
          background-position: top center;
        }
      }

      &__content {
        h1 {
          font-size: 30px;
          line-height: 38px;
          margin-bottom: 20px;
          font-weight: 700;
          color: $white;
          text-align: left;

          @include device-is('large-mobile') {
            width: 450px;
          }
          @include device-is('tablet') {
            width: 686px;
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

    &.hero {
      height: 395px;
      overflow: hidden;
      color: white;
      padding-top: 60px;

      @include device-is('tablet') {
        padding: 200px 0 100px;
        height: 540px;
        padding-top: 160px;
      }

      .background {
        position: absolute;
        background: linear-gradient(
            180deg,
            rgba(18, 163, 255, 0.65) 0,
            rgba(61, 104, 255, 0.65) 100%
          ),
          url('/images/background-hero-mednum.png');
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
              180deg,
              rgba(18, 163, 255, 0.65) 0,
              rgba(61, 104, 255, 0.65) 100%
            ),
            url('/images/background-hero-mednum.png');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: top center;
        }
      }

      .padding-container {
        padding: 0 10px;
      }

      h1 {
        @include device-is('tablet') {
          max-width: 686px;
        }
      }
    }

    &.partnerships {
      @include device-is('tablet') {
        padding: 60px 0 80px;
      }

      h2 {
        margin-bottom: 30px;
      }

      background-color: $white;

      .container {
        width: 100%;

        @include device-is('tablet') {
          max-width: 1140px;
          margin: 0 auto;
        }
      }

      .partners {
        display: flex;
        flex-flow: column;

        @include device-is('large-mobile') {
          flex-flow: row wrap;
        }

        .partner {
          width: 100%;
          margin-bottom: 30px;

          @include device-is('tablet') {
            width: 50%;
            padding: 0 50px;
          }

          img {
            margin-bottom: 20px;
            max-width: 100%;

            @include device-is('tablet') {
              height: 100px;
              margin-bottom: 10px;
            }
          }
        }
      }
    }

    &.diagnostic {
      @include device-is('tablet') {
        padding: 60px 0 80px;
      }
      padding-bottom: 30px;

      @include device-is('tablet') {
        padding-top: 90px;
        padding-bottom: 80px;
      }

      h2 {
        padding-bottom: 10px;
      }

      h3 {
        text-align: center;
        max-width: 760px;
        margin: 0 auto 60px;

        @include device-is('tablet') {
          margin-bottom: 90px;
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
        background: $grey-3;
        transform: skewY(-3deg);
        transform-origin: bottom right;
      }

      .container {
        width: 100%;

        @include device-is('tablet') {
          max-width: 1140px;
          margin: 0 auto;
        }
      }

      .features {
        display: flex;
        flex-flow: column;
        padding: 0 20px;

        @include device-is('large-mobile') {
          flex-flow: row wrap;
        }

        .feature {
          width: 100%;
          margin-bottom: 30px;

          @include device-is('tablet') {
            width: 50%;
            padding: 0 50px;
          }
        }
      }
    }

    &.certification {
      color: white;
      padding: 30px 0 140px;

      @include device-is('tablet') {
        height: 790px;
        padding-bottom: 60px;
      }

      .background {
        position: absolute;
        background: linear-gradient(135.25deg, #985fff 0%, #388aff 100%);
        transform: skewY(3deg);
        transform-origin: bottom right;
        z-index: -1;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .container {
        width: 100%;

        @include device-is('tablet') {
          max-width: 1140px;
          margin: 0 auto;
        }
      }

      h2 {
        text-align: left;
        padding-top: 0;

        @include device-is('tablet') {
          margin-top: 30px;
        }
      }

      h4 {
        font-weight: 600;
      }

      p {
        font-weight: 400;
      }

      .features {
        display: flex;
        flex-direction: column;

        .feature {
          text-align: left;
          margin-top: 30px;

          @include device-is('tablet') {
            margin-top: 60px;
          }
        }
      }

      .certification-illustration {
        background: url(/images/certif-illustration.png);
        background-repeat: no-repeat;
        display: block;
        height: 240px;
        width: 200px;
        content: ' ';
        background-size: 100%;
        position: absolute;
        left: 20%;

        @include device-is('tablet') {
          display: block;
          background: url('/images/certif-illustration@2x.png');
          background-repeat: no-repeat;
          background-size: 100%;
          position: absolute;
          top: 40px;
          left: auto;
          height: 100%;
          width: 600px;
          max-width: 50%;
        }
      }
    }

    &.prescription {
      padding-top: 140px;
      padding-bottom: 0;
      margin-top: -30px;

      @include device-is('tablet') {
        margin-top: -90px;
        padding-top: 60px;
      }

      h2 {
        padding-bottom: 10px;
      }

      h3 {
        text-align: center;
        max-width: 760px;
        margin: 0 auto 60px;

        @include device-is('tablet') {
          margin-bottom: 90px;
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
        background: white;
        transform: skewY(-3deg);
        transform-origin: top left;
      }

      .container {
        width: 100%;

        @include device-is('tablet') {
          max-width: 1140px;
          margin: 0 auto;
        }
      }

      .features {
        display: flex;
        flex-flow: column;

        @include device-is('large-mobile') {
          flex-flow: row wrap;
        }

        .feature {
          width: 100%;
          margin-bottom: 30px;

          @include device-is('tablet') {
            width: 50%;
            padding: 0 50px;
          }
        }
      }
    }

    &.abc-pix {
      padding: 0;
      margin-bottom: 90px;

      img {
        display: block;
      }

      h2 {
        color: white;
        text-align: left;
        padding-top: 0;

        @include device-is('tablet') {
          margin-bottom: 40px;
        }
      }

      h4 {
        font-weight: 600;
        text-transform: uppercase;
      }

      p {
        font-size: 1.125rem;
        line-height: 1.875rem;
        font-weight: 400;
        margin-bottom: 40px;
        max-width: 430px;
      }

      .container {
        width: 100%;

        @include device-is('tablet') {
          max-width: 1140px;
          margin: 0 auto;
        }
      }

      .trapeze {
        background: linear-gradient(to right, #ffbe00 0%, #ff9f00 100%);
        border-radius: 20px;
        padding: 15px;
        padding-bottom: 0;

        @include device-is('tablet') {
          padding: 70px;
        }

        .container {
          margin-left: -10px;
        }

        .container-column {
          padding-left: 10px;
        }
      }

      .info {
        &:before {
          display: block;
          content: ' ';
          margin: 30px auto;

          @include device-is('tablet') {
            position: absolute;
            display: inline-block;
          }
        }

        .info__body {
          @include device-is('tablet') {
            padding-left: 74px;
          }
        }
      }

      .info--experiment {
        &:before {
          background: url('/images/experiment-results-icon.svg') no-repeat;
          width: 51px;
          height: 65px;
        }
      }

      .info--forthcoming {
        &:before {
          background: url('/images/a-venir-icon.svg') no-repeat;
          width: 64px;
          height: 64px;
        }
      }
    }
  }
}
</style>
