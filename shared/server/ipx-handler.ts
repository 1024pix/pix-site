// /_ipx route serving the images resized by IPX, replacing the one of @nuxt/image
// (which does not register its own route when one is declared in serverHandlers).
// Same behaviour as the @nuxt/image handler for remote images, with one addition: downloads of the
// source images are retried. IPX 4 uses fetch without retry, and Prismic CDNs (especially the legacy
// S3 bucket) occasionally reset connections or time out during the prerender, which failed the
// build; the former nuxt-image-prismic-fix fork retried them through ofetch.
import { createIPX, createIPXFetchHandler, ipxHttpStorage, parseIPXURL, WEB_INPUT_FORMATS } from 'ipx';
import { withoutBase } from 'ufo';
import { defineEventHandler, useRuntimeConfig } from 'nuxt/server';
import { withRetry } from '@shared/services/with-retry';

const IPX_BASE_URL = '/_ipx';

let fetchHandler;

export default defineEventHandler((event) => {
  fetchHandler ||= createHandler();
  return fetchHandler(event.req);
});

function createHandler() {
  const config = useRuntimeConfig();
  const { domains, svg } = config.pixIpx;

  const httpStorage = ipxHttpStorage({ domains });
  const getData = httpStorage.getData;
  httpStorage.getData = (id, options) => withRetry(() => getData(id, options));

  const ipx = createIPX({ storage: httpStorage, httpStorage, svg, allowedInputFormats: WEB_INPUT_FORMATS });

  return createIPXFetchHandler(ipx, {
    parseURL(url) {
      const parsedURL = new URL(url);
      let pathname = withoutBase(parsedURL.pathname, config.app.baseURL);
      if (pathname === IPX_BASE_URL || pathname.startsWith(`${IPX_BASE_URL}/`)) {
        pathname = pathname.slice(IPX_BASE_URL.length) || '/';
      }
      return parseIPXURL(parsedURL.origin + pathname + parsedURL.search);
    },
  });
}
