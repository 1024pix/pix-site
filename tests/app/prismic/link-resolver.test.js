import { DOCUMENTS } from '~/services/document-fetcher'
import { linkResolver } from '~/app/prismic/link-resolver'

describe('linkResolver', () => {
  const testCases = [
    {
      lang: 'fr-fr',
      uid: 'test-uid',
      expectedUrl: '/test-uid',
    },
    {
      lang: 'fr-be',
      uid: 'test-uid',
      expectedUrl: '/fr-be/test-uid',
    },
    {
      lang: 'en-gb',
      uid: 'test-uid',
      expectedUrl: '/en-gb/test-uid',
    },
  ]

  testCases.forEach(({ lang, uid, expectedUrl }) => {
    test(`it should return ${expectedUrl}`, () => {
      // when
      const result = linkResolver({ type: 'anything', lang, uid })

      // then
      expect(result).toEqual(expectedUrl)
    })
  })

  describe('when document is a news item', () => {
    const testCases = [
      {
        lang: 'fr-fr',
        uid: 'test-uid',
        expectedUrl: '/actualites/test-uid',
      },
      {
        lang: 'fr-be',
        uid: 'test-uid',
        expectedUrl: '/fr-be/actualites/test-uid',
      },
      {
        lang: 'en-gb',
        uid: 'test-uid',
        expectedUrl: '/en-gb/news/test-uid',
      },
    ]

    testCases.forEach(({ lang, uid, expectedUrl }) => {
      test(`it should add prefix for lang ${lang}`, () => {
        // when
        const result = linkResolver({ type: DOCUMENTS.NEWS_ITEM, lang, uid })

        // then
        expect(result).toEqual(expectedUrl)
      })
    })
  })

  describe('when document is an index', () => {
    const testCases = [
      {
        lang: 'fr-fr',
        expectedUrl: '/',
      },
      {
        lang: 'fr-be',
        expectedUrl: '/fr-be/',
      },
      {
        lang: 'en-gb',
        expectedUrl: '/en-gb/',
      },
    ]

    testCases.forEach(({ lang, expectedUrl }) => {
      test(`it should return root url for lang ${lang}`, () => {
        // when
        const result = linkResolver({ type: DOCUMENTS.INDEX, lang })

        // then
        expect(result).toEqual(expectedUrl)
      })
    })
  })
})
