export default function ({ app: { $prismic, i18n, store } }) {
  i18n.onLanguageSwitched = () => {
    store.dispatch('updateMainNavigations', { prismic: $prismic, i18n })
    store.dispatch('updateMainFooters', { prismic: $prismic, i18n })
  }
}
