import { encodePath } from 'ufo';
import { prepareImageSourceForIpx } from '../../services/prismic-image-url';

// What IPX does with the id of an /_ipx/<modifiers>/<id> request built with encodePath:
// it decodes it twice before downloading it
const urlDownloadedByIpx = src => new URL(decodeURIComponent(decodeURIComponent(encodePath(src)))).href;
// Nitro names the prerendered file with decodeURI (reserved characters such as %2B stay encoded)
// while nginx fully decodes the requested path: both must match for the file to be served
const prerenderedFileName = src => decodeURI(encodePath(src));
const pathRequestedByNginx = src => decodeURIComponent(encodePath(src));
// Prismic CDNs serve "+" and "%20" alike for a space of the file name
const samePrismicUrl = url => url.replaceAll('+', '%20');

describe('prepareImageSourceForIpx', () => {
  it.each([
    'https://images.prismic.io/pix-site/abc_Re%CC%81fe%CC%81rentiel_Pix%2B_Cyberse%CC%81curite%CC%81.jpg',
    'https://pix-site.cdn.prismic.io/pix-site/abc_Republique%2BFrancaise.svg',
    'https://pix-site.cdn.prismic.io/pix-site/abc_Pix_Picto+certification+1.svg',
    'https://prismic-io.s3.amazonaws.com/pix-site/abc_logo-ville+de+paris.svg',
    'https://images.prismic.io/pix-site/abc_Portrait-Herv%C3%A9Fernandez%2CDirecteur.jpg',
  ])('should make IPX download the exact Prismic URL %s', function (src) {
    // when
    const result = urlDownloadedByIpx(prepareImageSourceForIpx(src));

    // then
    expect(samePrismicUrl(result)).toEqual(samePrismicUrl(src));
  });

  it.each([
    'https://images.prismic.io/pix-site/abc_Re%CC%81fe%CC%81rentiel_Pix%2B_Cyberse%CC%81curite%CC%81.jpg',
    'https://pix-site.cdn.prismic.io/pix-site/abc_Pix_Picto+certification+1.svg',
    'https://images.prismic.io/pix-site/abc_Portrait-Herv%C3%A9Fernandez%2CDirecteur.jpg',
  ])('should make nginx find the file prerendered for %s', function (src) {
    // when
    const prepared = prepareImageSourceForIpx(src);

    // then
    expect(pathRequestedByNginx(prepared)).toEqual(prerenderedFileName(prepared));
  });

  it('should drop the query string of Prismic image URLs', function () {
    // when
    const result = prepareImageSourceForIpx('https://images.prismic.io/pix-site/abc_Pix%2B.png?auto=compress,format');

    // then
    expect(result).toEqual('https://images.prismic.io/pix-site/abc_Pix%252B.png');
  });

  it.each([
    'https://example.org/images/a%2Bb.png?w=10',
    '/images/a%20b.svg',
    'https://images.prismic.io/pix-site/abc_without-escape.png',
    'not an url %',
    undefined,
  ])('should leave %s unchanged', function (src) {
    // when
    const result = prepareImageSourceForIpx(src);

    // then
    expect(result).toEqual(src);
  });
});
