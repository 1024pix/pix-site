import { getRoutesToGenerate } from "./services/get-routes-to-generate";

export default async () => {
  const routes = await getRoutesToGenerate();
  return defineNuxtConfig({
      extends: ["../shared"],
      devServer: {
        port: 7001
      },
      runtimeConfig: {
        public: {
          site: "https://pro.pix."
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
