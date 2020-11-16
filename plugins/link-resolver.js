export default function (doc) {
  const staticRoute = [
    'mediation',
    'employers',
    'about',
    'school-education',
    'competences',
    'cgu_page',
    'statistiques',
    'legal-notices',
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
