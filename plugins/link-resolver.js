/**
 * To learn more about Link Resolving check out the Prismic documentation
 */

export default function(doc) {
  if (doc.type === 'mediation') {
    return `${doc.lang}/${doc.uid}`
  }
}
