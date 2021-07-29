// When error on fetch hook in Vue component, no failure in the generation
// even if `--fail-on-error` option passed on `nuxt generate`.
// https://github.com/nuxt/nuxt.js/issues/7742
// This temporary solution should be solved on Nuxt 3 as we can see here :
// https://github.com/nuxt/nuxt.js/pull/8475

export default function propagateError() {
  this.nuxt.hook('vue-renderer:ssr:context', (context) => {
    const fetchError = Object.values(context.nuxt.fetch).find(
      (data) => data._error
    )
    if (fetchError) {
      context.nuxt.error = fetchError
    }
  })
}
