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
          site: "https://pix."
        }
      },
      nitro: {
        prerender: {
          crawlLinks: false,
          routes
        }
      }
    }
  );
}

if (!process.env.SITE) {
  throw new Error("Missing SITE environment variable");
}


