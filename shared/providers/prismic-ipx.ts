import { defineProvider } from '@nuxt/image/runtime';
import ipx from '@nuxt/image/runtime/providers/ipx';
import { prepareImageSourceForIpx } from '../services/prismic-image-url';

// The built-in IPX provider, with Prismic image URLs prepared first (see prismic-image-url.js):
// images are still resized at build time and served from /_ipx.
const ipxProvider = ipx();

export default defineProvider({
  ...ipxProvider,
  getImage: (src, options, ctx) => ipxProvider.getImage(prepareImageSourceForIpx(src), options, ctx),
});
