import { getRoutesToGenerate } from "./services/get-routes-to-generate";

export default async () => {
  const routes = await getRoutesToGenerate();
  return defineNuxtConfig({
      extends: ["../shared"],
      devServer: {
        port: Number(process.env.PORT) || 7000
      },
      runtimeConfig: {
        public: {
          site: "https://pix.",
          formKeysToMap: process.env.FORM_KEYS_TO_MAP || null
        }
      },
      nitro: {
        prerender: {
          crawlLinks: false,
          routes
        },
        devProxy: {
          "/geolocate": {
            target: `https://${process.env.GEOAPI_HOST}/me`,
            changeOrigin: true
          }
        }
      }
    }
  );
}

if (!process.env.SITE) {
  throw new Error("Missing SITE environment variable");
}


