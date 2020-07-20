export default function (doc) {
  const staticRoute = [
    'mediation',
    'employers',
    'about',
    'school-education',
    'higher-education',
    'competences',
    'cgu_page',
    'statistiques',
    'legal-notices',
  ]
  if (staticRoute.includes(doc.type)) {
    return `/${doc.uid}`
  }
  if (doc.type === 'news_item') {
    return `/actualites/${doc.uid}`
  }
  if (doc.type === 'index') {
    return `/`
  }
}
