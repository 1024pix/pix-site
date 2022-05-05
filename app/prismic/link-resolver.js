import { DOCUMENTS } from '~/services/document-fetcher'
export const STATIC_ROUTE = [DOCUMENTS.STATISTIQUES, DOCUMENTS.SIMPLE_PAGE]
export function linkResolver(doc) {
  if (STATIC_ROUTE.includes(doc.type)) {
    const locale = doc.lang !== 'fr-fr' ? `/${doc.lang}` : ''
    return `${locale}/${doc.uid}`
  }
  if (doc.type === DOCUMENTS.NEWS_ITEM) {
    return `/actualites/${doc.uid}`
  }
  if (doc.type === DOCUMENTS.INDEX) {
    return `/`
  }
}

export default linkResolver
