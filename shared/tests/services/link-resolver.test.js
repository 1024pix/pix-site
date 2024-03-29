import { DOCUMENTS, TAGS } from '../../services/document-fetcher.js';
import { linkResolver } from '../../services/link-resolver.js';

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
      lang: 'en',
      uid: 'test-uid',
      expectedUrl: '/en/test-uid',
    },
  ];

  testCases.forEach(({ lang, uid, expectedUrl }) => {
    test(`it should return ${expectedUrl}`, () => {
      // when
      const result = linkResolver({ type: 'anything', lang, uid });

      // then
      expect(result).toEqual(expectedUrl);
    });
  });

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
        lang: 'en',
        uid: 'test-uid',
        expectedUrl: '/en/news/test-uid',
      },
    ];

    testCases.forEach(({ lang, uid, expectedUrl }) => {
      test(`it should add prefix for lang ${lang}`, () => {
        // when
        const result = linkResolver({ type: DOCUMENTS.NEWS_ITEM, lang, uid });

        // then
        expect(result).toEqual(expectedUrl);
      });
    });
  });

  describe('when document is an index', () => {
    const testCases = [
      {
        tags: [TAGS.INDEX, 'another-tag'],
        lang: 'fr-fr',
        expectedUrl: '/',
      },
      {
        tags: [TAGS.INDEX],
        lang: 'fr-be',
        expectedUrl: '/fr-be/',
      },
      {
        tags: [TAGS.INDEX],
        lang: 'en',
        expectedUrl: '/en/',
      },
    ];

    testCases.forEach(({ tags, lang, expectedUrl }) => {
      test(`it should return root url for lang ${lang} when one of tag is index`, () => {
        // when
        const result = linkResolver({ tags, lang });

        // then
        expect(result).toEqual(expectedUrl);
      });
    });
  });
});
