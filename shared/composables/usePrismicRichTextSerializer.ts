export default function usePrismicRichTextSerializer() {
  const localeRoute = useLocaleRoute();

  // Utilisé par <pix-rich-text localized-links /> pour résoudre les liens vers des documents Prismic
  // en tenant compte de la locale (remplace l'ancien serializer, non supporté par @prismicio/vue v6).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const localizedLinkResolver = (link: any) => {
    if (link.link_type === 'Document' && link.uid) {
      return localeRoute(`/${link.uid}`, link.lang)?.fullPath;
    }
    return undefined;
  };

  return {
    localizedLinkResolver,
  };
}
