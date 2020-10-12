export default function ({ app: { $prismic, i18n, store } }) {
  i18n.onLanguageSwitched = () => {
    store.dispatch('updateNavigation', { prismic: $prismic, i18n })
    store.dispatch('updateMainNavigation', { prismic: $prismic, i18n })
  }
}
