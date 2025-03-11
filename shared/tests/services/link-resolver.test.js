import { DOCUMENTS, TAGS } from '../../services/document-fetcher.js';
import { linkResolver } from '../../services/link-resolver.js';

describe('linkResolver', () => {
  const testCases = [
    {
      lang: 'fr-FR',
      uid: 'test-uid',
      expectedUrl: '/test-uid',
    },
    {
      lang: 'fr-BE',
      uid: 'test-uid',
      expectedUrl: '/fr-BE/test-uid',
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
        lang: 'fr-FR',
        uid: 'test-uid',
        expectedUrl: '/actualites/test-uid',
      },
      {
        lang: 'fr-BE',
        uid: 'test-uid',
        expectedUrl: '/fr-BE/actualites/test-uid',
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
        lang: 'fr-FR',
        expectedUrl: '/',
      },
      {
        tags: [TAGS.INDEX],
        lang: 'fr-BE',
        expectedUrl: '/fr-BE/',
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

    describe("when document does not have 'tags', 'type' and 'uid'", () => {
      test('it returns locale root url', () => {
        // given
        const locale = 'nl-BE';
        const doc = {
          lang: locale,
        };

        // when
        const result = linkResolver(doc);

        // then
        const expectedUrl = `/${locale}/`;
        expect(result).toEqual(expectedUrl);
      });
    });
  });
});
