<template>
  <div class="page competences">
    <main class="page-body">
      <div class="container lg">
        <h1 class="title">{{ title }}</h1>
        <form @submit="checkForm">
          <div class="input-field">
            <label>{{ verificationCodeLabel }}</label>
            <input
              v-model="code"
              :class="hasCodeRegexError && getRegexErrorClass"
              type="text"
              required="true"
              name="verificationCode"
            />
            <p v-if="hasCodeRegexError" class="error-paragraph">
              Votre code de vérification ne correspond pas au format: P-XXXXX
            </p>
          </div>
          <div class="input-field">
            <label>{{ candidateScoreLabel }}</label>
            <input
              v-model="score"
              :class="hasScoreRegexError && getRegexErrorClass"
              type="text"
              required="true"
              name="candidateScore"
            />
            <p v-if="hasScoreRegexError" class="error-paragraph">
              Le score du candidat doit être composé de 3 chiffres
            </p>
          </div>
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
      codeRegex: /^P-[0-9]{5}$/i,
      scoreRegex: /^[0-9]{1,3}$/i,
      hasCodeRegexError: false,
      hasScoreRegexError: false,
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
    getRegexErrorClass() {
      return 'regex-error'
    },
  },
  methods: {
    checkForm(e) {
      e.preventDefault()

      this.matchesCodeRegex()
      this.matchesScoreRegex()

      if (!this.hasCodeRegexError && !this.hasScoreRegexError) {
        alert('Formulaire envoyé')
      }
    },

    matchesCodeRegex() {
      if (!this.codeRegex.test(this.code)) {
        this.hasCodeRegexError = true
        return false
      }
      this.hasCodeRegexError = false
      return true
    },

    matchesScoreRegex() {
      if (!this.scoreRegex.test(this.score)) {
        this.hasScoreRegexError = true
        return false
      }
      this.hasScoreRegexError = false
      return true
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
    .input-field {
      margin-bottom: 24px;
      display: flex;
      flex-direction: column;
      input {
        border: 2px solid rgb(107, 119, 140);
        border-radius: 4px;
        max-width: 475px;
        height: 41px;
      }
      .regex-error {
        border: 2px solid red;
      }
      .error-paragraph {
        color: red;
        font-size: 10px;
        margin: 0;
      }
    }
    button {
      width: 175px;
      max-height: 36px;
      line-height: 100%;
    }
  }
}
</style>
