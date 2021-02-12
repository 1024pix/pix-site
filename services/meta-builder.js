export default function getMeta(meta, currentPagePath, prismic) {
  function getTwitterCard() {
    const twitterMeta = meta.find((meta) => meta.slice_type === 'twitter_card')
    if (!twitterMeta) {
      return []
    }
    return [
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: prismic.asText(twitterMeta.primary.title),
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: prismic.asText(twitterMeta.primary.description),
      },
      { hid: '', name: 'twitter:site', content: '@Pix_officiel' },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: twitterMeta.primary.image.url,
      },
    ]
  }

  function getOgCard() {
    const ogMeta = meta.find((meta) => meta.slice_type === 'general_card')
    if (!ogMeta) {
      return []
    }
    return [
      {
        hid: 'og:title',
        property: 'og:title',
        content: prismic.asText(ogMeta.primary.title),
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: prismic.asText(ogMeta.primary.description),
      },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: currentPagePath,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: ogMeta.primary.image.url,
      },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Pix.fr' },
    ]
  }

  function getGeneralMeta() {
    const generalCard = meta.find((meta) => meta.slice_type === 'general_card')
    if (!generalCard) {
      return []
    }
    return [
      {
        hid: 'description',
        name: 'description',
        content: prismic.asText(generalCard.primary.description),
      },
    ]
  }

  if (!meta) {
    return []
  }
  const twitterCard = getTwitterCard()
  const ogCard = getOgCard()
  const generalMeta = getGeneralMeta()

  return [...twitterCard, ...ogCard, ...generalMeta]
}
