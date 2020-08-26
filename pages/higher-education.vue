<template>
  <div class="page higher-education">
    <section class="hero">
      <div class="background"></div>
      <div class="container padding-container">
        <prismic-rich-text :field="document[0].primary.title" />
        <pix-link class="btn" :field="document[0].items[0].link_button">
          {{ $prismic.asText(document[0].items[0].title_button) }}
        </pix-link>
      </div>
    </section>

    <page-section
      :slice="document[1]"
      :section-class="'section-infos'"
      :flex-container-class="'features'"
      :flex-content-class="'feature'"
    >
    </page-section>

    <page-section
      :slice="document[2]"
      :section-class="'section-mesurer'"
      :flex-container-class="'features'"
      :flex-content-class="'feature'"
    >
    </page-section>

    <section-column-slice
      :slice="document[3]"
      :section-class="'section-developper'"
      :ul-class="'features'"
      :li-class="'feature'"
      :right-class="'section-developper__image'"
    >
    </section-column-slice>

    <page-section
      :slice="document[4]"
      :section-class="'section-valoriser'"
      :flex-container-class="'features'"
      :flex-content-class="'feature'"
    >
    </page-section>

    <section class="section-utiliser-pix">
      <prismic-rich-text :field="document[5].primary.title" />
      <div class="container">
        <div
          v-for="(item, index) in document[5].items"
          :key="`item-${index}`"
          class="column"
        >
          <prismic-rich-text :field="item.column_number" />
          <prismic-rich-text :field="item.column_title" />
          <hr class="text-left mb-2 mt-2" />
          <prismic-rich-text :field="item.column_description" />
        </div>
        <div style="margin: auto;">
          <a class="btn" :href="document[5].primary.button_link">
            {{ $prismic.asText(document[5].primary.button_text) }}
          </a>
        </div>
      </div>
    </section>

    <section class="section-comment-ca-marche">
      <prismic-rich-text :field="document[6].primary.title" />
      <div class="container">
        <div
          v-for="(item, index) in document[6].items"
          :key="`item-${index}`"
          class="column"
        >
          <div class="inner">
            <prismic-rich-text :field="item.card_title" />
            <prismic-rich-text :field="item.card_description" />
          </div>
        </div>
      </div>
    </section>
    <key-numbers :slice="keyNumbers" :content-id="keyNumbersId" />
  </div>
</template>

<script>
import { documents, documentFetcher } from '~/services/document-fetcher'
import PageSection from '@/components/slices/PageSection'
import SectionColumnSlice from '@/components/slices/SectionColumn'
import KeyNumbers from '@/components/slices/KeyNumbers'

