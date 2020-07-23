<template>
  <div class="page competences">
    <main class="page-body">
      <div class="container lg">
        <h1 class="title">{{ title }}</h1>
        <form>
          <label>{{ verificationCodeLabel }}</label>
          <input
            v-model="verificationCode"
            type="text"
            name="verificationCode"
          />
          <label>{{ candidateScoreLabel }}</label>
          <input v-model="candidateScore" type="text" name="candidateScore" />
          <button class="btn-primary" type="submit">
            {{ buttonLabel }}
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import { documentFetcher } from '~/services/document-fetcher'
export default {
  name: 'VerifyScore',
  nuxtI18n: {
    paths: {
      'fr-fr': '/verifier-score-certification',
      'en-gb': '/verify-certification-score',
    },
  },
  data() {
    return {
      candidateScore: 510,
      verificationCode: 'P-XXXXX',
      errors: [],
    }
  },
  computed: {
    buttonLabel() {
      return this.document.button_label
    },
    title() {
      return this.document.title
    },
    verificationCodeLabel() {
      return this.document.code_de_verification
    },
    candidateScoreLabel() {
      return this.document.score_declare_du_candidat
    },
  },
  // components: { SectionSlice },
  async asyncData({ app, error, req, currentPagePath }) {
    try {
      const document = await documentFetcher(app.i18n, req).getScoreCertifForm()
      if (process.client) window.prismic.setupEditButton()
      console.log(document.data)

      return {
        currentPagePath,
        meta: document.data.meta,
        document: document.data,
        documentId: document.id,
      }
    } catch (e) {
      console.error({ e })
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    const meta = this.$getMeta(this.meta, this.currentPagePath, this.$prismic)
    return {
      meta,
    }
  },
}
</script>

<style scoped lang="scss">
.title {
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 62px;
  height: 164px;
  line-height: 82px;
  font-weight: 300;
  margin-bottom: 50px;
  max-width: 490px;
}
.page-body {
  form {
    width: 50%;
    display: flex;
    flex-direction: column;
    label {
      font-family: 'Roboto', Arial, sans-serif;
      color: rgb(23, 43, 77);
    }
    input {
      border: 2px solid rgb(107, 119, 140);
      border-radius: 4px;
      max-width: 475px;
      margin-bottom: 24px;
    }
  }
}
</style>
