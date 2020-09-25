export default function ({ app: { i18n, store } }) {
  i18n.onLanguageSwitched = () => {
    store.dispatch('updateNavigation', i18n)
    store.dispatch('updateMainNavigation', i18n)
  }
}