export default {
  name: 'HigherEducation',
  nuxtI18n: {
    paths: {
      fr: '/enseignement-superieur',
      'fr-fr': '/enseignement-superieur',
      'en-gb': '/higher-education',
    },
  },
  components: { KeyNumbers, PageSection, SectionColumnSlice },
  async asyncData({ app, error, req, currentPagePath }) {
    try {
      const document = await documentFetcher(app.$prismic, app.i18n, req).get(
        documents.higherEducation
      )
      const keyNumbers = await documentFetcher(app.$prismic, app.i18n, req).get(
        documents.keyNumbers
      )

      return {
        currentPagePath,
        meta: document.data.meta,
        document: document.data.body,
        keyNumbers: keyNumbers.data,
        keyNumbersId: keyNumbers.id,
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error({ e })
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    const meta = this.$getMeta(this.meta, this.currentPagePath, this.$prismic)
    const pageTitle = this.$t('page-titles.higher-education')
    return {
      title: pageTitle,
      meta,
    }
  },
}
</script>

<style lang="scss">
.page.higher-education {
  color: #222222;

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

  .center {
    text-align: center;
    display: block;
  }
  section {
    position: relative;

    @include device-is('tablet') {
      padding: 60px 0 80px;
    }

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

    &.hero {
      height: 395px;
      overflow: hidden;
      color: white;
      padding-top: 60px;

      @include device-is('tablet') {
        height: 540px;
        padding: 120px 0 100px;
      }

      .background {
        position: absolute;
        background-image: linear-gradient(
            -180deg,
            rgba(18, 163, 255, 0.7) 0%,
            rgba(61, 104, 255, 0.7) 100%
          ),
          url('/images/background-hero-mobile-sup.jpg');
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
          background-image: linear-gradient(
              -180deg,
              rgba(18, 163, 255, 0.7) 0%,
              rgba(61, 104, 255, 0.7) 100%
            ),
            url('/images/background-hero-sup.jpg');
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

    &.section-infos {
      position: relative;
      padding: 40px 20px 0;

      @include device-is('large-mobile') {
        padding-top: 50px;
        padding-bottom: 0;
      }

      @include device-is('tablet') {
        padding-top: 80px;
        padding-bottom: 0;
      }

      .background {
        background-color: $white;
      }

      .features {
        display: flex;
        flex-direction: column;

        @include device-is('tablet') {
          flex-direction: row;
          margin-left: -15px;
          max-width: 1140px;
          margin: 0 auto;
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

            .block-img img {
              width: 100%;
            }
          }
        }
      }
    }

    &.section-mesurer {
      padding: 70px 20px 40px;

      @include device-is('large-mobile') {
        padding-left: 0;
        padding-right: 0;
      }

      @include device-is('tablet') {
        padding-top: 140px;
        padding-bottom: 90px;
      }

      h2 {
        text-align: center;
        margin-bottom: 16px;
      }

      h3 {
        text-align: center;
        margin-bottom: 72px;

        @include device-is('large-mobile') {
          padding: 0 90px;
        }
        @include device-is('tablet') {
          padding: 0 0;
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

      .features {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        @include device-is('tablet') {
          flex-direction: row;
          margin-left: -15px;
          max-width: 1140px;
          margin: 0 auto;
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

    &.section-valoriser {
      position: relative;
      padding-top: 60px;
      padding-bottom: 70px;
      padding-left: 20px;
      padding-right: 20px;

      @include device-is('large-mobile') {
        padding-left: 0;
        padding-right: 0;
      }
      @include device-is('tablet') {
        padding-top: 60px;
        padding-bottom: 100px;
      }

      h2 {
        text-align: center;
        margin-bottom: 16px;
      }

      h3 {
        text-align: center;
        margin-bottom: 72px;

        @include device-is('large-mobile') {
          padding: 0 90px;
        }
        @include device-is('tablet') {
          padding: 0 0;
        }
      }

      a {
        color: $blue-1;
        text-decoration: underline;
        font-weight: 600;

        &:hover {
          color: $pix-yellow;
        }
      }

      .features {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        @include device-is('tablet') {
          flex-direction: row;
          max-width: 1140px;
          margin: 0 auto;
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

    &.section-utiliser-pix {
      position: relative;
      background: linear-gradient(
          180deg,
          rgba(18, 163, 255, 0.9) 0%,
          rgba(61, 104, 255, 0.9) 100%
        ),
        url('/images/background-utiliser-pix.jpg');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      padding-top: 80px;
      padding-bottom: 70px;
      color: $white;

      h2 {
        text-align: center;
        margin-bottom: 60px;
      }

      .btn {
        margin-top: 60px;
      }

      .container {
        display: flex;
        flex-flow: row wrap;
      }

      .column {
        width: 100%;
        padding: 0 20px;

        @include device-is('large-mobile') {
          width: 33.33%;
          padding: 0 38px;
        }
        @include device-is('tablet') {
          padding: 0 20px;
        }

        h3 {
          font-weight: 300;
          font-size: 58px;
          line-height: 68px;
          text-align: left;
        }

        h4 {
          font-weight: 300;
          text-align: left;
          font-size: 28px;
          line-height: 38px;
        }

        p {
          font-size: 14px;
          font-weight: 400;
          text-align: left;
        }

        &:nth-child(1),
        &:nth-child(2) {
          margin-bottom: 48px;

          @include device-is('large-mobile') {
            margin-bottom: 0;
          }
        }
      }
    }

    &.section-comment-ca-marche {
      position: relative;
      background: url('/images/background-comment-ca-marche.jpg') no-repeat
        center center;
      background-size: cover;
      padding-top: 80px;
      padding-bottom: 108px;

      h2 {
        margin-bottom: 60px;
      }

      .container {
        display: flex;
        flex-flow: row wrap;
      }

      .inner {
        padding: 60px 22px;
        background-color: white;
        height: 100%;
        border-radius: 10px;
        box-shadow: 0 15px 16px 0 rgba(12, 22, 58, 0.15),
          0 3px 6px 0 rgba(0, 0, 0, 0.1);
      }

      .column {
        width: 100%;
        padding: 0 20px;

        @include device-is('large-mobile') {
          width: 33.33%;
          padding: 0 10px;
        }
        @include device-is('tablet') {
          padding: 0 10px;
        }
      }

      .column:nth-child(1),
      .column:nth-child(2) {
        margin-bottom: 48px;

        @include device-is('large-mobile') {
          margin-bottom: 0;
        }
      }
    }

    &.section-agenda {
      position: relative;
      overflow: hidden;
      padding: 80px 20px;

      @include device-is('large-mobile') {
        padding: 0 0;
      }

      h2 {
        margin-top: 32px;
        font-weight: 400;
        margin-bottom: 60px;
        font-size: 28px;
        line-height: 38px;
      }

      .container {
        display: flex;
        flex-flow: column;

        @include device-is('large-mobile') {
          padding: 80px 38px;
        }
        @include device-is('tablet') {
          padding: 100px 0 160px 0;
        }

        .column {
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          background-color: $white;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          padding: 20px 20px;

          @include device-is('tablet') {
            width: 760px;
            padding: 26px 90px;
          }

          h4 {
            margin-bottom: 6px;
            font-weight: 600;
            text-align: left;
            font-size: 18px;
            line-height: 24px;
          }

          p {
            margin: 0;
          }
        }
      }

      .hero-background {
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: $grey-3;
        transform: skewY(-3deg);
        transform-origin: top left;
      }
    }

    &.section-developper {
      position: relative;
      padding: 60px 0 70px 0;
      color: $white;

      @include device-is('large-mobile') {
        padding: 100px 0 100px 0;
      }
      @include device-is('tablet') {
        padding: 100px 0 180px 0;
      }

      h2 {
        text-align: left;
      }

      h3 {
        text-align: left;
      }

      .container {
        display: flex;
        flex-flow: column;
        align-items: flex-end;
        padding: 0 20px;

        @include device-is('large-mobile') {
          padding: 0 38px;
          flex-flow: row;
        }
        @include device-is('tablet') {
          padding: 0 0;
        }

        .txt {
          display: flex;
          flex-flow: column;

          @include device-is('large-mobile') {
            flex-flow: row;
            width: 600px;
          }
        }

        .column {
          @include device-is('large-mobile') {
            padding: 0 0 0 46px;
          }
          @include device-is('tablet') {
            padding: 60px 46px;
          }
        }

        img {
          max-width: 100%;
          height: auto;
          display: block;
          border-radius: 0 0 0 0;
          margin-bottom: 24px;

          @include device-is('large-mobile') {
            margin-bottom: 0;
          }
        }

        a {
          color: $white;
          text-decoration: underline;
          font-weight: 600;
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
        background: linear-gradient(135.25deg, #388aff 0%, #985fff 100%);
        transform: skewY(3deg);
        transform-origin: bottom right;
      }

      .features {
        display: flex;
        flex-direction: column;

        .feature {
          text-align: left;
          margin-top: 30px;

          @include device-is('tablet') {
            margin-top: 40px;
          }
        }
      }
    }
  }

  .key-numbers {
    &__title {
      margin-bottom: 60px;
      text-align: center;
      font-size: 36px;
      line-height: 49px;
      color: $grey-1;
    }

    &__list {
      display: flex;
      max-width: 1140px;
      margin: 0 auto;
      padding: 0 20px;
      flex-flow: column wrap;

      @include device-is('large-mobile') {
        flex-flow: row wrap;
      }
    }
  }

  .key-number {
    &__item {
      margin-bottom: 30px;

      @include device-is('large-mobile') {
        width: 50%;
      }

      @include device-is('tablet') {
        width: 25%;
        margin-bottom: inherit;
      }
    }

    &__value {
      font-weight: 600;
      color: $blue-1;
      text-align: center;
      font-size: 36px;
      line-height: 65px;

      @media (min-width: 960px) {
        font-size: 42px;
      }
    }

    &__description {
      color: $grey-1;
      text-align: center;

      @include device-is('large-mobile') {
        font-size: 14px;
        line-height: 19px;
      }

      @include device-is('tablet') {
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
}
</style>
