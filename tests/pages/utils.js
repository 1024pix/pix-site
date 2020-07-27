import { shallowMount } from '@vue/test-utils'

/**
 * This is needed to manage the asyncData() from vuepages
 * @param {*} page the filename of the page without extension
 */
export async function getInitialised(page, opts) {
  const Page = require('@/pages/' + page).default
  if (!Page.asyncData) {
    return shallowMount(Page, opts)
  }

  let originalData = {}
  if (Page.data != null) {
    originalData = Page.data()
  }
  const asyncData = await Page.asyncData({
    app: {
      i18n: 'fr-fr',
    },
    error: jest.fn(),
    req: {},
    currentPagePath: '',
  })

  Page.data = function () {
    return {
      ...originalData,
      ...asyncData,
    }
  }

  return shallowMount(Page, opts)
}

export function emptyPrismicDocument() {
  return {
    primary: { title: '' },
    items: [{}],
  }
}
