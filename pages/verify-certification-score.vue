<template>
  <div class="page competences">
    <main class="page-body">
      <div class="container lg certificate-verification-page">
        <h1 class="certificate-verification-page__title">{{ title }}</h1>
        <form
          class="certificate-verification-page__form"
          novalidate
          @submit="submit"
        >
          <div class="certificate-verification-page__input-field">
            <label for="code">{{ verificationCodeLabel }}</label>
            <input
              id="code"
              v-model="code"
              :class="[hasCodeRegexError ? 'regex-error' : 'no-regex-error']"
              type="text"
              required="true"
              :pattern="codeRegex"
              name="verificationCode"
            />
            <p
              v-if="hasCodeRegexError"
              class="certificate-verification-page__error-for-input"
            >
              Votre code de vérification ne correspond pas au format: P-XXXXX
            </p>
          </div>
          <div class="certificate-verification-page__input-field">
            <label for="score">{{ candidateScoreLabel }}</label>
            <input
              id="score"
              v-model="score"
              :class="[hasScoreRegexError ? 'regex-error' : 'no-regex-error']"
              type="text"
              required="true"
              :pattern="scoreRegex"
              name="candidateScore"
            />
            <p
              v-if="hasScoreRegexError"
              class="certificate-verification-page__error-for-input"
            >
              Le score du candidat doit être composé de 3 chiffres
            </p>
          </div>
          <button class="btn-primary" type="submit">
            {{ buttonLabel }}
          </button>
        </form>
        <div v-if="formSent" class="certificate-verification-page__form-sent">
          <fa :icon="fas.faExclamationTriangle" />
          <span>Il n'y a pas de certificat Pix correspondant</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { fas } from '@fortawesome/free-solid-svg-icons'
import { documentFetcher } from '~/services/document-fetcher'

export default {
  name: 'VerifyCertificationScore',
  nuxtI18n: {
    paths: {
      'fr-fr': '/verifier-score-certification',
      'en-gb': '/verify-certification-score',
    },
  },
  async asyncData({ app, error, req, currentPagePath }) {
    try {
      const document = await documentFetcher(
        app.i18n,
        req
      ).getVerifyCertificationForm()
      if (process.client) window.prismic.setupEditButton()

      return {
        currentPagePath,
        meta: document.data.meta,
        document: document.data,
        documentId: document.id,
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      score: '',
      code: '',
      errors: [],
      codeRegex: '^[P,p]-[0-9]{5}$',
      scoreRegex: '^[0-9]{1,3}$',
      hasCodeRegexError: false,
      hasScoreRegexError: false,
      formSent: false,
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
    fas() {
      return fas
    },
  },
  methods: {
    submit(e) {
      e.preventDefault()
      if (this.checkForm()) {
        this.formSent = true
      }
    },
    checkForm() {
      this.hasCodeRegexError = !this.isCodeValid()
      this.hasScoreRegexError = !this.isScoreValid()

      return !this.hasCodeRegexError && !this.hasScoreRegexError
    },
    isCodeValid() {
      const regex = new RegExp(this.codeRegex)
      return regex.test(this.code)
    },
    isScoreValid() {
      const regex = new RegExp(this.scoreRegex)

      return regex.test(this.score)
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

<style scoped lang="scss">
.page-body {
  .certificate-verification-page {
    &__title {
      font-family: 'Open Sans', Arial, sans-serif;
      font-size: 62px;
      height: 164px;
      line-height: 82px;
      font-weight: 300;
      margin-bottom: 50px;
      max-width: 490px;
    }

    &__form {
      width: 50%;
      display: flex;
      flex-direction: column;

      button {
        width: 175px;
        max-height: 36px;
        line-height: 100%;
      }
    }

    &__input-field {
      margin-bottom: 24px;
      display: flex;
      flex-direction: column;

      label {
        font-family: 'Roboto', Arial, sans-serif;
        color: $blue-5;
      }

      .no-regex-error {
        border: 2px solid $grey-9;
      }

      .regex-error {
        border: 2px solid $error;
      }

      input {
        padding: 0 8px;
        font-size: 1rem;
        border-radius: 4px;
        max-width: 475px;
        height: 41px;
      }
    }

    &__error-for-input {
      color: $error;
      margin: 0;
      font-size: 14px;
    }

    &__form-sent {
      margin-top: 32px;
      background-color: $error-2;
      border-radius: 4px;
      height: 46px;
      line-height: 46px;
      width: 436px;
      text-align: center;

      svg {
        color: $error;
        margin-right: 6px;
      }

      span {
        color: $error;
        font-family: 'Roboto', Arial, sans-serif;
        font-size: 14px;
        font-weight: normal;
        height: 22px;
        letter-spacing: 0.15px;
        width: 380px;
      }
    }

    .error {
      color: $error;
    }
  }
}
</style>
