<template>
  <div class="page competences">
    <main class="page-body">
      <div class="container lg">
        <h1 class="title">{{ title }}</h1>
        <form @submit="checkForm">
          <label>{{ verificationCodeLabel }}</label>
          <input v-model="code" type="text" name="verificationCode" />
          <p v-if="hasCodeError" class="error">Code requis</p>
          <label>{{ candidateScoreLabel }}</label>
          <input v-model="score" type="text" name="candidateScore" />
          <p v-if="hasScoreError" class="error">Score requis</p>
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
      score: '',
      code: '',
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
    hasCodeError() {
      return this.containsError(this.errors, 'code')
    },
    hasScoreError() {
      return this.containsError(this.errors, 'score')
    },
  },
  methods: {
    checkForm(e) {
      this.errors = []
      if (this.code && this.score) {
        return true
      }

      if (!this.code) {
        this.errors.push('code')
      }
      if (!this.score) {
        this.errors.push('score')
      }
      e.preventDefault()
    },

    containsError(arr, error) {
      return arr.includes(error)
    },
  },
  async asyncData({ app, error, req, currentPagePath }) {
    try {
      const document = await documentFetcher(app.i18n, req).getScoreCertifForm()
      if (process.client) window.prismic.setupEditButton()

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
  .error {
    color: red;
  }
}
</style>
