import { useRuntimeConfig } from "#imports";

export default function useEnvironmentUrl() {
  const getEnvironmentUrl = (url) => {
    const runtimeConfig = useRuntimeConfig();

    if (
      process.env.NODE_ENV !== "production" &&
      url.includes(runtimeConfig.public.site)
    ) {
      return url.replace(/^.*\/\/[^\/]+/, "");
    }

    return url;
  };

  return { getEnvironmentUrl };
}
