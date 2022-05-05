import { DOCUMENTS } from '~/services/document-fetcher'
import { linkResolver, STATIC_ROUTE } from '~/app/prismic/link-resolver'

describe('linkResolver', () => {
  describe('when document is for root level', function () {
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
      STATIC_ROUTE.forEach((type) => {
        test(`it should return ${expectedUrl} when type is ${type} and lang is ${lang}`, () => {
          // when
          const url = linkResolver({ type, lang, uid })

          // then
          expect(url).toEqual(expectedUrl)
        })
      })
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
        expectedUrl: '/actualites/test-uid',
      },
      {
        lang: 'en-gb',
        uid: 'test-uid',
        expectedUrl: '/news/test-uid',
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
        expectedUrl: '/',
      },
      {
        lang: 'en-gb',
        expectedUrl: '/',
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

  describe('when document type is not specific', () => {
    const testCases = [
      {
        lang: 'fr-fr',
        expectedUrl: undefined,
      },
      {
        lang: 'fr-be',
        expectedUrl: undefined,
      },
      {
        lang: 'en-gb',
        expectedUrl: undefined,
      },
    ]

    testCases.forEach(({ lang, expectedUrl }) => {
      test(`it should return ${expectedUrl}`, () => {
        // when
        const result = linkResolver({ type: 'not-defined', lang })

        // then
        expect(result).toEqual(expectedUrl)
      })
    })
  })
})
