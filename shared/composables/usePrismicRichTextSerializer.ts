export default function usePrismicRichTextSerializer() {
  const localeRoute = useLocaleRoute();

  const customPrismicRichTextSerializer = {
    hyperlink: ({ node }: any) => {
      if (node.type === 'hyperlink' && node.data.link_type === 'Document') {
        const localeUrl = localeRoute(`/${node.data.uid}`, node.data.lang);
        node.data.url = localeUrl?.fullPath;
      }
    },
  };

  return {
    customPrismicRichTextSerializer,
  };
}
