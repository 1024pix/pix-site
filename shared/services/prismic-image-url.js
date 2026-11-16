// Prepares Prismic image URLs (images.prismic.io, pix-site.cdn.prismic.io and the legacy S3 bucket)
// for IPX (@nuxt/image), so that it downloads them as the former nuxt-image-prismic-fix fork did:
// - IPX decodes the source URL twice (when parsing the /_ipx path, then when validating the URL)
//   while the IPX provider only encodes it once, so escape sequences are lost: Prismic URLs of files
//   with a "+" in their name contain "%2B", downloaded as "+", that Prismic CDNs read as a space
//   (403 Forbidden). Escaping "%" once more makes IPX download the exact Prismic URL.
// - the query string added by Prismic (e.g. "?auto=compress,format") is dropped: IPX resizes and
//   compresses the original image itself, and generated file names keep no "?".
const PRISMIC_IMAGE_HOSTS = ['images.prismic.io', 'pix-site.cdn.prismic.io', 'prismic-io.s3.amazonaws.com'];

export function prepareImageSourceForIpx(src) {
  if (typeof src !== 'string' || !/[%?]/.test(src)) return src;

  let url;
  try {
    url = new URL(src);
  } catch {
    return src;
  }
  if (!PRISMIC_IMAGE_HOSTS.includes(url.hostname)) return src;

  const queryIndex = src.indexOf('?');
  const path = queryIndex === -1 ? src : src.slice(0, queryIndex);
  return path.replaceAll('%', '%25');
}
