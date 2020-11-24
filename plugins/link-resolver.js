export default function (doc) {
  const staticRoute = [
    'employers',
    'about',
    'school-education',
    'competences',
    'statistiques',
    'simple_page',
  ]
  if (staticRoute.includes(doc.type)) {
    const locale = doc.lang !== 'fr-fr' ? `/${doc.lang}` : ''
    return `${locale}/${doc.uid}`
  }
  if (doc.type === 'news_item') {
    return `/actualites/${doc.uid}`
  }
  if (doc.type === 'index') {
    return `/`
  }
}
