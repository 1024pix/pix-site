import useMainNavigationLinks from "../../composables/useMainNavigationLinks";

const navigationZoneItems = [
  {
    categoryName: [],
    afterIcon: null,
    beforeIcon: "icn-home.svg",
    alternativeTextForAfterIcon: [],
    alternativeTextForBeforeIcon: [{ text: "Accueil" }],
    descriptionCategoryTitle: [],
    descriptionCategoryText: [],
    menuLink: {
      url: "https://pix.fr",
    },
    menuName: [
      {
        text: "Accueil",
      },
    ],
    menuSectionTitle: [],
    separator: false,
  },
  {
    afterIcon: null,
    beforeIcon: null,
    alternativeTextForAfterIcon: [],
    alternativeTextForBeforeIcon: [],
    categoryName: [
      {
        text: "Découvrir Pix",
      },
    ],
    descriptionCategoryTitle: [
      {
        text: "Pix, c'est quoi ?",
      },
    ],
    descriptionCategoryText: [
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
    menuLink: {
      url: "https://pix.fr/les-tests",
    },
    menuName: [
      {
        text: "Défis et compétences",
      },
    ],
    menuSectionTitle: [
      {
        text: "La plateforme Pix",
      },
    ],
    separator: false,
  },
  {
    afterIcon: null,
    beforeIcon: null,
    alternativeTextForAfterIcon: [],
    alternativeTextForBeforeIcon: [],
    categoryName: [
      {
        text: "Découvrir Pix",
      },
    ],
    descriptionCategoryTitle: [],
    descriptionCategoryText: [],
    menuLink: {
      url: "https://pix.fr/les-tests",
    },
    menuName: [
      {
        text: "Le référentiel",
      },
    ],
    menuSectionTitle: [
      {
        text: "Qui sommes nous ?",
      },
    ],
    separator: false,
  },
  {
    afterIcon: null,
    beforeIcon: null,
    alternativeTextForAfterIcon: [],
    alternativeTextForBeforeIcon: [],
    categoryName: [
      {
        text: "Découvrir Pix",
      },
    ],
    descriptionCategoryTitle: [],
    descriptionCategoryText: [],
    menuLink: {
      url: "https://pix.fr/les-tests",
    },
    menuName: [
      {
        text: "Score et niveaux ",
      },
    ],
    menuSectionTitle: [
      {
        text: "La plateforme Pix",
      },
    ],
    separator: false,
  },
  {
    afterIcon: null,
    beforeIcon: null,
    alternativeTextForAfterIcon: [],
    alternativeTextForBeforeIcon: [],
    categoryName: [
      {
        text: "Découvrir Pix",
      },
    ],
    descriptionCategoryTitle: [],
    descriptionCategoryText: [],
    menuLink: {
      url: "https://pix.fr/les-tests",
    },
    menuName: [
      {
        text: "Les accompagnements",
      },
    ],
    menuSectionTitle: [
      {
        text: "Qui sommes nous ?",
      },
    ],
    separator: false,
  },
  {
    afterIcon: "icn-external-link.svg",
    beforeIcon: null,
    alternativeTextForAfterIcon: [
      {
        text: "lien externe",
      },
    ],
    alternativeTextForBeforeIcon: [],
    categoryName: [],
    descriptionCategoryTitle: [],
    descriptionCategoryText: [],
    menuSectionTitle: [],
    menuName: [
      {
        text: "Blog",
      },
    ],
    menuLink: {
      url: "https://pix.fr",
    },
    separator: true,
  },
];

describe("#useMainNavigationLinks", () => {
  it("should aggregate navigation links of the same category", () => {
    // given
    const navigationLinks = useMainNavigationLinks(navigationZoneItems);

    // when then
    expect(navigationLinks).toEqual([
      {
        name: "Accueil",
        afterIcon: null,
        beforeIcon: "icn-home.svg",
        alternativeTextForBeforeIcon: "Accueil",
        alternativeTextForAfterIcon: "",
        sections: [],
        separator: false,
        url: "https://pix.fr",
      },
      {
        name: "Découvrir Pix",
        afterIcon: null,
        beforeIcon: null,
        description: {
          title: "Pix, c'est quoi ?",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        separator: false,
        sections: [
          {
            title: "La plateforme Pix",
            links: [
              {
                name: "Défis et compétences",
                url: "https://pix.fr/les-tests",
              },
              {
                name: "Score et niveaux ",
                url: "https://pix.fr/les-tests",
              },
            ],
          },
          {
            title: "Qui sommes nous ?",
            links: [
              { name: "Le référentiel", url: "https://pix.fr/les-tests" },
              {
                name: "Les accompagnements",
                url: "https://pix.fr/les-tests",
              },
            ],
          },
        ],
      },
      {
        name: "Blog",
        afterIcon: "icn-external-link.svg",
        beforeIcon: null,
        alternativeTextForAfterIcon: "lien externe",
        alternativeTextForBeforeIcon: "",
        url: "https://pix.fr",
        sections: [],
        separator: true,
      },
    ]);
  });
});
