<template>
  <div class="school-education">
    <banner :content="document[0]" />
    <slice-section :content="document[1]" />
    <slice-section
      :content="document[2]"
      section-class="school-education__innovation"
      flex-container-class="school-education-innovation__flex-container"
      flex-content-class="school-education-innovation__flex-content"
    />
    <slice-section
      :content="document[3]"
      section-class="school-education__student-support"
      flex-container-class="school-education-student-support__flex-container"
      flex-content-class="school-education-student-support__flex-content"
    />
    <slice-section :content="document[4]" />
    <slice-section
      :content="document[5]"
      section-id="mise-en-place"
      section-class="school-education__setting-up"
      flex-container-class="school-education-setting-up__flex-container"
      flex-content-class="school-education-setting-up__flex-content"
    />
    <slice-section :content="document[6]" />
    <video controls class="video-slice" :poster="videoPosterUrl">
      <source :src="videoUrl" type="video/mp4" />
    </video>
    <slice-section :content="document[7]" />
    <slice-section section-id="contenus-evaluation" :content="document[8]" />
    <slice-section
      :content="document[9]"
      section-class="school-education__accompaniment"
      flex-container-class="school-education-accompaniment__flex-container"
      flex-content-class="school-education-accompaniment__flex-content"
    />
  </div>
</template>

<script>
import { documents, documentFetcher } from '~/services/document-fetcher'
import Banner from '~/components/slices/banner'
import SliceSection from '~/components/slices/section'

export default {
  name: 'SchoolEducation',
  nuxtI18n: {
    paths: {
      fr: '/enseignement-scolaire',
      'fr-fr': '/enseignement-scolaire',
      'en-gb': '/school-education',
    },
  },
  components: {
    Banner,
    SliceSection,
  },
  async asyncData({ app, error, req, currentPagePath }) {
    try {
      const document = await documentFetcher(app.$prismic, app.i18n, req).get(
        documents.schoolEducation
      )
      return {
        currentPagePath,
        meta: document.data.meta,
        document: document.data.body,
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error({ e })
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      videoUrl:
        'https://storage.gra.cloud.ovh.net/v1/AUTH_27c5a6d3d35841a5914c7fb9a8e96345/pix-videos/general/Pix-ambassadeurs.mp4',
      videoPosterUrl:
        'https://images.prismic.io/pix-site/b9f4c26b-f454-422f-ae00-a2d56b060a92_pix-ambassadeurs-poster.png?auto=compress,format',
    }
  },
  head() {
    const meta = this.$getMeta(this.meta, this.currentPagePath, this.$prismic)
    const pageTitle = this.$t('page-titles.school-education')
    return {
      title: pageTitle,
      meta,
    }
  },
}
</script>

<style lang="scss">
.school-education {
  h1,
  h2,
  h3,
  h4,
  p {
    font-family: $open-sans, Arial, sans-serif;
  }

  h2 {
    color: $blue-5;
    font-size: 2rem;
    font-weight: normal;
    letter-spacing: 0.00875rem;
    line-height: 3.0625rem;
    margin-bottom: 66px;
  }

  h3 {
    color: $blue-5;
    font-size: 1.25rem;
    font-family: $open-sans;
    font-weight: 600;
    letter-spacing: 0.00875rem;
    line-height: 1.875rem;
    text-align: center;
  }

  a {
    color: $blue-1;
    &:visited {
      color: $blue-1;
    }
  }

  video {
    margin: 0 auto;
    max-width: 1140px;
  }

  &__innovation {
    text-align: center;
    margin: 0 auto;
    padding: 32px 0;
    @include device-is('large-mobile') {
      padding: 64px 0;
    }
  }

  &__student-support {
    text-align: center;
    margin: 0 auto;
    padding: 32px 0;
    @include device-is('large-mobile') {
      padding: 64px 0;
    }
  }

  &__setting-up {
    text-align: center;
    margin: 0 auto;
    padding: 32px 0;
    @include device-is('large-mobile') {
      padding: 64px 0;
    }
  }

  &__accompaniment {
    text-align: center;
    margin: 0 auto;
    padding: 32px 0;
    @include device-is('large-mobile') {
      padding: 64px 0;
    }
  }
}

.school-education-innovation {
  &__flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    @include device-is('large-mobile') {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  &__flex-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-width: 80%;
    @include device-is('large-mobile') {
      max-width: 30%;
    }

    p {
      color: $grey-10;
      text-align: center;
      font-size: 0.875rem;
      font-family: $roboto;
      letter-spacing: 0.009375rem;
      line-height: 1.5rem;

      &.block-img img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        height: 64px;
      }
    }
  }
}

.school-education-student-support {
  &__flex-container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;

    @include device-is('large-mobile') {
      flex-direction: row;
      align-items: normal;
    }
  }

  &__flex-content {
    width: 293px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    background: $white;
    box-shadow: 0px 24px 32px 0px rgba(0, 0, 0, 0.03),
      0px 8px 32px 0px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 32px 24px;
    margin-top: 24px;

    p {
      color: $grey-10;
      text-align: center;
      font-size: 0.875rem;
      font-family: $roboto;
      letter-spacing: 0.009375rem;
      line-height: 1.5rem;

      &.block-img img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        height: 64px;
      }
    }
  }
}

.school-education-setting-up {
  &__flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @include device-is('large-mobile') {
      justify-content: space-between;
    }
  }

  &__flex-content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 80%;
    @include device-is('large-mobile') {
      width: 48%;
    }

    p {
      color: $grey-10;
      text-align: center;
      font-size: 0.875rem;
      font-family: $roboto;
      letter-spacing: 0.009375rem;
      line-height: 1.5rem;

      &.block-img img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        height: 64px;
      }
    }
  }
}

.school-education-accompaniment {
  &__flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @include device-is('large-mobile') {
      justify-content: space-between;
    }
  }

  &__flex-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 80%;
    @include device-is('large-mobile') {
      width: 30%;
    }

    p {
      color: $grey-10;
      text-align: center;
      font-size: 0.875rem;
      font-family: $roboto;
      letter-spacing: 0.009375rem;
      line-height: 1.5rem;
      margin-bottom: 0;

      &.block-img img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        height: 64px;
      }
    }
  }
}
</style>
