import { DOCUMENTS, TAGS } from './document-fetcher'
import * as en from '../translations/en.js'
import * as fr from '../translations/fr.js'
import * as frBe from '../translations/fr-be.js'
import * as frFr from '../translations/fr-fr.js'

const newsPagePrefixes = {
  en:
    en.default['news-page-prefix'].body?.static ||
    en.default['news-page-prefix'].b?.s ||
    en.default['news-page-prefix'],
  fr:
    fr.default['news-page-prefix'].body?.static ||
    fr.default['news-page-prefix'].b?.s ||
    fr.default['news-page-prefix'],
  'fr-be':
    frBe.default['news-page-prefix'].body?.static ||
    frBe.default['news-page-prefix'].b?.s ||
    frBe.default['news-page-prefix'],
  'fr-fr':
    frFr.default['news-page-prefix'].body?.static ||
    frFr.default['news-page-prefix'].b?.s ||
    frFr.default['news-page-prefix'],
}

export function linkResolver(doc) {
  const locale = doc.lang !== 'fr-fr' ? `/${doc.lang}` : ''

  if (doc.type === DOCUMENTS.NEWS_ITEM) {
    const newsPagePrefix = newsPagePrefixes[doc.lang]
    return `${locale}/${newsPagePrefix}/${doc.uid}`
  }
  if (doc.tags?.includes(TAGS.INDEX)) {
    return `${locale}/`
  }
  return `${locale}/${doc.uid}`
}

export default linkResolver
