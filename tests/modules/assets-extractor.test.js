import {
  getOptions,
  getAssetsDir,
  processAssets,
  extractAssetsUrls,
  slugifyPathname,
  replaceAll,
} from '../../modules/assets-extractor'

import saveRemoteAsset from '../../modules/save-remote-asset'

describe('Module assets-extractor', () => {
  beforeEach(() => {
    saveRemoteAsset.mockClear()
  })

  describe('#getOptions', () => {
    test('should return default options if no option provided', () => {
      // when
      const options = getOptions()
      // then
      expect(options).toEqual({
        path: '/_assets',
        extensions: ['jpg', 'jpeg', 'gif', 'png', 'webp', 'svg', 'mp4'],
        hostnames: [''],
      })
    })

    test('should override default options if option provided', () => {
      // when
      const options = getOptions({
        path: 'my-path',
        extensions: ['bmp'],
      })
      // then
      expect(options).toEqual({
        path: 'my-path',
        extensions: ['bmp'],
        hostnames: [''],
      })
    })
  })

  describe('#getAssetsDir', () => {
    test('should return the directory where assets will be extracted', () => {
      // when
      const baseDir = '/foo/bar'
      const assetPath = '/baz'
      const dir = getAssetsDir(baseDir, assetPath)
      // then
      expect(dir).toEqual('/foo/bar/baz')
    })
  })

  describe('#processAssets', () => {
    test('should return the same html if no links found', async () => {
      // when
      const result = await processAssets(
        '<body></body>',
        ['png'],
        ['test.com'],
        '/dir/_assets',
        '/_assets'
      )
      // then
      expect(result).toEqual('<body></body>')
    })

    test('should replace html links corresponding to asset extensions', async () => {
      // when
      const result = await processAssets(
        '<body><a href="https://test.com/img.png?toto=aa">Link</a></body>',
        ['png'],
        ['test.com'],
        '/dir/_assets',
        '/_assets'
      )
      // then
      expect(result).toEqual('<body><a href="/_assets/img.png">Link</a></body>')
    })

    test('should download assets identified', async () => {
      // when
      await processAssets(
        '<body><a href="https://test.com/img.png">Link</a></body>',
        ['png'],
        ['test.com'],
        '/dir/_assets',
        '/_assets'
      )
      // then
      expect(saveRemoteAsset).toHaveBeenCalledWith(
        'https://test.com/img.png',
        '/dir/_assets/img.png'
      )
    })

    test('should process assets link formatted in payload.js file', async () => {
      // when
      await processAssets(
        `
        {
          type: 'image',
          url:
            'https:\u002F\u002Ftest.com\u002Ftest\u002Fimg.png',
          alt: a,
          copyright: a,
          dimensions: { width: 188, height: 204 },
        }
        `,
        ['png'],
        ['test.com'],
        '/dir/_assets',
        '/_assets'
      )
      // then
      expect(saveRemoteAsset).toHaveBeenCalledWith(
        'https://test.com/test/img.png',
        '/dir/_assets/test/img.png'
      )
    })
  })

  describe('#extractAssetsUrls', () => {
    test('should extract one url from html', () => {
      // when
      const result = extractAssetsUrls(
        '<body><a href="https://test.com/img.png">Link</a></body>',
        ['png'],
        ['test.com']
      )
      // then
      expect(result).toEqual(['https://test.com/img.png'])
    })

    test('should extract only url corresponding to the given extensions', () => {
      // when
      const result = extractAssetsUrls(
        '<body><a href="https://test.com/test">Link</a><img src="https://test.com/img.png" /></body>',
        ['png'],
        ['test.com']
      )
      // then
      expect(result).toEqual(['https://test.com/img.png'])
    })

    test('should extract only url with hash', () => {
      // when
      const result = extractAssetsUrls(
        '<body><a href="https://test.com/test">Link</a><img src="https://test.com/img.png#toto" /></body>',
        ['png'],
        ['test.com']
      )
      // then
      expect(result).toEqual(['https://test.com/img.png#toto'])
    })

    test('should extract only url with query params', () => {
      // when
      const result = extractAssetsUrls(
        '<body><a href="https://test.com/test">Link</a><img src="https://test.com/img.png?toto=a" /></body>',
        ['png'],
        ['test.com']
      )
      // then
      expect(result).toEqual(['https://test.com/img.png?toto=a'])
    })

    test('should extract only url with given hostnames', () => {
      // when
      const result = extractAssetsUrls(
        '<body><a href="https://foo.com/img1.png">Link</a><img src="https://bar.com/img2.png" /></body>',
        ['png'],
        ['foo.com']
      )
      // then
      expect(result).toEqual(['https://foo.com/img1.png'])
    })
  })

  describe('slugifyPathname', () => {
    test('should not slugify if the file name doesnt have special chars', () => {
      // when
      const result = slugifyPathname('/foo/bar/baz.png')
      // then
      expect(result).toEqual('/foo/bar/baz.png')
    })

    test('should not slugify if the file name have special chars', () => {
      // when
      const result = slugifyPathname('/foo/bar/baz%a b_f?l.png')
      // then
      expect(result).toEqual('/foo/bar/baz-a-b-f-l.png')
    })
  })

  describe('replaceAll', () => {
    test('should replace all occurrence of the searched string', () => {
      // when
      const result = replaceAll('hi Ben, hi Gul', 'hi', 'yo')
      // then
      expect(result).toEqual('yo Ben, yo Gul')
    })

    test('should escape special chars in the searched string', () => {
      // when
      const result = replaceAll(
        'start/\\?&%[]{}()_-end',
        '/\\?&%[]{}()_-',
        '-ok-'
      )
      // then
      expect(result).toEqual('start-ok-end')
    })
  })
})

jest.mock('../../modules/save-remote-asset', () => ({
  __esModule: true,
  default: jest.fn(),
}))
