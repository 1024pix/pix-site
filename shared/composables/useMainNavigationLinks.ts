type NavigationZoneItem = {
  afterIcon: string | null;
  beforeIcon: string | null;
  alternativeTextForBeforeIcon: Array<{ text: string }>;
  alternativeTextForAfterIcon: Array<{ text: string }>;
  categoryName: Array<{ text: string }>;
  descriptionCategoryTitle: Array<{ text: string }>;
  descriptionCategoryText: Array<{ text: string }>;
  menuLink: { url: string };
  menuName: Array<{ text: string }>;
  menuSectionTitle: Array<{ text: string }>;
  separator: boolean;
};

type Section = {
  title: string;
  links: Array<{ name: string; url: string }>;
};

type FormattedMenuItem = {
  name: string;
  afterIcon: string | null;
  beforeIcon: string | null;
  alternativeTextForAfterIcon?: string;
  alternativeTextForBeforeIcon?: string;
  description?: {
    title: string;
    text: string;
  };
  sections: Array<Section>;
  separator: boolean;
  url?: string;
};

export default function useMainNavigationLinks(
  navigationZoneItems: Array<NavigationZoneItem>
): Array<FormattedMenuItem> | null {
  if (navigationZoneItems.length === 0) {
    return null;
  }

  return navigationZoneItems.reduce(
    (formattedData: Array<FormattedMenuItem>, currentItem) => {
      const isCategory =
        currentItem.categoryName.length > 0 && currentItem.categoryName[0].text;

      if (!isCategory) {
        formattedData.push({
          name: _getTextFromArray(currentItem.menuName),
          beforeIcon: currentItem.beforeIcon,
          alternativeTextForBeforeIcon: _getTextFromArray(
            currentItem.alternativeTextForBeforeIcon
          ),
          afterIcon: currentItem.afterIcon,
          alternativeTextForAfterIcon: _getTextFromArray(
            currentItem.alternativeTextForAfterIcon
          ),
          url: currentItem.menuLink.url,
          separator: currentItem.separator,
          sections: [],
        });

        return formattedData;
      }

      const currentCategoryName = _getTextFromArray(currentItem.categoryName);
      const lastCategoryIndex = formattedData.length - 1;
      const isDifferentCategory =
        lastCategoryIndex === -1 ||
        formattedData[lastCategoryIndex].name !== currentCategoryName;

      if (isDifferentCategory) {
        formattedData.push(
          _createCategory(
            currentCategoryName,
            currentItem.separator,
            _getTextFromArray(currentItem.descriptionCategoryTitle),
            _getTextFromArray(currentItem.descriptionCategoryText),
            _getTextFromArray(currentItem.menuSectionTitle),
            _getTextFromArray(currentItem.menuName),
            currentItem.menuLink.url
          )
        );

        return formattedData;
      }

      const currentCategory = formattedData[lastCategoryIndex];
      const currentTitle = _getTextFromArray(currentItem.menuSectionTitle);
      const existingSectionIndex = currentCategory.sections.findIndex(
        (section: Section) => section.title === currentTitle
      );

      if (existingSectionIndex !== -1) {
        currentCategory.sections[existingSectionIndex].links.push({
          name: _getTextFromArray(currentItem.menuName),
          url: currentItem.menuLink.url,
        });
      } else {
        currentCategory.sections.push(
          _createSection(
            currentTitle,
            _getTextFromArray(currentItem.menuName),
            currentItem.menuLink.url
          )
        );
      }
      return formattedData;
    },
    []
  );
}

const _createSection = (
  menuSectionTitle: string,
  menuName: string,
  menuLink: string
): Section => {
  return {
    title: menuSectionTitle,
    links: [{ name: menuName, url: menuLink }],
  };
};

const _createCategory = (
  categoryName: string,
  separator: boolean,
  descriptionCategoryTitle: string,
  descriptionCategoryText: string,
  menuSectionTitle: string,
  menuName: string,
  menuLink: string
): FormattedMenuItem => {
  return {
    name: categoryName,
    separator,
    description: {
      title: descriptionCategoryTitle,
      text: descriptionCategoryText,
    },
    sections: [_createSection(menuSectionTitle, menuName, menuLink)],
    afterIcon: null,
    beforeIcon: null,
  };
};

const _getTextFromArray = (array: Array<{ text: string }>): string => {
  if (!array || !array.length) return "";
  return array[0].text;
};
