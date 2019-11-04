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

    <section class="section-demo">
      <div class="container padding-container">
        <prismic-rich-text :field="document[1].primary.card_title" />
        <div class="courses">
          <div
            v-for="(item, index) in document[1].items"
            :key="`item-${index}`"
            class="course"
          >
            <div class="course__icon">
              <prismic-image :field="item.image" />
            </div>
            <prismic-rich-text :field="item.card_title" class="course__title" />
            <prismic-rich-text
              :field="item.card_subtitle"
              class="course__challenges"
            />
            <prismic-rich-text
              :field="item.card_description"
              class="course__description"
            />
            <div class="course__start-button">
              <a :href="item.card_button_link.url" target="pix_app">
                {{ $prismic.richTextAsPlain(item.card_button_title) }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

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
import SectionSlice from '~/components/slices/section'
import PopInCampaigns from '~/components/pop-in-campaigns'
export default {
  components: { PopInCampaigns, HeroBanner, SectionSlice },
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
            width: 20%;
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
      }
    }
  }

  .section-demo {
    background-color: #eeeeee;
    padding: 60px 0;

    @include device-is('tablet') {
      padding: 100px 80px;
    }

    h2 {
      text-align: center;
      margin-top: 0;
      margin-bottom: 40px;
      font-size: 32px;
      font-weight: 800;
      color: $grey-6;
    }

    .courses {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      @include device-is('tablet') {
        flex-direction: row;
        flex-wrap: nowrap;
      }

      .course {
        width: 220px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
        background: $white;
        border-radius: 5px;
        margin: 0 10px 20px;

        @include device-is('tablet') {
          margin-bottom: 0;
        }

        .course__icon {
          height: 120px;
          margin-bottom: 20px;

          img {
            border-radius: 5px 5px 0 0;
            height: 100%;
            width: 100%;
          }
        }

        .course__title h4 {
          color: #3e4149;
          font-size: 20px;
          line-height: 20px;
          text-align: center;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .course__challenges {
          color: #7d808a;
          font-size: 12px;
          line-height: 16px;
          text-align: center;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .course__description {
          font-style: italic;
          font-size: 14px;
          line-height: 18px;
          text-align: center;
          margin-bottom: 20px;
          padding: 0 10px;
          color: #6a6d76;
          height: 54px;
        }

        .course__start-button {
          color: $blue-1;
          text-transform: capitalize;
          font-size: 14px;
          font-weight: 600;
          line-height: 18px;
          background-color: #fafafa;
          height: 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 0 0 5px 5px;
          border-top: 1px solid $grey-7;

          a {
            color: inherit !important;
          }
        }
      }
    }
  }
}
</style>
