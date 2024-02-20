import { useRuntimeConfig } from "#imports";

export default function useEnvironmentUrl() {
  const getEnvironmentUrl = (url: string) => {
    const runtimeConfig = useRuntimeConfig();

    const currentSite = runtimeConfig.public.site
      ? String(runtimeConfig.public.site)
      : null;

    if (
      process.env.NODE_ENV !== "production" &&
      !!currentSite &&
      url.includes(currentSite)
    ) {
      const formatedUrl = url.replace(/^.*\/\/[^\/]+/, "");
      const isHomePage = formatedUrl.length > 0;
      return isHomePage ? formatedUrl : "/";
    }

    return url;
  };

  return { getEnvironmentUrl };
}
