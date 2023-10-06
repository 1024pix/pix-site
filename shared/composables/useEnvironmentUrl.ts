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
      return url.replace(/^.*\/\/[^\/]+/, "");
    }

    return url;
  };

  return { getEnvironmentUrl };
}
