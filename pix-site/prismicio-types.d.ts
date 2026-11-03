import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

/**
 * Primary content in *about → Slice zone → section → Primary*
 */
export interface AboutDocumentDataBodySectionSlicePrimary {
	/**
	 * logo field in *about → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.body[].section.primary.logo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
	
	/**
	 * title field in *about → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.body[].section.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * description field in *about → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.body[].section.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * button_title field in *about → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.body[].section.primary.button_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	button_title: prismic.RichTextField;
	
	/**
	 * button_link field in *about → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.body[].section.primary.button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item content in *about → Slice zone → section → Items*
 */
export interface AboutDocumentDataBodySectionSliceItem {
	/**
	 * paragraph field in *about → Slice zone → section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.body[].section.items.paragraph
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	paragraph: prismic.RichTextField;
}

/**
 * Slice for *about → Slice zone*
 */
export type AboutDocumentDataBodySectionSlice = prismic.Slice<"section", Simplify<AboutDocumentDataBodySectionSlicePrimary>, Simplify<AboutDocumentDataBodySectionSliceItem>>

/**
 * Primary content in *about → Slice zone → hero-banner → Primary*
 */
export interface AboutDocumentDataBodyHeroBannerSlicePrimary {
	/**
	 * Title field in *about → Slice zone → hero-banner → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.body[].hero-banner.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * button_title field in *about → Slice zone → hero-banner → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.body[].hero-banner.primary.button_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	button_title: prismic.RichTextField;
	
	/**
	 * button_link field in *about → Slice zone → hero-banner → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.body[].hero-banner.primary.button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *about → Slice zone*
 */
export type AboutDocumentDataBodyHeroBannerSlice = prismic.Slice<"hero-banner", Simplify<AboutDocumentDataBodyHeroBannerSlicePrimary>, never>

/**
 * Primary content in *about → Slice zone → left-section → Primary*
 */
export interface AboutDocumentDataBodyLeftSectionSlicePrimary {
	/**
	 * title field in *about → Slice zone → left-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.body[].left-section.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * description field in *about → Slice zone → left-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.body[].left-section.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * image field in *about → Slice zone → left-section → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.body[].left-section.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Item content in *about → Slice zone → left-section → Items*
 */
export interface AboutDocumentDataBodyLeftSectionSliceItem {
	/**
	 * paragraph field in *about → Slice zone → left-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.body[].left-section.items.paragraph
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	paragraph: prismic.RichTextField;
}

/**
 * Slice for *about → Slice zone*
 */
export type AboutDocumentDataBodyLeftSectionSlice = prismic.Slice<"left-section", Simplify<AboutDocumentDataBodyLeftSectionSlicePrimary>, Simplify<AboutDocumentDataBodyLeftSectionSliceItem>>

type AboutDocumentDataBodySlice = AboutDocumentDataBodySectionSlice | AboutDocumentDataBodyHeroBannerSlice | AboutDocumentDataBodyLeftSectionSlice

/**
 * Primary content in *about → Slice zone → General Card → Primary*
 */
export interface AboutDocumentDataMetaGeneralCardSlicePrimary {
	/**
	 * Title field in *about → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Title...
	 * - **API ID Path**: about.meta[].general_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *about → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Description...
	 * - **API ID Path**: about.meta[].general_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *about → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.meta[].general_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Slice for *about → Slice zone*
 */
export type AboutDocumentDataMetaGeneralCardSlice = prismic.Slice<"general_card", Simplify<AboutDocumentDataMetaGeneralCardSlicePrimary>, never>

/**
 * Primary content in *about → Slice zone → Twitter Card → Primary*
 */
export interface AboutDocumentDataMetaTwitterCardSlicePrimary {
	/**
	 * Title field in *about → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Title...
	 * - **API ID Path**: about.meta[].twitter_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *about → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Description...
	 * - **API ID Path**: about.meta[].twitter_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *about → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.meta[].twitter_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<"large_image">;
}

/**
 * Slice for *about → Slice zone*
 */
export type AboutDocumentDataMetaTwitterCardSlice = prismic.Slice<"twitter_card", Simplify<AboutDocumentDataMetaTwitterCardSlicePrimary>, never>

type AboutDocumentDataMetaSlice = AboutDocumentDataMetaGeneralCardSlice | AboutDocumentDataMetaTwitterCardSlice

/**
 * Content for about documents
 */
interface AboutDocumentData {
	/**
	 * title field in *about*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Slice zone field in *about*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.body[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	body: prismic.SliceZone<AboutDocumentDataBodySlice>;/**
	 * Slice zone field in *about*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.meta[]
	 * - **Tab**: Social Cards
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	meta: prismic.SliceZone<AboutDocumentDataMetaSlice>;
}

/**
 * about document from Prismic
 *
 * - **API ID**: `about`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AboutDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<AboutDocumentData>, "about", Lang>;

/**
 * Primary content in *Blog post → Slice zone → Text → Primary*
 */
export interface BlogPostDocumentDataBodyContentSlicePrimary {
	/**
	 * Text content field in *Blog post → Slice zone → Text → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.body[].content.primary.text_content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	text_content: prismic.RichTextField;
}

/**
 * Slice for *Blog post → Slice zone*
 */
export type BlogPostDocumentDataBodyContentSlice = prismic.Slice<"content", Simplify<BlogPostDocumentDataBodyContentSlicePrimary>, never>

/**
 * Primary content in *Blog post → Slice zone → Quote → Primary*
 */
export interface BlogPostDocumentDataBodyQuoteSlicePrimary {
	/**
	 * Quote content field in *Blog post → Slice zone → Quote → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.body[].quote.primary.quote_content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	quote_content: prismic.RichTextField;
}

/**
 * Slice for *Blog post → Slice zone*
 */
export type BlogPostDocumentDataBodyQuoteSlice = prismic.Slice<"quote", Simplify<BlogPostDocumentDataBodyQuoteSlicePrimary>, never>

/**
 * Primary content in *Blog post → Slice zone → Image → Primary*
 */
export interface BlogPostDocumentDataBodyImageSlicePrimary {
	/**
	 * Image content field in *Blog post → Slice zone → Image → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.body[].image.primary.image_content
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image_content: prismic.ImageField<never>;
	
	/**
	 * Image legend field in *Blog post → Slice zone → Image → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.body[].image.primary.image_legend
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	image_legend: prismic.RichTextField;
}

/**
 * Slice for *Blog post → Slice zone*
 */
export type BlogPostDocumentDataBodyImageSlice = prismic.Slice<"image", Simplify<BlogPostDocumentDataBodyImageSlicePrimary>, never>

type BlogPostDocumentDataBodySlice = BlogPostDocumentDataBodyContentSlice | BlogPostDocumentDataBodyQuoteSlice | BlogPostDocumentDataBodyImageSlice

/**
 * Content for Blog post documents
 */
interface BlogPostDocumentData {
	/**
	 * Title field in *Blog post*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Slice zone field in *Blog post*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.body[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	body: prismic.SliceZone<BlogPostDocumentDataBodySlice>;
}

/**
 * Blog post document from Prismic
 *
 * - **API ID**: `blog_post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlogPostDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<BlogPostDocumentData>, "blog_post", Lang>;

/**
 * Primary content in *CGU page → Slice zone → General Card → Primary*
 */
export interface CguPageDocumentDataMetaGeneralCardSlicePrimary {
	/**
	 * Title field in *CGU page → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Title...
	 * - **API ID Path**: cgu_page.meta[].general_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *CGU page → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Description...
	 * - **API ID Path**: cgu_page.meta[].general_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *CGU page → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cgu_page.meta[].general_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Slice for *CGU page → Slice zone*
 */
export type CguPageDocumentDataMetaGeneralCardSlice = prismic.Slice<"general_card", Simplify<CguPageDocumentDataMetaGeneralCardSlicePrimary>, never>

/**
 * Primary content in *CGU page → Slice zone → Twitter Card → Primary*
 */
export interface CguPageDocumentDataMetaTwitterCardSlicePrimary {
	/**
	 * Title field in *CGU page → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Title...
	 * - **API ID Path**: cgu_page.meta[].twitter_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *CGU page → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Description...
	 * - **API ID Path**: cgu_page.meta[].twitter_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *CGU page → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cgu_page.meta[].twitter_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<"large_image">;
}

/**
 * Slice for *CGU page → Slice zone*
 */
export type CguPageDocumentDataMetaTwitterCardSlice = prismic.Slice<"twitter_card", Simplify<CguPageDocumentDataMetaTwitterCardSlicePrimary>, never>

type CguPageDocumentDataMetaSlice = CguPageDocumentDataMetaGeneralCardSlice | CguPageDocumentDataMetaTwitterCardSlice

/**
 * Content for CGU page documents
 */
interface CguPageDocumentData {
	/**
	 * Title field in *CGU page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cgu_page.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Body field in *CGU page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cgu_page.body
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;/**
	 * Slice zone field in *CGU page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cgu_page.meta[]
	 * - **Tab**: Social Cards
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	meta: prismic.SliceZone<CguPageDocumentDataMetaSlice>;
}

/**
 * CGU page document from Prismic
 *
 * - **API ID**: `cgu_page`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type CguPageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<CguPageDocumentData>, "cgu_page", Lang>;

/**
 * Primary content in *competences → Slice zone → section → Primary*
 */
export interface CompetencesDocumentDataBodySectionSlicePrimary {
	/**
	 * title field in *competences → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: competences.body[].section.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
}

/**
 * Item content in *competences → Slice zone → section → Items*
 */
export interface CompetencesDocumentDataBodySectionSliceItem {
	/**
	 * paragraph field in *competences → Slice zone → section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: competences.body[].section.items.paragraph
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	paragraph: prismic.RichTextField;
}

/**
 * Slice for *competences → Slice zone*
 */
export type CompetencesDocumentDataBodySectionSlice = prismic.Slice<"section", Simplify<CompetencesDocumentDataBodySectionSlicePrimary>, Simplify<CompetencesDocumentDataBodySectionSliceItem>>

type CompetencesDocumentDataBodySlice = CompetencesDocumentDataBodySectionSlice

/**
 * Primary content in *competences → Slice zone → General Card → Primary*
 */
export interface CompetencesDocumentDataMetaGeneralCardSlicePrimary {
	/**
	 * Title field in *competences → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Title...
	 * - **API ID Path**: competences.meta[].general_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *competences → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Description...
	 * - **API ID Path**: competences.meta[].general_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *competences → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: competences.meta[].general_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Slice for *competences → Slice zone*
 */
export type CompetencesDocumentDataMetaGeneralCardSlice = prismic.Slice<"general_card", Simplify<CompetencesDocumentDataMetaGeneralCardSlicePrimary>, never>

/**
 * Primary content in *competences → Slice zone → Twitter Card → Primary*
 */
export interface CompetencesDocumentDataMetaTwitterCardSlicePrimary {
	/**
	 * Title field in *competences → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Title...
	 * - **API ID Path**: competences.meta[].twitter_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *competences → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Description...
	 * - **API ID Path**: competences.meta[].twitter_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *competences → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: competences.meta[].twitter_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<"large_image">;
}

/**
 * Slice for *competences → Slice zone*
 */
export type CompetencesDocumentDataMetaTwitterCardSlice = prismic.Slice<"twitter_card", Simplify<CompetencesDocumentDataMetaTwitterCardSlicePrimary>, never>

type CompetencesDocumentDataMetaSlice = CompetencesDocumentDataMetaGeneralCardSlice | CompetencesDocumentDataMetaTwitterCardSlice

/**
 * Content for competences documents
 */
interface CompetencesDocumentData {
	/**
	 * page_title field in *competences*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: competences.page_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	page_title: prismic.RichTextField;
	
	/**
	 * Slice zone field in *competences*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: competences.body[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	body: prismic.SliceZone<CompetencesDocumentDataBodySlice>;/**
	 * Slice zone field in *competences*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: competences.meta[]
	 * - **Tab**: Social Cards
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	meta: prismic.SliceZone<CompetencesDocumentDataMetaSlice>;
}

/**
 * competences document from Prismic
 *
 * - **API ID**: `competences`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type CompetencesDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<CompetencesDocumentData>, "competences", Lang>;

/**
 * Content for Distributeur documents
 */
interface DistributorItemDocumentData {
	/**
	 * Name field in *Distributeur*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: distributor_item.name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	name: prismic.RichTextField;
	
	/**
	 * Logo field in *Distributeur*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: distributor_item.logo
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
	
	/**
	 * Description field in *Distributeur*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: distributor_item.description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Link field in *Distributeur*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: distributor_item.link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	link: prismic.RichTextField;
}

/**
 * Distributeur document from Prismic
 *
 * - **API ID**: `distributor_item`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type DistributorItemDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<DistributorItemDocumentData>, "distributor_item", Lang>;

/**
 * Content for Support : Easiware Form documents
 */
interface EasiwareFormDocumentData {
	/**
	 * Form Title field in *Support : Easiware Form*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: easiware_form.form_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	form_title: prismic.RichTextField;
	
	/**
	 * Form introduction field in *Support : Easiware Form*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: easiware_form.form_introduction
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	form_introduction: prismic.RichTextField;
	
	/**
	 * Form Id field in *Support : Easiware Form*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: 47
	 * - **API ID Path**: easiware_form.form_id
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	form_id: prismic.NumberField;
	
	/**
	 * Solution Id field in *Support : Easiware Form*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: b8180205275577508f752848298a7e148204adde
	 * - **API ID Path**: easiware_form.solution_id
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	solution_id: prismic.KeyTextField;
	
	/**
	 * freescout_url field in *Support : Easiware Form*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: easiware_form.freescout_url
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	freescout_url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Freescout Height field in *Support : Easiware Form*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: 900
	 * - **API ID Path**: easiware_form.freescout_height
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	freescout_height: prismic.NumberField;
}

/**
 * Support : Easiware Form document from Prismic
 *
 * - **API ID**: `easiware_form`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type EasiwareFormDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<EasiwareFormDocumentData>, "easiware_form", Lang>;

interface EasiwareFormPageDocumentData {}

/**
 * easiware_form_page document from Prismic
 *
 * - **API ID**: `easiware_form_page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type EasiwareFormPageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<EasiwareFormPageDocumentData>, "easiware_form_page", Lang>;

/**
 * Primary content in *employers → Slice zone → hero-banner → Primary*
 */
export interface EmployersDocumentDataBodyHeroBannerSlicePrimary {
	/**
	 * Title field in *employers → Slice zone → hero-banner → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].hero-banner.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * button_title field in *employers → Slice zone → hero-banner → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].hero-banner.primary.button_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	button_title: prismic.RichTextField;
	
	/**
	 * button_link field in *employers → Slice zone → hero-banner → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].hero-banner.primary.button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *employers → Slice zone*
 */
export type EmployersDocumentDataBodyHeroBannerSlice = prismic.Slice<"hero-banner", Simplify<EmployersDocumentDataBodyHeroBannerSlicePrimary>, never>

/**
 * Primary content in *employers → Slice zone → section → Primary*
 */
export interface EmployersDocumentDataBodySectionSlicePrimary {
	/**
	 * logo field in *employers → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].section.primary.logo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
	
	/**
	 * title field in *employers → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].section.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * description field in *employers → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].section.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * button_title field in *employers → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].section.primary.button_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	button_title: prismic.RichTextField;
	
	/**
	 * button_link field in *employers → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].section.primary.button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item content in *employers → Slice zone → section → Items*
 */
export interface EmployersDocumentDataBodySectionSliceItem {
	/**
	 * paragraph field in *employers → Slice zone → section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].section.items.paragraph
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	paragraph: prismic.RichTextField;
}

/**
 * Slice for *employers → Slice zone*
 */
export type EmployersDocumentDataBodySectionSlice = prismic.Slice<"section", Simplify<EmployersDocumentDataBodySectionSlicePrimary>, Simplify<EmployersDocumentDataBodySectionSliceItem>>

/**
 * Primary content in *employers → Slice zone → button → Primary*
 */
export interface EmployersDocumentDataBodyButtonSlicePrimary {
	/**
	 * title field in *employers → Slice zone → button → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].button.primary.title1
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title1: prismic.RichTextField;
	
	/**
	 * link field in *employers → Slice zone → button → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].button.primary.link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *employers → Slice zone*
 */
export type EmployersDocumentDataBodyButtonSlice = prismic.Slice<"button", Simplify<EmployersDocumentDataBodyButtonSlicePrimary>, never>

/**
 * Primary content in *employers → Slice zone → card-section → Primary*
 */
export interface EmployersDocumentDataBodyCardSectionSlicePrimary {
	/**
	 * title field in *employers → Slice zone → card-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].card-section.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
}

/**
 * Item content in *employers → Slice zone → card-section → Items*
 */
export interface EmployersDocumentDataBodyCardSectionSliceItem {
	/**
	 * card title field in *employers → Slice zone → card-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].card-section.items.card_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	card_title: prismic.RichTextField;
	
	/**
	 * card description field in *employers → Slice zone → card-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].card-section.items.card_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	card_description: prismic.RichTextField;
}

/**
 * Slice for *employers → Slice zone*
 */
export type EmployersDocumentDataBodyCardSectionSlice = prismic.Slice<"card-section", Simplify<EmployersDocumentDataBodyCardSectionSlicePrimary>, Simplify<EmployersDocumentDataBodyCardSectionSliceItem>>

/**
 * Primary content in *employers → Slice zone → ressource → Primary*
 */
export interface EmployersDocumentDataBodyRessourceSlicePrimary {
	/**
	 * ressources content field in *employers → Slice zone → ressource → Primary*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].ressource.primary.ressources_content
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	ressources_content: prismic.ContentRelationshipField;
}

/**
 * Slice for *employers → Slice zone*
 */
export type EmployersDocumentDataBodyRessourceSlice = prismic.Slice<"ressource", Simplify<EmployersDocumentDataBodyRessourceSlicePrimary>, never>

/**
 * Primary content in *employers → Slice zone → left-section → Primary*
 */
export interface EmployersDocumentDataBodyLeftSection1SlicePrimary {
	/**
	 * title field in *employers → Slice zone → left-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].left-section1.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * description field in *employers → Slice zone → left-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].left-section1.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * image field in *employers → Slice zone → left-section → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].left-section1.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Item content in *employers → Slice zone → left-section → Items*
 */
export interface EmployersDocumentDataBodyLeftSection1SliceItem {
	/**
	 * paragraph field in *employers → Slice zone → left-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].left-section1.items.paragraph
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	paragraph: prismic.RichTextField;
}

/**
 * Slice for *employers → Slice zone*
 */
export type EmployersDocumentDataBodyLeftSection1Slice = prismic.Slice<"left-section1", Simplify<EmployersDocumentDataBodyLeftSection1SlicePrimary>, Simplify<EmployersDocumentDataBodyLeftSection1SliceItem>>

/**
 * Primary content in *employers → Slice zone → distributors-section → Primary*
 */
export interface EmployersDocumentDataBodyDistributorsSectionSlicePrimary {
	/**
	 * Distributors section logo field in *employers → Slice zone → distributors-section → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].distributors-section.primary.distributors_section_logo1
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	distributors_section_logo1: prismic.ImageField<never>;
	
	/**
	 * Distributors section title field in *employers → Slice zone → distributors-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].distributors-section.primary.distributors_section_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	distributors_section_title: prismic.RichTextField;
	
	/**
	 * Distributors section description field in *employers → Slice zone → distributors-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].distributors-section.primary.distributors_section_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	distributors_section_description: prismic.RichTextField;
	
	/**
	 * Distributors section footer field in *employers → Slice zone → distributors-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].distributors-section.primary.distributors_section_footer
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	distributors_section_footer: prismic.RichTextField;
}

/**
 * Item content in *employers → Slice zone → distributors-section → Items*
 */
export interface EmployersDocumentDataBodyDistributorsSectionSliceItem {
	/**
	 * Distributors section items field in *employers → Slice zone → distributors-section → Items*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[].distributors-section.items.distributors_section_items
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	distributors_section_items: prismic.ContentRelationshipField<"distributor_item">;
}

/**
 * Slice for *employers → Slice zone*
 */
export type EmployersDocumentDataBodyDistributorsSectionSlice = prismic.Slice<"distributors-section", Simplify<EmployersDocumentDataBodyDistributorsSectionSlicePrimary>, Simplify<EmployersDocumentDataBodyDistributorsSectionSliceItem>>

type EmployersDocumentDataBodySlice = EmployersDocumentDataBodyHeroBannerSlice | EmployersDocumentDataBodySectionSlice | EmployersDocumentDataBodyButtonSlice | EmployersDocumentDataBodyCardSectionSlice | EmployersDocumentDataBodyRessourceSlice | EmployersDocumentDataBodyLeftSection1Slice | EmployersDocumentDataBodyDistributorsSectionSlice

/**
 * Primary content in *employers → Slice zone → General Card → Primary*
 */
export interface EmployersDocumentDataMetaGeneralCardSlicePrimary {
	/**
	 * Title field in *employers → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Title...
	 * - **API ID Path**: employers.meta[].general_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *employers → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Description...
	 * - **API ID Path**: employers.meta[].general_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *employers → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.meta[].general_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Slice for *employers → Slice zone*
 */
export type EmployersDocumentDataMetaGeneralCardSlice = prismic.Slice<"general_card", Simplify<EmployersDocumentDataMetaGeneralCardSlicePrimary>, never>

/**
 * Primary content in *employers → Slice zone → Twitter Card → Primary*
 */
export interface EmployersDocumentDataMetaTwitterCardSlicePrimary {
	/**
	 * Title field in *employers → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Title...
	 * - **API ID Path**: employers.meta[].twitter_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *employers → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Description...
	 * - **API ID Path**: employers.meta[].twitter_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *employers → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.meta[].twitter_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<"large_image">;
}

/**
 * Slice for *employers → Slice zone*
 */
export type EmployersDocumentDataMetaTwitterCardSlice = prismic.Slice<"twitter_card", Simplify<EmployersDocumentDataMetaTwitterCardSlicePrimary>, never>

type EmployersDocumentDataMetaSlice = EmployersDocumentDataMetaGeneralCardSlice | EmployersDocumentDataMetaTwitterCardSlice

/**
 * Content for employers documents
 */
interface EmployersDocumentData {
	/**
	 * Distributors section logo field in *employers*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.distributors_section_logo
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	distributors_section_logo: prismic.ImageField<never>;
	
	/**
	 * title field in *employers*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Slice zone field in *employers*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.body[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	body: prismic.SliceZone<EmployersDocumentDataBodySlice>;/**
	 * Slice zone field in *employers*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: employers.meta[]
	 * - **Tab**: Social Cards
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	meta: prismic.SliceZone<EmployersDocumentDataMetaSlice>;
}

/**
 * employers document from Prismic
 *
 * - **API ID**: `employers`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type EmployersDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<EmployersDocumentData>, "employers", Lang>;

/**
 * Item in *FAQ category → FAQ items*
 */
export interface FaqCategoryDocumentDataFaqItemsItem {
	/**
	 * FAQ item field in *FAQ category → FAQ items*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq_category.faq_items[].faq_item
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	faq_item: prismic.ContentRelationshipField<"faq_item">;
}

/**
 * Content for FAQ category documents
 */
interface FaqCategoryDocumentData {
	/**
	 * Title field in *FAQ category*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq_category.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * FAQ items field in *FAQ category*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq_category.faq_items[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	faq_items: prismic.GroupField<Simplify<FaqCategoryDocumentDataFaqItemsItem>>;
}

/**
 * FAQ category document from Prismic
 *
 * - **API ID**: `faq_category`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type FaqCategoryDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<FaqCategoryDocumentData>, "faq_category", Lang>;

/**
 * Content for FAQ item documents
 */
interface FaqItemDocumentData {
	/**
	 * Question field in *FAQ item*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq_item.question
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	question: prismic.RichTextField;
	
	/**
	 * Answer field in *FAQ item*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq_item.answer
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	answer: prismic.RichTextField;
}

/**
 * FAQ item document from Prismic
 *
 * - **API ID**: `faq_item`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type FaqItemDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<FaqItemDocumentData>, "faq_item", Lang>;

/**
 * Item in *FAQ menu → FAQ categories*
 */
export interface FaqMenuDocumentDataFaqCategoriesItem {
	/**
	 * FAQ category field in *FAQ menu → FAQ categories*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq_menu.faq_categories[].faq_category
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	faq_category: prismic.ContentRelationshipField<"faq_category">;
}

/**
 * Content for FAQ menu documents
 */
interface FaqMenuDocumentData {
	/**
	 * Title field in *FAQ menu*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq_menu.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * FAQ categories field in *FAQ menu*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq_menu.faq_categories[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	faq_categories: prismic.GroupField<Simplify<FaqMenuDocumentDataFaqCategoriesItem>>;
}

/**
 * FAQ menu document from Prismic
 *
 * - **API ID**: `faq_menu`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type FaqMenuDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<FaqMenuDocumentData>, "faq_menu", Lang>;

/**
 * Content for Form page documents
 */
interface FormPageDocumentData {
	/**
	 * Title field in *Form page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: form_page.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Body field in *Form page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: form_page.body
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Formbuilder URL field in *Form page*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: form_page.formbuilder_url
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	formbuilder_url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Minimum Height field in *Form page*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: 650 if you do not know
	 * - **API ID Path**: form_page.minimum_height
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	minimum_height: prismic.NumberField;
	
	/**
	 * Image field in *Form page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: form_page.image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Form page document from Prismic
 *
 * - **API ID**: `form_page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type FormPageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<FormPageDocumentData>, "form_page", Lang>;

/**
 * Primary content in *higher-education → Slice zone → hero-banner → Primary*
 */
export interface HigherEducationDocumentDataBodyHeroBannerSlicePrimary {
	/**
	 * Title field in *higher-education → Slice zone → hero-banner → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].hero-banner.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
}

/**
 * Item content in *higher-education → Slice zone → hero-banner → Items*
 */
export interface HigherEducationDocumentDataBodyHeroBannerSliceItem {
	/**
	 * title_button field in *higher-education → Slice zone → hero-banner → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].hero-banner.items.title_button
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title_button: prismic.RichTextField;
	
	/**
	 * link_button field in *higher-education → Slice zone → hero-banner → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].hero-banner.items.link_button
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link_button: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *higher-education → Slice zone*
 */
export type HigherEducationDocumentDataBodyHeroBannerSlice = prismic.Slice<"hero-banner", Simplify<HigherEducationDocumentDataBodyHeroBannerSlicePrimary>, Simplify<HigherEducationDocumentDataBodyHeroBannerSliceItem>>

/**
 * Primary content in *higher-education → Slice zone → section → Primary*
 */
export interface HigherEducationDocumentDataBodySectionSlicePrimary {
	/**
	 * logo field in *higher-education → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].section.primary.logo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
	
	/**
	 * title field in *higher-education → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].section.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * description field in *higher-education → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].section.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
}

/**
 * Item content in *higher-education → Slice zone → section → Items*
 */
export interface HigherEducationDocumentDataBodySectionSliceItem {
	/**
	 * paragraph field in *higher-education → Slice zone → section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].section.items.paragraph
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	paragraph: prismic.RichTextField;
}

/**
 * Slice for *higher-education → Slice zone*
 */
export type HigherEducationDocumentDataBodySectionSlice = prismic.Slice<"section", Simplify<HigherEducationDocumentDataBodySectionSlicePrimary>, Simplify<HigherEducationDocumentDataBodySectionSliceItem>>

/**
 * Primary content in *higher-education → Slice zone → left-section → Primary*
 */
export interface HigherEducationDocumentDataBodyLeftSectionSlicePrimary {
	/**
	 * title field in *higher-education → Slice zone → left-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].left-section.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * description field in *higher-education → Slice zone → left-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].left-section.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * image field in *higher-education → Slice zone → left-section → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].left-section.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Item content in *higher-education → Slice zone → left-section → Items*
 */
export interface HigherEducationDocumentDataBodyLeftSectionSliceItem {
	/**
	 * paragraph field in *higher-education → Slice zone → left-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].left-section.items.paragraph
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	paragraph: prismic.RichTextField;
}

/**
 * Slice for *higher-education → Slice zone*
 */
export type HigherEducationDocumentDataBodyLeftSectionSlice = prismic.Slice<"left-section", Simplify<HigherEducationDocumentDataBodyLeftSectionSlicePrimary>, Simplify<HigherEducationDocumentDataBodyLeftSectionSliceItem>>

/**
 * Primary content in *higher-education → Slice zone → hero-section → Primary*
 */
export interface HigherEducationDocumentDataBodyHeroSectionSlicePrimary {
	/**
	 * title field in *higher-education → Slice zone → hero-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].hero-section.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * button text field in *higher-education → Slice zone → hero-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].hero-section.primary.button_text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	button_text: prismic.RichTextField;
	
	/**
	 * button link field in *higher-education → Slice zone → hero-section → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].hero-section.primary.button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item content in *higher-education → Slice zone → hero-section → Items*
 */
export interface HigherEducationDocumentDataBodyHeroSectionSliceItem {
	/**
	 * column number field in *higher-education → Slice zone → hero-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].hero-section.items.column_number
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	column_number: prismic.RichTextField;
	
	/**
	 * column title field in *higher-education → Slice zone → hero-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].hero-section.items.column_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	column_title: prismic.RichTextField;
	
	/**
	 * column description field in *higher-education → Slice zone → hero-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].hero-section.items.column_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	column_description: prismic.RichTextField;
}

/**
 * Slice for *higher-education → Slice zone*
 */
export type HigherEducationDocumentDataBodyHeroSectionSlice = prismic.Slice<"hero-section", Simplify<HigherEducationDocumentDataBodyHeroSectionSlicePrimary>, Simplify<HigherEducationDocumentDataBodyHeroSectionSliceItem>>

/**
 * Primary content in *higher-education → Slice zone → card-section → Primary*
 */
export interface HigherEducationDocumentDataBodyCardSectionSlicePrimary {
	/**
	 * logo field in *higher-education → Slice zone → card-section → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].card-section.primary.logo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
	
	/**
	 * title field in *higher-education → Slice zone → card-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].card-section.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
}

/**
 * Item content in *higher-education → Slice zone → card-section → Items*
 */
export interface HigherEducationDocumentDataBodyCardSectionSliceItem {
	/**
	 * card title field in *higher-education → Slice zone → card-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].card-section.items.card_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	card_title: prismic.RichTextField;
	
	/**
	 * card description field in *higher-education → Slice zone → card-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].card-section.items.card_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	card_description: prismic.RichTextField;
}

/**
 * Slice for *higher-education → Slice zone*
 */
export type HigherEducationDocumentDataBodyCardSectionSlice = prismic.Slice<"card-section", Simplify<HigherEducationDocumentDataBodyCardSectionSlicePrimary>, Simplify<HigherEducationDocumentDataBodyCardSectionSliceItem>>

/**
 * Primary content in *higher-education → Slice zone → ressource → Primary*
 */
export interface HigherEducationDocumentDataBodyRessourceSlicePrimary {
	/**
	 * ressources content field in *higher-education → Slice zone → ressource → Primary*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[].ressource.primary.ressources_content
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	ressources_content: prismic.ContentRelationshipField<"key_numbers">;
}

/**
 * Slice for *higher-education → Slice zone*
 */
export type HigherEducationDocumentDataBodyRessourceSlice = prismic.Slice<"ressource", Simplify<HigherEducationDocumentDataBodyRessourceSlicePrimary>, never>

type HigherEducationDocumentDataBodySlice = HigherEducationDocumentDataBodyHeroBannerSlice | HigherEducationDocumentDataBodySectionSlice | HigherEducationDocumentDataBodyLeftSectionSlice | HigherEducationDocumentDataBodyHeroSectionSlice | HigherEducationDocumentDataBodyCardSectionSlice | HigherEducationDocumentDataBodyRessourceSlice

/**
 * Primary content in *higher-education → Slice zone → General Card → Primary*
 */
export interface HigherEducationDocumentDataMetaGeneralCardSlicePrimary {
	/**
	 * Title field in *higher-education → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Title...
	 * - **API ID Path**: higher-education.meta[].general_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *higher-education → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Description...
	 * - **API ID Path**: higher-education.meta[].general_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *higher-education → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.meta[].general_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Slice for *higher-education → Slice zone*
 */
export type HigherEducationDocumentDataMetaGeneralCardSlice = prismic.Slice<"general_card", Simplify<HigherEducationDocumentDataMetaGeneralCardSlicePrimary>, never>

/**
 * Primary content in *higher-education → Slice zone → Twitter Card → Primary*
 */
export interface HigherEducationDocumentDataMetaTwitterCardSlicePrimary {
	/**
	 * Title field in *higher-education → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Title...
	 * - **API ID Path**: higher-education.meta[].twitter_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *higher-education → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Description...
	 * - **API ID Path**: higher-education.meta[].twitter_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *higher-education → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.meta[].twitter_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<"large_image">;
}

/**
 * Slice for *higher-education → Slice zone*
 */
export type HigherEducationDocumentDataMetaTwitterCardSlice = prismic.Slice<"twitter_card", Simplify<HigherEducationDocumentDataMetaTwitterCardSlicePrimary>, never>

type HigherEducationDocumentDataMetaSlice = HigherEducationDocumentDataMetaGeneralCardSlice | HigherEducationDocumentDataMetaTwitterCardSlice

/**
 * Content for higher-education documents
 */
interface HigherEducationDocumentData {
	/**
	 * page title field in *higher-education*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.page_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	page_title: prismic.RichTextField;
	
	/**
	 * Slice zone field in *higher-education*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.body[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	body: prismic.SliceZone<HigherEducationDocumentDataBodySlice>;/**
	 * Slice zone field in *higher-education*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: higher-education.meta[]
	 * - **Tab**: Social Cards
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	meta: prismic.SliceZone<HigherEducationDocumentDataMetaSlice>;
}

/**
 * higher-education document from Prismic
 *
 * - **API ID**: `higher-education`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HigherEducationDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<HigherEducationDocumentData>, "higher-education", Lang>;

/**
 * Content for Hot News documents
 */
interface HotNewsDocumentData {
	/**
	 * description field in *Hot News*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hot_news.description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
}

/**
 * Hot News document from Prismic
 *
 * - **API ID**: `hot_news`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HotNewsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HotNewsDocumentData>, "hot_news", Lang>;

interface IndexDocumentData {}

/**
 * Index document from Prismic
 *
 * - **API ID**: `index`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type IndexDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<IndexDocumentData>, "index", Lang>;

/**
 * Content for Job offer documents
 */
interface JobOfferDocumentData {
	/**
	 * Title field in *Job offer*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: job_offer.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *Job offer*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: job_offer.description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Location field in *Job offer*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: job_offer.location
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	location: prismic.RichTextField;
	
	/**
	 * Contract field in *Job offer*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: job_offer.contract
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	contract: prismic.RichTextField;
	
	/**
	 * Salary field in *Job offer*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: job_offer.salary
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	salary: prismic.RichTextField;
}

/**
 * Job offer document from Prismic
 *
 * - **API ID**: `job_offer`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type JobOfferDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<JobOfferDocumentData>, "job_offer", Lang>;

/**
 * Item in *key-numbers → column*
 */
export interface KeyNumbersDocumentDataColumnItem {
	/**
	 * number field in *key-numbers → column*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: key_numbers.column[].number
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	number: prismic.RichTextField;
	
	/**
	 * description field in *key-numbers → column*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: key_numbers.column[].description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
}

/**
 * Content for key-numbers documents
 */
interface KeyNumbersDocumentData {
	/**
	 * title field in *key-numbers*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: key_numbers.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * column field in *key-numbers*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: key_numbers.column[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	column: prismic.GroupField<Simplify<KeyNumbersDocumentDataColumnItem>>;
}

/**
 * key-numbers document from Prismic
 *
 * - **API ID**: `key_numbers`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type KeyNumbersDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<KeyNumbersDocumentData>, "key_numbers", Lang>;

/**
 * Primary content in *legal-notices → Slice zone → section → Primary*
 */
export interface LegalNoticesDocumentDataBodySectionSlicePrimary {
	/**
	 * logo field in *legal-notices → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal-notices.body[].section.primary.logo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
	
	/**
	 * title field in *legal-notices → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal-notices.body[].section.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * description field in *legal-notices → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal-notices.body[].section.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * button_title field in *legal-notices → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal-notices.body[].section.primary.button_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	button_title: prismic.RichTextField;
	
	/**
	 * button_link field in *legal-notices → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal-notices.body[].section.primary.button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item content in *legal-notices → Slice zone → section → Items*
 */
export interface LegalNoticesDocumentDataBodySectionSliceItem {
	/**
	 * paragraph field in *legal-notices → Slice zone → section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal-notices.body[].section.items.paragraph
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	paragraph: prismic.RichTextField;
}

/**
 * Slice for *legal-notices → Slice zone*
 */
export type LegalNoticesDocumentDataBodySectionSlice = prismic.Slice<"section", Simplify<LegalNoticesDocumentDataBodySectionSlicePrimary>, Simplify<LegalNoticesDocumentDataBodySectionSliceItem>>

/**
 * Primary content in *legal-notices → Slice zone → Text → Primary*
 */
export interface LegalNoticesDocumentDataBodyTextSlicePrimary {
	/**
	 * text field in *legal-notices → Slice zone → Text → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Your content here
	 * - **API ID Path**: legal-notices.body[].text.primary.text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	text: prismic.RichTextField;
}

/**
 * Slice for *legal-notices → Slice zone*
 */
export type LegalNoticesDocumentDataBodyTextSlice = prismic.Slice<"text", Simplify<LegalNoticesDocumentDataBodyTextSlicePrimary>, never>

type LegalNoticesDocumentDataBodySlice = LegalNoticesDocumentDataBodySectionSlice | LegalNoticesDocumentDataBodyTextSlice

/**
 * Primary content in *legal-notices → Slice zone → General Card → Primary*
 */
export interface LegalNoticesDocumentDataMetaGeneralCardSlicePrimary {
	/**
	 * Title field in *legal-notices → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Title...
	 * - **API ID Path**: legal-notices.meta[].general_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *legal-notices → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Description...
	 * - **API ID Path**: legal-notices.meta[].general_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *legal-notices → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal-notices.meta[].general_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Slice for *legal-notices → Slice zone*
 */
export type LegalNoticesDocumentDataMetaGeneralCardSlice = prismic.Slice<"general_card", Simplify<LegalNoticesDocumentDataMetaGeneralCardSlicePrimary>, never>

/**
 * Primary content in *legal-notices → Slice zone → Twitter Card → Primary*
 */
export interface LegalNoticesDocumentDataMetaTwitterCardSlicePrimary {
	/**
	 * Title field in *legal-notices → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Title...
	 * - **API ID Path**: legal-notices.meta[].twitter_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *legal-notices → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Description...
	 * - **API ID Path**: legal-notices.meta[].twitter_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *legal-notices → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal-notices.meta[].twitter_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<"large_image">;
}

/**
 * Slice for *legal-notices → Slice zone*
 */
export type LegalNoticesDocumentDataMetaTwitterCardSlice = prismic.Slice<"twitter_card", Simplify<LegalNoticesDocumentDataMetaTwitterCardSlicePrimary>, never>

type LegalNoticesDocumentDataMetaSlice = LegalNoticesDocumentDataMetaGeneralCardSlice | LegalNoticesDocumentDataMetaTwitterCardSlice

/**
 * Content for legal-notices documents
 */
interface LegalNoticesDocumentData {
	/**
	 * title field in *legal-notices*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal-notices.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Slice zone field in *legal-notices*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal-notices.body[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	body: prismic.SliceZone<LegalNoticesDocumentDataBodySlice>;/**
	 * Slice zone field in *legal-notices*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal-notices.meta[]
	 * - **Tab**: Social Cards
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	meta: prismic.SliceZone<LegalNoticesDocumentDataMetaSlice>;
}

/**
 * legal-notices document from Prismic
 *
 * - **API ID**: `legal-notices`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type LegalNoticesDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<LegalNoticesDocumentData>, "legal-notices", Lang>;

/**
 * Content for Loe vijr fje documents
 */
interface LoremIpsumDolorDocumentData {
	/**
	 * title field in *Loe vijr fje*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: lorem_ipsum_dolor.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
}

/**
 * Loe vijr fje document from Prismic
 *
 * - **API ID**: `lorem_ipsum_dolor`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type LoremIpsumDolorDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<LoremIpsumDolorDocumentData>, "lorem_ipsum_dolor", Lang>;

/**
 * Item content in *Main Footer → Slice zone → social_media → Items*
 */
export interface MainFooterDocumentDataBodySocialMediaSliceItem {
	/**
	 * social media image field in *Main Footer → Slice zone → social_media → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_footer.body[].social_media.items.socialmedia_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	socialmedia_image: prismic.ImageField<never>;
	
	/**
	 * socialmedia url field in *Main Footer → Slice zone → social_media → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_footer.body[].social_media.items.socialmedia_url
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	socialmedia_url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *Main Footer → Slice zone*
 */
export type MainFooterDocumentDataBodySocialMediaSlice = prismic.Slice<"social_media", Record<string, never>, Simplify<MainFooterDocumentDataBodySocialMediaSliceItem>>

/**
 * Item content in *Main Footer → Slice zone → logos_zone → Items*
 */
export interface MainFooterDocumentDataBodyLogosZoneSliceItem {
	/**
	 * image field in *Main Footer → Slice zone → logos_zone → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_footer.body[].logos_zone.items.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * url field in *Main Footer → Slice zone → logos_zone → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_footer.body[].logos_zone.items.url
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *Main Footer → Slice zone*
 */
export type MainFooterDocumentDataBodyLogosZoneSlice = prismic.Slice<"logos_zone", Record<string, never>, Simplify<MainFooterDocumentDataBodyLogosZoneSliceItem>>

/**
 * Primary content in *Main Footer → Slice zone → Text → Primary*
 */
export interface MainFooterDocumentDataBodyTextSlicePrimary {
	/**
	 * text field in *Main Footer → Slice zone → Text → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Your content here
	 * - **API ID Path**: main_footer.body[].text.primary.text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	text: prismic.RichTextField;
}

/**
 * Slice for *Main Footer → Slice zone*
 */
export type MainFooterDocumentDataBodyTextSlice = prismic.Slice<"text", Simplify<MainFooterDocumentDataBodyTextSlicePrimary>, never>

/**
 * Primary content in *Main Footer → Slice zone → navigation_group → Primary*
 */
export interface MainFooterDocumentDataBodyNavigationGroupSlicePrimary {
	/**
	 * title field in *Main Footer → Slice zone → navigation_group → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_footer.body[].navigation_group.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
}

/**
 * Item content in *Main Footer → Slice zone → navigation_group → Items*
 */
export interface MainFooterDocumentDataBodyNavigationGroupSliceItem {
	/**
	 * link name field in *Main Footer → Slice zone → navigation_group → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_footer.body[].navigation_group.items.link_name
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	link_name: prismic.RichTextField;
	
	/**
	 * link url field in *Main Footer → Slice zone → navigation_group → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_footer.body[].navigation_group.items.link_url
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link_url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *Main Footer → Slice zone*
 */
export type MainFooterDocumentDataBodyNavigationGroupSlice = prismic.Slice<"navigation_group", Simplify<MainFooterDocumentDataBodyNavigationGroupSlicePrimary>, Simplify<MainFooterDocumentDataBodyNavigationGroupSliceItem>>

type MainFooterDocumentDataBodySlice = MainFooterDocumentDataBodySocialMediaSlice | MainFooterDocumentDataBodyLogosZoneSlice | MainFooterDocumentDataBodyTextSlice | MainFooterDocumentDataBodyNavigationGroupSlice

/**
 * Content for Main Footer documents
 */
interface MainFooterDocumentData {
	/**
	 * footer for field in *Main Footer*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: pix-site
	 * - **API ID Path**: main_footer.footer_for
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	footer_for: prismic.SelectField<"pix-site" | "pix-pro", "filled">;
	
	/**
	 * Slice zone field in *Main Footer*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_footer.body[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	body: prismic.SliceZone<MainFooterDocumentDataBodySlice>;
}

/**
 * Main Footer document from Prismic
 *
 * - **API ID**: `main_footer`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type MainFooterDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<MainFooterDocumentData>, "main_footer", Lang>;

/**
 * Item content in *Main Navigation → Slice zone → logos_zone → Items*
 */
export interface MainNavigationDocumentDataBodyLogosZoneSliceItem {
	/**
	 * image field in *Main Navigation → Slice zone → logos_zone → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation.body[].logos_zone.items.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * url field in *Main Navigation → Slice zone → logos_zone → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation.body[].logos_zone.items.url
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *Main Navigation → Slice zone*
 */
export type MainNavigationDocumentDataBodyLogosZoneSlice = prismic.Slice<"logos_zone", Record<string, never>, Simplify<MainNavigationDocumentDataBodyLogosZoneSliceItem>>

/**
 * Item content in *Main Navigation → Slice zone → navigation_zone → Items*
 */
export interface MainNavigationDocumentDataBodyNavigationZoneSliceItem {
	/**
	 * Name field in *Main Navigation → Slice zone → navigation_zone → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation.body[].navigation_zone.items.name
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	name: prismic.RichTextField;
	
	/**
	 * link field in *Main Navigation → Slice zone → navigation_zone → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation.body[].navigation_zone.items.link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * group field in *Main Navigation → Slice zone → navigation_zone → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation.body[].navigation_zone.items.group
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	group: prismic.RichTextField;
}

/**
 * Slice for *Main Navigation → Slice zone*
 */
export type MainNavigationDocumentDataBodyNavigationZoneSlice = prismic.Slice<"navigation_zone", Record<string, never>, Simplify<MainNavigationDocumentDataBodyNavigationZoneSliceItem>>

/**
 * Item content in *Main Navigation → Slice zone → actions_zone → Items*
 */
export interface MainNavigationDocumentDataBodyActionsZoneSliceItem {
	/**
	 * icon field in *Main Navigation → Slice zone → actions_zone → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: fontawesome icon name
	 * - **API ID Path**: main_navigation.body[].actions_zone.items.icon
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	icon: prismic.KeyTextField;
	
	/**
	 * Name field in *Main Navigation → Slice zone → actions_zone → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation.body[].actions_zone.items.name
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	name: prismic.RichTextField;
	
	/**
	 * link field in *Main Navigation → Slice zone → actions_zone → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation.body[].actions_zone.items.link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * style field in *Main Navigation → Slice zone → actions_zone → Items*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: button
	 * - **API ID Path**: main_navigation.body[].actions_zone.items.style
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	style: prismic.SelectField<"button" | "link", "filled">;
}

/**
 * Slice for *Main Navigation → Slice zone*
 */
export type MainNavigationDocumentDataBodyActionsZoneSlice = prismic.Slice<"actions_zone", Record<string, never>, Simplify<MainNavigationDocumentDataBodyActionsZoneSliceItem>>

/**
 * Primary content in *Main Navigation → Slice zone → process_zone → Primary*
 */
export interface MainNavigationDocumentDataBodyProcessZoneSlicePrimary {
	/**
	 * process_title field in *Main Navigation → Slice zone → process_zone → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation.body[].process_zone.primary.process_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	process_title: prismic.RichTextField;
	
	/**
	 * process_subtitle field in *Main Navigation → Slice zone → process_zone → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation.body[].process_zone.primary.process_subtitle
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	process_subtitle: prismic.RichTextField;
}

/**
 * Item content in *Main Navigation → Slice zone → process_zone → Items*
 */
export interface MainNavigationDocumentDataBodyProcessZoneSliceItem {
	/**
	 * item_image field in *Main Navigation → Slice zone → process_zone → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation.body[].process_zone.items.item_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	item_image: prismic.ImageField<never>;
	
	/**
	 * item_title field in *Main Navigation → Slice zone → process_zone → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation.body[].process_zone.items.item_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	item_title: prismic.RichTextField;
	
	/**
	 * item_description field in *Main Navigation → Slice zone → process_zone → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation.body[].process_zone.items.item_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	item_description: prismic.RichTextField;
}

/**
 * Slice for *Main Navigation → Slice zone*
 */
export type MainNavigationDocumentDataBodyProcessZoneSlice = prismic.Slice<"process_zone", Simplify<MainNavigationDocumentDataBodyProcessZoneSlicePrimary>, Simplify<MainNavigationDocumentDataBodyProcessZoneSliceItem>>

type MainNavigationDocumentDataBodySlice = MainNavigationDocumentDataBodyLogosZoneSlice | MainNavigationDocumentDataBodyNavigationZoneSlice | MainNavigationDocumentDataBodyActionsZoneSlice | MainNavigationDocumentDataBodyProcessZoneSlice

/**
 * Content for Main Navigation documents
 */
interface MainNavigationDocumentData {
	/**
	 * navigation for field in *Main Navigation*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: pix-site
	 * - **API ID Path**: main_navigation.navigation_for
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	navigation_for: prismic.SelectField<"pix-site" | "pix-pro", "filled">;
	
	/**
	 * Slice zone field in *Main Navigation*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation.body[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	body: prismic.SliceZone<MainNavigationDocumentDataBodySlice>;
}

/**
 * Main Navigation document from Prismic
 *
 * - **API ID**: `main_navigation`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type MainNavigationDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<MainNavigationDocumentData>, "main_navigation", Lang>;

/**
 * Item content in *Main Navigation V2 → Slice zone → logos_zone → Items*
 */
export interface MainNavigationV2DocumentDataBodyLogosZoneSliceItem {
	/**
	 * image field in *Main Navigation V2 → Slice zone → logos_zone → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].logos_zone.items.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * url field in *Main Navigation V2 → Slice zone → logos_zone → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].logos_zone.items.url
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *Main Navigation V2 → Slice zone*
 */
export type MainNavigationV2DocumentDataBodyLogosZoneSlice = prismic.Slice<"logos_zone", Record<string, never>, Simplify<MainNavigationV2DocumentDataBodyLogosZoneSliceItem>>

/**
 * Item content in *Main Navigation V2 → Slice zone → navigation_zone → Items*
 */
export interface MainNavigationV2DocumentDataBodyNavigationZoneSliceItem {
	/**
	 * category name field in *Main Navigation V2 → Slice zone → navigation_zone → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].navigation_zone.items.categoryName
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	categoryName: prismic.RichTextField;
	
	/**
	 * description category title field in *Main Navigation V2 → Slice zone → navigation_zone → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].navigation_zone.items.descriptionCategoryTitle
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	descriptionCategoryTitle: prismic.RichTextField;
	
	/**
	 * description category text field in *Main Navigation V2 → Slice zone → navigation_zone → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].navigation_zone.items.descriptionCategoryText
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	descriptionCategoryText: prismic.RichTextField;
	
	/**
	 * menu section title field in *Main Navigation V2 → Slice zone → navigation_zone → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].navigation_zone.items.menuSectionTitle
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	menuSectionTitle: prismic.RichTextField;
	
	/**
	 * menu name field in *Main Navigation V2 → Slice zone → navigation_zone → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].navigation_zone.items.menuName
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	menuName: prismic.RichTextField;
	
	/**
	 * menu link field in *Main Navigation V2 → Slice zone → navigation_zone → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].navigation_zone.items.menuLink
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	menuLink: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * menu icon before text field in *Main Navigation V2 → Slice zone → navigation_zone → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: fontawesome icon name
	 * - **API ID Path**: main_navigation_v2.body[].navigation_zone.items.beforeIcon
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	beforeIcon: prismic.KeyTextField;
	
	/**
	 * alternative text for before icon field in *Main Navigation V2 → Slice zone → navigation_zone → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].navigation_zone.items.alternativeTextForBeforeIcon
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	alternativeTextForBeforeIcon: prismic.RichTextField;
	
	/**
	 * menu icon after text field in *Main Navigation V2 → Slice zone → navigation_zone → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: fontawesome icon name
	 * - **API ID Path**: main_navigation_v2.body[].navigation_zone.items.afterIcon
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	afterIcon: prismic.KeyTextField;
	
	/**
	 * alternative text for after icon field in *Main Navigation V2 → Slice zone → navigation_zone → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].navigation_zone.items.alternativeTextForAfterIcon
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	alternativeTextForAfterIcon: prismic.RichTextField;
	
	/**
	 * separator field in *Main Navigation V2 → Slice zone → navigation_zone → Items*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].navigation_zone.items.separator
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	separator: prismic.BooleanField;
}

/**
 * Slice for *Main Navigation V2 → Slice zone*
 */
export type MainNavigationV2DocumentDataBodyNavigationZoneSlice = prismic.Slice<"navigation_zone", Record<string, never>, Simplify<MainNavigationV2DocumentDataBodyNavigationZoneSliceItem>>

/**
 * Primary content in *Main Navigation V2 → Slice zone → actions_zone → Primary*
 */
export interface MainNavigationV2DocumentDataBodyActionsZoneSlicePrimary {
	/**
	 * helper icon field in *Main Navigation V2 → Slice zone → actions_zone → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: fontawesome icon name
	 * - **API ID Path**: main_navigation_v2.body[].actions_zone.primary.helperIcon
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	helperIcon: prismic.KeyTextField;
	
	/**
	 * helper name field in *Main Navigation V2 → Slice zone → actions_zone → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].actions_zone.primary.helperName
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	helperName: prismic.RichTextField;
	
	/**
	 * helper link field in *Main Navigation V2 → Slice zone → actions_zone → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].actions_zone.primary.helperLink
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	helperLink: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item content in *Main Navigation V2 → Slice zone → actions_zone → Items*
 */
export interface MainNavigationV2DocumentDataBodyActionsZoneSliceItem {
	/**
	 * icon field in *Main Navigation V2 → Slice zone → actions_zone → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: fontawesome icon name
	 * - **API ID Path**: main_navigation_v2.body[].actions_zone.items.icon
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	icon: prismic.KeyTextField;
	
	/**
	 * Name field in *Main Navigation V2 → Slice zone → actions_zone → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].actions_zone.items.name
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	name: prismic.RichTextField;
	
	/**
	 * link field in *Main Navigation V2 → Slice zone → actions_zone → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].actions_zone.items.link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * style field in *Main Navigation V2 → Slice zone → actions_zone → Items*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: button
	 * - **API ID Path**: main_navigation_v2.body[].actions_zone.items.style
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	style: prismic.SelectField<"button" | "link", "filled">;
}

/**
 * Slice for *Main Navigation V2 → Slice zone*
 */
export type MainNavigationV2DocumentDataBodyActionsZoneSlice = prismic.Slice<"actions_zone", Simplify<MainNavigationV2DocumentDataBodyActionsZoneSlicePrimary>, Simplify<MainNavigationV2DocumentDataBodyActionsZoneSliceItem>>

/**
 * Primary content in *Main Navigation V2 → Slice zone → process → Primary*
 */
export interface MainNavigationV2DocumentDataBodyProcessSlicePrimary {
	/**
	 * process_should_display_title field in *Main Navigation V2 → Slice zone → process → Primary*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: true
	 * - **API ID Path**: main_navigation_v2.body[].process.primary.process_should_display_title
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	process_should_display_title: prismic.BooleanField;
	
	/**
	 * process_title field in *Main Navigation V2 → Slice zone → process → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Mandatory field
	 * - **API ID Path**: main_navigation_v2.body[].process.primary.process_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	process_title: prismic.RichTextField;
	
	/**
	 * process_should_use_subtitle field in *Main Navigation V2 → Slice zone → process → Primary*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: main_navigation_v2.body[].process.primary.process_should_use_subtitle
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	process_should_use_subtitle: prismic.BooleanField;
	
	/**
	 * process_subtitle field in *Main Navigation V2 → Slice zone → process → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].process.primary.process_subtitle
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	process_subtitle: prismic.RichTextField;
	
	/**
	 * process_background_color field in *Main Navigation V2 → Slice zone → process → Primary*
	 *
	 * - **Field Type**: Color
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].process.primary.process_background_color
	 * - **Documentation**: https://prismic.io/docs/fields/color
	 */
	process_background_color: prismic.ColorField;
}

/**
 * Item content in *Main Navigation V2 → Slice zone → process → Items*
 */
export interface MainNavigationV2DocumentDataBodyProcessSliceItem {
	/**
	 * item_image field in *Main Navigation V2 → Slice zone → process → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].process.items.item_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	item_image: prismic.ImageField<never>;
	
	/**
	 * item_title field in *Main Navigation V2 → Slice zone → process → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].process.items.item_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	item_title: prismic.RichTextField;
	
	/**
	 * item_description field in *Main Navigation V2 → Slice zone → process → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[].process.items.item_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	item_description: prismic.RichTextField;
}

/**
 * Slice for *Main Navigation V2 → Slice zone*
 */
export type MainNavigationV2DocumentDataBodyProcessSlice = prismic.Slice<"process", Simplify<MainNavigationV2DocumentDataBodyProcessSlicePrimary>, Simplify<MainNavigationV2DocumentDataBodyProcessSliceItem>>

type MainNavigationV2DocumentDataBodySlice = MainNavigationV2DocumentDataBodyLogosZoneSlice | MainNavigationV2DocumentDataBodyNavigationZoneSlice | MainNavigationV2DocumentDataBodyActionsZoneSlice | MainNavigationV2DocumentDataBodyProcessSlice

/**
 * Content for Main Navigation V2 documents
 */
interface MainNavigationV2DocumentData {
	/**
	 * navigation for field in *Main Navigation V2*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: pix-site
	 * - **API ID Path**: main_navigation_v2.navigation_for
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	navigation_for: prismic.SelectField<"pix-site" | "pix-pro", "filled">;
	
	/**
	 * Slice zone field in *Main Navigation V2*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: main_navigation_v2.body[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	body: prismic.SliceZone<MainNavigationV2DocumentDataBodySlice>;
}

/**
 * Main Navigation V2 document from Prismic
 *
 * - **API ID**: `main_navigation_v2`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type MainNavigationV2Document<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<MainNavigationV2DocumentData>, "main_navigation_v2", Lang>;

/**
 * Primary content in *mediation → Slice zone → hero-banner → Primary*
 */
export interface MediationDocumentDataBodyHeroBannerSlicePrimary {
	/**
	 * Title field in *mediation → Slice zone → hero-banner → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.body[].hero-banner.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
}

/**
 * Item content in *mediation → Slice zone → hero-banner → Items*
 */
export interface MediationDocumentDataBodyHeroBannerSliceItem {
	/**
	 * title_button field in *mediation → Slice zone → hero-banner → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.body[].hero-banner.items.title_button
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title_button: prismic.RichTextField;
	
	/**
	 * link_button field in *mediation → Slice zone → hero-banner → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.body[].hero-banner.items.link_button
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link_button: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *mediation → Slice zone*
 */
export type MediationDocumentDataBodyHeroBannerSlice = prismic.Slice<"hero-banner", Simplify<MediationDocumentDataBodyHeroBannerSlicePrimary>, Simplify<MediationDocumentDataBodyHeroBannerSliceItem>>

/**
 * Primary content in *mediation → Slice zone → left-section → Primary*
 */
export interface MediationDocumentDataBodyLeftSectionSlicePrimary {
	/**
	 * title field in *mediation → Slice zone → left-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.body[].left-section.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * description field in *mediation → Slice zone → left-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.body[].left-section.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
}

/**
 * Item content in *mediation → Slice zone → left-section → Items*
 */
export interface MediationDocumentDataBodyLeftSectionSliceItem {
	/**
	 * paragraph field in *mediation → Slice zone → left-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.body[].left-section.items.paragraph
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	paragraph: prismic.RichTextField;
}

/**
 * Slice for *mediation → Slice zone*
 */
export type MediationDocumentDataBodyLeftSectionSlice = prismic.Slice<"left-section", Simplify<MediationDocumentDataBodyLeftSectionSlicePrimary>, Simplify<MediationDocumentDataBodyLeftSectionSliceItem>>

/**
 * Primary content in *mediation → Slice zone → insert → Primary*
 */
export interface MediationDocumentDataBodyInsertSlicePrimary {
	/**
	 * title field in *mediation → Slice zone → insert → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.body[].insert.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * description field in *mediation → Slice zone → insert → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.body[].insert.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
}

/**
 * Item content in *mediation → Slice zone → insert → Items*
 */
export interface MediationDocumentDataBodyInsertSliceItem {
	/**
	 * column field in *mediation → Slice zone → insert → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.body[].insert.items.column
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	column: prismic.RichTextField;
}

/**
 * Slice for *mediation → Slice zone*
 */
export type MediationDocumentDataBodyInsertSlice = prismic.Slice<"insert", Simplify<MediationDocumentDataBodyInsertSlicePrimary>, Simplify<MediationDocumentDataBodyInsertSliceItem>>

/**
 * Primary content in *mediation → Slice zone → section → Primary*
 */
export interface MediationDocumentDataBodySection1SlicePrimary {
	/**
	 * logo field in *mediation → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.body[].section1.primary.logo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
	
	/**
	 * title field in *mediation → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.body[].section1.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * description field in *mediation → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.body[].section1.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * button_title field in *mediation → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.body[].section1.primary.button_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	button_title: prismic.RichTextField;
	
	/**
	 * button_link field in *mediation → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.body[].section1.primary.button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item content in *mediation → Slice zone → section → Items*
 */
export interface MediationDocumentDataBodySection1SliceItem {
	/**
	 * paragraph field in *mediation → Slice zone → section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.body[].section1.items.paragraph
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	paragraph: prismic.RichTextField;
}

/**
 * Slice for *mediation → Slice zone*
 */
export type MediationDocumentDataBodySection1Slice = prismic.Slice<"section1", Simplify<MediationDocumentDataBodySection1SlicePrimary>, Simplify<MediationDocumentDataBodySection1SliceItem>>

type MediationDocumentDataBodySlice = MediationDocumentDataBodyHeroBannerSlice | MediationDocumentDataBodyLeftSectionSlice | MediationDocumentDataBodyInsertSlice | MediationDocumentDataBodySection1Slice

/**
 * Primary content in *mediation → Slice zone → General Card → Primary*
 */
export interface MediationDocumentDataMetaGeneralCardSlicePrimary {
	/**
	 * Title field in *mediation → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Title...
	 * - **API ID Path**: mediation.meta[].general_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *mediation → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Description...
	 * - **API ID Path**: mediation.meta[].general_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *mediation → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.meta[].general_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Slice for *mediation → Slice zone*
 */
export type MediationDocumentDataMetaGeneralCardSlice = prismic.Slice<"general_card", Simplify<MediationDocumentDataMetaGeneralCardSlicePrimary>, never>

/**
 * Primary content in *mediation → Slice zone → Twitter Card → Primary*
 */
export interface MediationDocumentDataMetaTwitterCardSlicePrimary {
	/**
	 * Title field in *mediation → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Title...
	 * - **API ID Path**: mediation.meta[].twitter_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *mediation → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Description...
	 * - **API ID Path**: mediation.meta[].twitter_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *mediation → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.meta[].twitter_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<"large_image">;
}

/**
 * Slice for *mediation → Slice zone*
 */
export type MediationDocumentDataMetaTwitterCardSlice = prismic.Slice<"twitter_card", Simplify<MediationDocumentDataMetaTwitterCardSlicePrimary>, never>

type MediationDocumentDataMetaSlice = MediationDocumentDataMetaGeneralCardSlice | MediationDocumentDataMetaTwitterCardSlice

/**
 * Content for mediation documents
 */
interface MediationDocumentData {
	/**
	 * Slice zone field in *mediation*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.body[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	body: prismic.SliceZone<MediationDocumentDataBodySlice>;/**
	 * Slice zone field in *mediation*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mediation.meta[]
	 * - **Tab**: Social Cards
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	meta: prismic.SliceZone<MediationDocumentDataMetaSlice>;
}

/**
 * mediation document from Prismic
 *
 * - **API ID**: `mediation`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type MediationDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<MediationDocumentData>, "mediation", Lang>;

/**
 * Content for Mention DP détaillée documents
 */
interface MentionDpDetailleeDocumentData {
	/**
	 * Titre Mention DP détaillée field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: "Données personnelles - <traitement>"
	 * - **API ID Path**: mention_dp_detaillee.titre_mention_dp_detaillee
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	titre_mention_dp_detaillee: prismic.RichTextField;
	
	/**
	 * Texte Intro field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mention_dp_detaillee.texte_intro
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	texte_intro: prismic.RichTextField;
	
	/**
	 * Données field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Données
	 * - **API ID Path**: mention_dp_detaillee.donnees
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	donnees: prismic.RichTextField;
	
	/**
	 * Texte Données field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mention_dp_detaillee.texte_donnees
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	texte_donnees: prismic.RichTextField;
	
	/**
	 * Finalité field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Finalité du traitement de vos données à caractère personnel
	 * - **API ID Path**: mention_dp_detaillee.finalite
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	finalite: prismic.RichTextField;
	
	/**
	 * Texte Finalité field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mention_dp_detaillee.texte_finalite
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	texte_finalite: prismic.RichTextField;
	
	/**
	 * durée de conservation field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Durée de conservation de vos données à caractère personnel
	 * - **API ID Path**: mention_dp_detaillee.duree_de_conservation
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	duree_de_conservation: prismic.RichTextField;
	
	/**
	 * Texte Durée de conservation field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mention_dp_detaillee.texte_duree_de_conservation
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	texte_duree_de_conservation: prismic.RichTextField;
	
	/**
	 * Destinataires field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Destinataires de vos données à caractère personnel
	 * - **API ID Path**: mention_dp_detaillee.destinataires
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	destinataires: prismic.RichTextField;
	
	/**
	 * Texte Destinataires field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mention_dp_detaillee.texte_destinataires
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	texte_destinataires: prismic.RichTextField;
	
	/**
	 * Base juridique field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Base juridique du traitement de vos données à caractère personnel
	 * - **API ID Path**: mention_dp_detaillee.base_juridique
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	base_juridique: prismic.RichTextField;
	
	/**
	 * Texte Base juridique field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mention_dp_detaillee.texte_base_juridique
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	texte_base_juridique: prismic.RichTextField;
	
	/**
	 * Sécurité field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Sécurité de vos données à caractère personnel
	 * - **API ID Path**: mention_dp_detaillee.securite
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	securite: prismic.RichTextField;
	
	/**
	 * Texte Sécurité field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mention_dp_detaillee.texte_securite
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	texte_securite: prismic.RichTextField;
	
	/**
	 * personnes concernées field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Personnes concernées
	 * - **API ID Path**: mention_dp_detaillee.personnes_concernees
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	personnes_concernees: prismic.RichTextField;
	
	/**
	 * Texte Personnes concernées field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mention_dp_detaillee.texte_personnes_concernees
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	texte_personnes_concernees: prismic.RichTextField;
	
	/**
	 * Vos droits field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Vos droits sur vos données à caractère personnel
	 * - **API ID Path**: mention_dp_detaillee.vos_droits
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	vos_droits: prismic.RichTextField;
	
	/**
	 * Texte Vos droits field in *Mention DP détaillée*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mention_dp_detaillee.texte_vos_droits
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	texte_vos_droits: prismic.RichTextField;
}

/**
 * Mention DP détaillée document from Prismic
 *
 * - **API ID**: `mention_dp_detaillee`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type MentionDpDetailleeDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<MentionDpDetailleeDocumentData>, "mention_dp_detaillee", Lang>;

/**
 * Primary content in *Navigation → Slice zone → Element → Primary*
 */
export interface NavigationDocumentDataBodyElementSlicePrimary {
	/**
	 * Element of nav field in *Navigation → Slice zone → Element → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: main-nav
	 * - **API ID Path**: navigation.body[].element.primary.type
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	type: prismic.SelectField<"organizations-nav" | "main-nav" | "about-nav" | "ressources-nav" | "burger-menu-top" | "burger-menu-bottom" | "pix-pro-organizations-nav" | "pix-pro-burger-menu-bottom" | "pix-pro-burger-menu-middle", "filled">;
	
	/**
	 * title field in *Navigation → Slice zone → Element → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: navigation.body[].element.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * link field in *Navigation → Slice zone → Element → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: navigation.body[].element.primary.link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *Navigation → Slice zone*
 */
export type NavigationDocumentDataBodyElementSlice = prismic.Slice<"element", Simplify<NavigationDocumentDataBodyElementSlicePrimary>, never>

type NavigationDocumentDataBodySlice = NavigationDocumentDataBodyElementSlice

/**
 * Content for Navigation documents
 */
interface NavigationDocumentData {
	/**
	 * Title field in *Navigation*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: navigation.title
	 * - **Tab**: Navigation
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Slice zone field in *Navigation*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: navigation.body[]
	 * - **Tab**: Navigation
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	body: prismic.SliceZone<NavigationDocumentDataBodySlice>;
}

/**
 * Navigation document from Prismic
 *
 * - **API ID**: `navigation`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type NavigationDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<NavigationDocumentData>, "navigation", Lang>;

/**
 * Primary content in *News item → Slice zone → Web snippet → Primary*
 */
export interface NewsItemDocumentDataSlicesWebSnippetSlicePrimary {
	/**
	 * code field in *News item → Slice zone → Web snippet → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: news_item.slices[].web_snippet.primary.code
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	code: prismic.RichTextField;
}

/**
 * Slice for *News item → Slice zone*
 */
export type NewsItemDocumentDataSlicesWebSnippetSlice = prismic.Slice<"web_snippet", Simplify<NewsItemDocumentDataSlicesWebSnippetSlicePrimary>, never>

/**
 * Primary content in *News item → Slice zone → Multiple column → Primary*
 */
export interface NewsItemDocumentDataSlicesMultipleColumnSlicePrimary {
	/**
	 * vertical align center field in *News item → Slice zone → Multiple column → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: news_item.slices[].multiple_column.primary.vertical_align_center
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	vertical_align_center: prismic.SelectField<"false" | "true", "filled">;
}

/**
 * Item content in *News item → Slice zone → Multiple column → Items*
 */
export interface NewsItemDocumentDataSlicesMultipleColumnSliceItem {
	/**
	 * Column content field in *News item → Slice zone → Multiple column → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: news_item.slices[].multiple_column.items.column_content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	column_content: prismic.RichTextField;
}

/**
 * Slice for *News item → Slice zone*
 */
export type NewsItemDocumentDataSlicesMultipleColumnSlice = prismic.Slice<"multiple_column", Simplify<NewsItemDocumentDataSlicesMultipleColumnSlicePrimary>, Simplify<NewsItemDocumentDataSlicesMultipleColumnSliceItem>>

/**
 * Primary content in *News item → Slice zone → Rich text → Primary*
 */
export interface NewsItemDocumentDataSlicesRichTextSlicePrimary {
	/**
	 * text field in *News item → Slice zone → Rich text → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: news_item.slices[].rich_text.primary.text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	text: prismic.RichTextField;
}

/**
 * Slice for *News item → Slice zone*
 */
export type NewsItemDocumentDataSlicesRichTextSlice = prismic.Slice<"rich_text", Simplify<NewsItemDocumentDataSlicesRichTextSlicePrimary>, never>

type NewsItemDocumentDataSlicesSlice = NewsItemDocumentDataSlicesWebSnippetSlice | NewsItemDocumentDataSlicesMultipleColumnSlice | NewsItemDocumentDataSlicesRichTextSlice

/**
 * Primary content in *News item → Slice zone → General Card → Primary*
 */
export interface NewsItemDocumentDataMetaGeneralCardSlicePrimary {
	/**
	 * Title field in *News item → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Title...
	 * - **API ID Path**: news_item.meta[].general_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *News item → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Description...
	 * - **API ID Path**: news_item.meta[].general_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *News item → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: news_item.meta[].general_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Slice for *News item → Slice zone*
 */
export type NewsItemDocumentDataMetaGeneralCardSlice = prismic.Slice<"general_card", Simplify<NewsItemDocumentDataMetaGeneralCardSlicePrimary>, never>

/**
 * Primary content in *News item → Slice zone → Twitter Card → Primary*
 */
export interface NewsItemDocumentDataMetaTwitterCardSlicePrimary {
	/**
	 * Title field in *News item → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Title...
	 * - **API ID Path**: news_item.meta[].twitter_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *News item → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Description...
	 * - **API ID Path**: news_item.meta[].twitter_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *News item → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: news_item.meta[].twitter_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<"large_image">;
}

/**
 * Slice for *News item → Slice zone*
 */
export type NewsItemDocumentDataMetaTwitterCardSlice = prismic.Slice<"twitter_card", Simplify<NewsItemDocumentDataMetaTwitterCardSlicePrimary>, never>

type NewsItemDocumentDataMetaSlice = NewsItemDocumentDataMetaGeneralCardSlice | NewsItemDocumentDataMetaTwitterCardSlice

/**
 * Content for News item documents
 */
interface NewsItemDocumentData {
	/**
	 * Title field in *News item*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: news_item.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Category field in *News item*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: Announcement
	 * - **API ID Path**: news_item.category
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	category: prismic.SelectField<"Announcement" | "Event" | "Feature" | "Society" | "Engineering", "filled">;
	
	/**
	 * date field in *News item*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: *None*
	 * - **API ID Path**: news_item.date
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	date: prismic.DateField;
	
	/**
	 * Excerpt field in *News item*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Privilégier 1 phrase ne dépassant pas la zone de saisie (soit une vingtaine de mots).
	 * - **API ID Path**: news_item.excerpt
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	excerpt: prismic.RichTextField;
	
	/**
	 * Body field in *News item*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: news_item.body
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Illustration field in *News item*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: news_item.illustration
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	illustration: prismic.ImageField<never>;
	
	/**
	 * Slice zone field in *News item*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: news_item.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<NewsItemDocumentDataSlicesSlice>;/**
	 * title field in *News item*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: news_item.title_meta_head
	 * - **Tab**: Social Cards
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title_meta_head: prismic.RichTextField;
	
	/**
	 * description field in *News item*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: news_item.description_meta_head
	 * - **Tab**: Social Cards
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description_meta_head: prismic.RichTextField;
	
	/**
	 * image field in *News item*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: news_item.image_meta_head
	 * - **Tab**: Social Cards
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image_meta_head: prismic.ImageField<never>;
	
	/**
	 * Slice zone field in *News item*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: news_item.meta[]
	 * - **Tab**: Social Cards
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	meta: prismic.SliceZone<NewsItemDocumentDataMetaSlice>;
}

/**
 * News item document from Prismic
 *
 * - **API ID**: `news_item`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type NewsItemDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<NewsItemDocumentData>, "news_item", Lang>;

/**
 * Item in *Partners page → Organizations*
 */
export interface PartnersPageDocumentDataOrganizationsItem {
	/**
	 * Organization logo field in *Partners page → Organizations*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.organizations[].organization_logo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	organization_logo: prismic.ImageField<never>;
	
	/**
	 * Organization name field in *Partners page → Organizations*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.organizations[].organization_name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	organization_name: prismic.KeyTextField;
	
	/**
	 * Organization website field in *Partners page → Organizations*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.organizations[].organization_website
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	organization_website: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *Partners page → Schools*
 */
export interface PartnersPageDocumentDataSchoolsItem {
	/**
	 * School logo field in *Partners page → Schools*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.schools[].school_logo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	school_logo: prismic.ImageField<never>;
	
	/**
	 * School name field in *Partners page → Schools*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.schools[].school_name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	school_name: prismic.KeyTextField;
	
	/**
	 * School link field in *Partners page → Schools*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.schools[].school_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	school_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Primary content in *Partners page → Slice zone → General Card → Primary*
 */
export interface PartnersPageDocumentDataMetaGeneralCardSlicePrimary {
	/**
	 * Title field in *Partners page → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Title...
	 * - **API ID Path**: partners_page.meta[].general_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *Partners page → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Description...
	 * - **API ID Path**: partners_page.meta[].general_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *Partners page → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.meta[].general_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Slice for *Partners page → Slice zone*
 */
export type PartnersPageDocumentDataMetaGeneralCardSlice = prismic.Slice<"general_card", Simplify<PartnersPageDocumentDataMetaGeneralCardSlicePrimary>, never>

/**
 * Primary content in *Partners page → Slice zone → Twitter Card → Primary*
 */
export interface PartnersPageDocumentDataMetaTwitterCardSlicePrimary {
	/**
	 * Title field in *Partners page → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Title...
	 * - **API ID Path**: partners_page.meta[].twitter_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *Partners page → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Description...
	 * - **API ID Path**: partners_page.meta[].twitter_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *Partners page → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.meta[].twitter_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<"large_image">;
}

/**
 * Slice for *Partners page → Slice zone*
 */
export type PartnersPageDocumentDataMetaTwitterCardSlice = prismic.Slice<"twitter_card", Simplify<PartnersPageDocumentDataMetaTwitterCardSlicePrimary>, never>

type PartnersPageDocumentDataMetaSlice = PartnersPageDocumentDataMetaGeneralCardSlice | PartnersPageDocumentDataMetaTwitterCardSlice

/**
 * Content for Partners page documents
 */
interface PartnersPageDocumentData {
	/**
	 * Page title field in *Partners page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.page_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	page_title: prismic.RichTextField;
	
	/**
	 * Page description (optionnel) field in *Partners page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.page_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	page_description: prismic.RichTextField;
	
	/**
	 * Organizations section title field in *Partners page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.organizations_section_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	organizations_section_title: prismic.RichTextField;
	
	/**
	 * Organizations section description (optionnel) field in *Partners page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.organizations_section_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	organizations_section_description: prismic.RichTextField;
	
	/**
	 * Organizations field in *Partners page*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.organizations[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	organizations: prismic.GroupField<Simplify<PartnersPageDocumentDataOrganizationsItem>>;
	
	/**
	 * Schools section title field in *Partners page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.schools_section_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	schools_section_title: prismic.RichTextField;
	
	/**
	 * Schools section description (optionnel) field in *Partners page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.schools_section_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	schools_section_description: prismic.RichTextField;
	
	/**
	 * Schools field in *Partners page*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.schools[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	schools: prismic.GroupField<Simplify<PartnersPageDocumentDataSchoolsItem>>;/**
	 * Slice zone field in *Partners page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: partners_page.meta[]
	 * - **Tab**: Social Cards
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	meta: prismic.SliceZone<PartnersPageDocumentDataMetaSlice>;
}

/**
 * Partners page document from Prismic
 *
 * - **API ID**: `partners_page`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PartnersPageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<PartnersPageDocumentData>, "partners_page", Lang>;

/**
 * Primary content in *Support : Personas list → Slice zone → Persona → Primary*
 */
export interface PersonasListDocumentDataBodyPersonaSlicePrimary {
	/**
	 * Name field in *Support : Personas list → Slice zone → Persona → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: personas_list.body[].persona.primary.name
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	name: prismic.RichTextField;
	
	/**
	 * seo description field in *Support : Personas list → Slice zone → Persona → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: personas_list.body[].persona.primary.seo_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	seo_description: prismic.RichTextField;
	
	/**
	 * Unique identifier field in *Support : Personas list → Slice zone → Persona → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: personas_list.body[].persona.primary.slug
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	slug: prismic.KeyTextField;
	
	/**
	 * Description field in *Support : Personas list → Slice zone → Persona → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: personas_list.body[].persona.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Icon field in *Support : Personas list → Slice zone → Persona → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: personas_list.body[].persona.primary.icon
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	icon: prismic.ImageField<never>;
	
	/**
	 * Sub persona title field in *Support : Personas list → Slice zone → Persona → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: personas_list.body[].persona.primary.sub_persona_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	sub_persona_title: prismic.RichTextField;
}

/**
 * Item content in *Support : Personas list → Slice zone → Persona → Items*
 */
export interface PersonasListDocumentDataBodyPersonaSliceItem {
	/**
	 * Sub Persona field in *Support : Personas list → Slice zone → Persona → Items*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: personas_list.body[].persona.items.sub_persona
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	sub_persona: prismic.ContentRelationshipField<"support__persona_faq">;
}

/**
 * Slice for *Support : Personas list → Slice zone*
 */
export type PersonasListDocumentDataBodyPersonaSlice = prismic.Slice<"persona", Simplify<PersonasListDocumentDataBodyPersonaSlicePrimary>, Simplify<PersonasListDocumentDataBodyPersonaSliceItem>>

type PersonasListDocumentDataBodySlice = PersonasListDocumentDataBodyPersonaSlice

/**
 * Content for Support : Personas list documents
 */
interface PersonasListDocumentData {
	/**
	 * Header title field in *Support : Personas list*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: personas_list.header_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	header_title: prismic.RichTextField;
	
	/**
	 * Header sub-title field in *Support : Personas list*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: personas_list.header_sub-title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	"header_sub-title": prismic.RichTextField;
	
	/**
	 * Slice zone field in *Support : Personas list*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: personas_list.body[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	body: prismic.SliceZone<PersonasListDocumentDataBodySlice>;
}

/**
 * Support : Personas list document from Prismic
 *
 * - **API ID**: `personas_list`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PersonasListDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<PersonasListDocumentData>, "personas_list", Lang>;

/**
 * Content for privacy policy page documents
 */
interface PrivacyPolicyPageDocumentData {
	/**
	 * Title field in *privacy policy page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_policy_page.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Header field in *privacy policy page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_policy_page.header
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	header: prismic.RichTextField;
	
	/**
	 * Body field in *privacy policy page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_policy_page.body
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
}

/**
 * privacy policy page document from Prismic
 *
 * - **API ID**: `privacy_policy_page`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PrivacyPolicyPageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<PrivacyPolicyPageDocumentData>, "privacy_policy_page", Lang>;

/**
 * Primary content in *school-education → Slice zone → hero-section → Primary*
 */
export interface SchoolEducationDocumentDataBodyHeroSectionSlicePrimary {
	/**
	 * title field in *school-education → Slice zone → hero-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].hero-section.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * button text field in *school-education → Slice zone → hero-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].hero-section.primary.button_text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	button_text: prismic.RichTextField;
	
	/**
	 * button link field in *school-education → Slice zone → hero-section → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].hero-section.primary.button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item content in *school-education → Slice zone → hero-section → Items*
 */
export interface SchoolEducationDocumentDataBodyHeroSectionSliceItem {
	/**
	 * column number field in *school-education → Slice zone → hero-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].hero-section.items.column_number
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	column_number: prismic.RichTextField;
	
	/**
	 * column title field in *school-education → Slice zone → hero-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].hero-section.items.column_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	column_title: prismic.RichTextField;
	
	/**
	 * column description field in *school-education → Slice zone → hero-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].hero-section.items.column_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	column_description: prismic.RichTextField;
}

/**
 * Slice for *school-education → Slice zone*
 */
export type SchoolEducationDocumentDataBodyHeroSectionSlice = prismic.Slice<"hero-section", Simplify<SchoolEducationDocumentDataBodyHeroSectionSlicePrimary>, Simplify<SchoolEducationDocumentDataBodyHeroSectionSliceItem>>

/**
 * Primary content in *school-education → Slice zone → card-section → Primary*
 */
export interface SchoolEducationDocumentDataBodyCardSectionSlicePrimary {
	/**
	 * title field in *school-education → Slice zone → card-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].card-section.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
}

/**
 * Item content in *school-education → Slice zone → card-section → Items*
 */
export interface SchoolEducationDocumentDataBodyCardSectionSliceItem {
	/**
	 * card title field in *school-education → Slice zone → card-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].card-section.items.card_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	card_title: prismic.RichTextField;
	
	/**
	 * card description field in *school-education → Slice zone → card-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].card-section.items.card_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	card_description: prismic.RichTextField;
}

/**
 * Slice for *school-education → Slice zone*
 */
export type SchoolEducationDocumentDataBodyCardSectionSlice = prismic.Slice<"card-section", Simplify<SchoolEducationDocumentDataBodyCardSectionSlicePrimary>, Simplify<SchoolEducationDocumentDataBodyCardSectionSliceItem>>

/**
 * Primary content in *school-education → Slice zone → section → Primary*
 */
export interface SchoolEducationDocumentDataBodySectionSlicePrimary {
	/**
	 * logo field in *school-education → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].section.primary.logo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
	
	/**
	 * title field in *school-education → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].section.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * description field in *school-education → Slice zone → section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].section.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
}

/**
 * Item content in *school-education → Slice zone → section → Items*
 */
export interface SchoolEducationDocumentDataBodySectionSliceItem {
	/**
	 * paragraph field in *school-education → Slice zone → section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].section.items.paragraph
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	paragraph: prismic.RichTextField;
}

/**
 * Slice for *school-education → Slice zone*
 */
export type SchoolEducationDocumentDataBodySectionSlice = prismic.Slice<"section", Simplify<SchoolEducationDocumentDataBodySectionSlicePrimary>, Simplify<SchoolEducationDocumentDataBodySectionSliceItem>>

/**
 * Primary content in *school-education → Slice zone → hero-banner → Primary*
 */
export interface SchoolEducationDocumentDataBodyHeroBanner1SlicePrimary {
	/**
	 * Title field in *school-education → Slice zone → hero-banner → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].hero-banner1.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * button_title field in *school-education → Slice zone → hero-banner → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].hero-banner1.primary.button_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	button_title: prismic.RichTextField;
	
	/**
	 * button_link field in *school-education → Slice zone → hero-banner → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].hero-banner1.primary.button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *school-education → Slice zone*
 */
export type SchoolEducationDocumentDataBodyHeroBanner1Slice = prismic.Slice<"hero-banner1", Simplify<SchoolEducationDocumentDataBodyHeroBanner1SlicePrimary>, never>

/**
 * Primary content in *school-education → Slice zone → left-section → Primary*
 */
export interface SchoolEducationDocumentDataBodyLeftSection1SlicePrimary {
	/**
	 * title field in *school-education → Slice zone → left-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].left-section1.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * description field in *school-education → Slice zone → left-section → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].left-section1.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * image field in *school-education → Slice zone → left-section → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].left-section1.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Item content in *school-education → Slice zone → left-section → Items*
 */
export interface SchoolEducationDocumentDataBodyLeftSection1SliceItem {
	/**
	 * paragraph field in *school-education → Slice zone → left-section → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].left-section1.items.paragraph
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	paragraph: prismic.RichTextField;
}

/**
 * Slice for *school-education → Slice zone*
 */
export type SchoolEducationDocumentDataBodyLeftSection1Slice = prismic.Slice<"left-section1", Simplify<SchoolEducationDocumentDataBodyLeftSection1SlicePrimary>, Simplify<SchoolEducationDocumentDataBodyLeftSection1SliceItem>>

/**
 * Primary content in *school-education → Slice zone → Banner → Primary*
 */
export interface SchoolEducationDocumentDataBodyBanner1SlicePrimary {
	/**
	 * banner_title field in *school-education → Slice zone → Banner → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].banner1.primary.banner_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	banner_title: prismic.RichTextField;
	
	/**
	 * banner_content field in *school-education → Slice zone → Banner → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].banner1.primary.banner_content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	banner_content: prismic.RichTextField;
	
	/**
	 * banner_font_contrast field in *school-education → Slice zone → Banner → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: light
	 * - **API ID Path**: school-education.body[].banner1.primary.banner_font_contrast
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	banner_font_contrast: prismic.SelectField<"light" | "dark", "filled">;
	
	/**
	 * banner_background_color field in *school-education → Slice zone → Banner → Primary*
	 *
	 * - **Field Type**: Color
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].banner1.primary.banner_background_color
	 * - **Documentation**: https://prismic.io/docs/fields/color
	 */
	banner_background_color: prismic.ColorField;
	
	/**
	 * banner_background field in *school-education → Slice zone → Banner → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].banner1.primary.banner_background
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	banner_background: prismic.ImageField<never>;
	
	/**
	 * banner_image field in *school-education → Slice zone → Banner → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].banner1.primary.banner_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	banner_image: prismic.ImageField<never>;
}

/**
 * Item content in *school-education → Slice zone → Banner → Items*
 */
export interface SchoolEducationDocumentDataBodyBanner1SliceItem {
	/**
	 * banner_link_text field in *school-education → Slice zone → Banner → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].banner1.items.banner_link_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	banner_link_text: prismic.KeyTextField;
	
	/**
	 * banner_link_url field in *school-education → Slice zone → Banner → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[].banner1.items.banner_link_url
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	banner_link_url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *school-education → Slice zone*
 */
export type SchoolEducationDocumentDataBodyBanner1Slice = prismic.Slice<"banner1", Simplify<SchoolEducationDocumentDataBodyBanner1SlicePrimary>, Simplify<SchoolEducationDocumentDataBodyBanner1SliceItem>>

type SchoolEducationDocumentDataBodySlice = SchoolEducationDocumentDataBodyHeroSectionSlice | SchoolEducationDocumentDataBodyCardSectionSlice | SchoolEducationDocumentDataBodySectionSlice | SchoolEducationDocumentDataBodyHeroBanner1Slice | SchoolEducationDocumentDataBodyLeftSection1Slice | SchoolEducationDocumentDataBodyBanner1Slice

/**
 * Primary content in *school-education → Slice zone → General Card → Primary*
 */
export interface SchoolEducationDocumentDataMetaGeneralCardSlicePrimary {
	/**
	 * Title field in *school-education → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Title...
	 * - **API ID Path**: school-education.meta[].general_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *school-education → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Description...
	 * - **API ID Path**: school-education.meta[].general_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *school-education → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.meta[].general_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Slice for *school-education → Slice zone*
 */
export type SchoolEducationDocumentDataMetaGeneralCardSlice = prismic.Slice<"general_card", Simplify<SchoolEducationDocumentDataMetaGeneralCardSlicePrimary>, never>

/**
 * Primary content in *school-education → Slice zone → Twitter Card → Primary*
 */
export interface SchoolEducationDocumentDataMetaTwitterCardSlicePrimary {
	/**
	 * Title field in *school-education → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Title...
	 * - **API ID Path**: school-education.meta[].twitter_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *school-education → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Description...
	 * - **API ID Path**: school-education.meta[].twitter_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *school-education → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.meta[].twitter_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<"large_image">;
}

/**
 * Slice for *school-education → Slice zone*
 */
export type SchoolEducationDocumentDataMetaTwitterCardSlice = prismic.Slice<"twitter_card", Simplify<SchoolEducationDocumentDataMetaTwitterCardSlicePrimary>, never>

type SchoolEducationDocumentDataMetaSlice = SchoolEducationDocumentDataMetaGeneralCardSlice | SchoolEducationDocumentDataMetaTwitterCardSlice

/**
 * Content for school-education documents
 */
interface SchoolEducationDocumentData {
	/**
	 * title field in *school-education*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Slice zone field in *school-education*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.body[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	body: prismic.SliceZone<SchoolEducationDocumentDataBodySlice>;/**
	 * Slice zone field in *school-education*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: school-education.meta[]
	 * - **Tab**: Social Cards
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	meta: prismic.SliceZone<SchoolEducationDocumentDataMetaSlice>;
}

/**
 * school-education document from Prismic
 *
 * - **API ID**: `school-education`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SchoolEducationDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<SchoolEducationDocumentData>, "school-education", Lang>;

type SimplePageDocumentDataSlicesSlice = never

/**
 * Content for Simple page documents
 */
interface SimplePageDocumentData {
	/**
	 * Title field in *Simple page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: simple_page.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * seo description field in *Simple page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: simple_page.seo_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	seo_description: prismic.RichTextField;
	
	/**
	 * seo image field in *Simple page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: simple_page.seo_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	seo_image: prismic.ImageField<never>;
	
	/**
	 * Body field in *Simple page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: simple_page.body
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Slice zone field in *Simple page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: simple_page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<SimplePageDocumentDataSlicesSlice>;
}

/**
 * Simple page document from Prismic
 *
 * - **API ID**: `simple_page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SimplePageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<SimplePageDocumentData>, "simple_page", Lang>;

/**
 * Primary content in *Slices page → Slice zone → Banner → Primary*
 */
export interface SlicesPageDocumentDataBodyBannerSlicePrimary {
	/**
	 * banner_title field in *Slices page → Slice zone → Banner → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].banner.primary.banner_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	banner_title: prismic.RichTextField;
	
	/**
	 * banner_content field in *Slices page → Slice zone → Banner → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].banner.primary.banner_content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	banner_content: prismic.RichTextField;
	
	/**
	 * banner_font_contrast field in *Slices page → Slice zone → Banner → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: light
	 * - **API ID Path**: slices_page.body[].banner.primary.banner_font_contrast
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	banner_font_contrast: prismic.SelectField<"light" | "dark", "filled">;
	
	/**
	 * banner_background_color field in *Slices page → Slice zone → Banner → Primary*
	 *
	 * - **Field Type**: Color
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].banner.primary.banner_background_color
	 * - **Documentation**: https://prismic.io/docs/fields/color
	 */
	banner_background_color: prismic.ColorField;
	
	/**
	 * banner_background field in *Slices page → Slice zone → Banner → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].banner.primary.banner_background
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	banner_background: prismic.ImageField<never>;
	
	/**
	 * banner_image field in *Slices page → Slice zone → Banner → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].banner.primary.banner_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	banner_image: prismic.ImageField<never>;
}

/**
 * Item content in *Slices page → Slice zone → Banner → Items*
 */
export interface SlicesPageDocumentDataBodyBannerSliceItem {
	/**
	 * banner_link_text field in *Slices page → Slice zone → Banner → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].banner.items.banner_link_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	banner_link_text: prismic.KeyTextField;
	
	/**
	 * banner_link_url field in *Slices page → Slice zone → Banner → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].banner.items.banner_link_url
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	banner_link_url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *Slices page → Slice zone*
 */
export type SlicesPageDocumentDataBodyBannerSlice = prismic.Slice<"banner", Simplify<SlicesPageDocumentDataBodyBannerSlicePrimary>, Simplify<SlicesPageDocumentDataBodyBannerSliceItem>>

/**
 * Primary content in *Slices page → Slice zone → Article → Primary*
 */
export interface SlicesPageDocumentDataBodyArticleSlicePrimary {
	/**
	 * article_layout field in *Slices page → Slice zone → Article → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: Choose whether you want only text, text on left and image on right or text on right and image on left
	 * - **API ID Path**: slices_page.body[].article.primary.article_layout
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	article_layout: prismic.SelectField<"only-text" | "text-image" | "image-text" | "vertical-text-image">;
	
	/**
	 * article_title field in *Slices page → Slice zone → Article → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].article.primary.article_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	article_title: prismic.RichTextField;
	
	/**
	 * article_description field in *Slices page → Slice zone → Article → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].article.primary.article_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	article_description: prismic.RichTextField;
	
	/**
	 * article_background_color field in *Slices page → Slice zone → Article → Primary*
	 *
	 * - **Field Type**: Color
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].article.primary.article_background_color
	 * - **Documentation**: https://prismic.io/docs/fields/color
	 */
	article_background_color: prismic.ColorField;
	
	/**
	 * article_background field in *Slices page → Slice zone → Article → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].article.primary.article_background
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	article_background: prismic.ImageField<never>;
	
	/**
	 * article_image field in *Slices page → Slice zone → Article → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].article.primary.article_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	article_image: prismic.ImageField<never>;
	
	/**
	 * article_video field in *Slices page → Slice zone → Article → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].article.primary.article_video
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	article_video: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * article_video_poster field in *Slices page → Slice zone → Article → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].article.primary.article_video_poster
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	article_video_poster: prismic.ImageField<never>;
	
	/**
	 * article_link_type field in *Slices page → Slice zone → Article → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: Define the type of display you want for your link
	 * - **Default Value**: none
	 * - **API ID Path**: slices_page.body[].article.primary.article_link_type
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	article_link_type: prismic.SelectField<"none" | "call-to-action" | "link-to", "filled">;
	
	/**
	 * article_link_name field in *Slices page → Slice zone → Article → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].article.primary.article_link_name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	article_link_name: prismic.KeyTextField;
	
	/**
	 * article_link_url field in *Slices page → Slice zone → Article → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].article.primary.article_link_url
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	article_link_url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *Slices page → Slice zone*
 */
export type SlicesPageDocumentDataBodyArticleSlice = prismic.Slice<"article", Simplify<SlicesPageDocumentDataBodyArticleSlicePrimary>, never>

/**
 * Primary content in *Slices page → Slice zone → partners_logos → Primary*
 */
export interface SlicesPageDocumentDataBodyPartnersLogosSlicePrimary {
	/**
	 * logos_should_display_title field in *Slices page → Slice zone → partners_logos → Primary*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: true
	 * - **API ID Path**: slices_page.body[].partners_logos.primary.logos_should_display_title
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	logos_should_display_title: prismic.BooleanField;
	
	/**
	 * logos_title field in *Slices page → Slice zone → partners_logos → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].partners_logos.primary.logos_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	logos_title: prismic.RichTextField;
}

/**
 * Item content in *Slices page → Slice zone → partners_logos → Items*
 */
export interface SlicesPageDocumentDataBodyPartnersLogosSliceItem {
	/**
	 * logos_image field in *Slices page → Slice zone → partners_logos → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].partners_logos.items.logos_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logos_image: prismic.ImageField<never>;
}

/**
 * Slice for *Slices page → Slice zone*
 */
export type SlicesPageDocumentDataBodyPartnersLogosSlice = prismic.Slice<"partners_logos", Simplify<SlicesPageDocumentDataBodyPartnersLogosSlicePrimary>, Simplify<SlicesPageDocumentDataBodyPartnersLogosSliceItem>>

/**
 * Primary content in *Slices page → Slice zone → latest_news → Primary*
 */
export interface SlicesPageDocumentDataBodyLatestNewsSlicePrimary {
	/**
	 * latest_news_should_display_title field in *Slices page → Slice zone → latest_news → Primary*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: true
	 * - **API ID Path**: slices_page.body[].latest_news.primary.latest_news_should_display_title
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	latest_news_should_display_title: prismic.BooleanField;
	
	/**
	 * latest_news_title field in *Slices page → Slice zone → latest_news → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].latest_news.primary.latest_news_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	latest_news_title: prismic.RichTextField;
	
	/**
	 * latest_news_redirection_link_text field in *Slices page → Slice zone → latest_news → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].latest_news.primary.latest_news_redirection_link_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	latest_news_redirection_link_text: prismic.KeyTextField;
	
	/**
	 * latest_news_redirection_link_url field in *Slices page → Slice zone → latest_news → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].latest_news.primary.latest_news_redirection_link_url
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	latest_news_redirection_link_url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *Slices page → Slice zone*
 */
export type SlicesPageDocumentDataBodyLatestNewsSlice = prismic.Slice<"latest_news", Simplify<SlicesPageDocumentDataBodyLatestNewsSlicePrimary>, never>

/**
 * Primary content in *Slices page → Slice zone → multiple_block → Primary*
 */
export interface SlicesPageDocumentDataBodyMultipleBlockSlicePrimary {
	/**
	 * Style du bloc field in *Slices page → Slice zone → multiple_block → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: Style to apply
	 * - **Default Value**: process
	 * - **API ID Path**: slices_page.body[].multiple_block.primary.block_style
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	block_style: prismic.SelectField<"process" | "features" | "statistics", "filled">;
	
	/**
	 * Titre du bloc field in *Slices page → Slice zone → multiple_block → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].multiple_block.primary.block_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	block_title: prismic.RichTextField;
	
	/**
	 * Afficher le titre ? field in *Slices page → Slice zone → multiple_block → Primary*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: true
	 * - **API ID Path**: slices_page.body[].multiple_block.primary.block_should_display_title
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	block_should_display_title: prismic.BooleanField;
	
	/**
	 * Sous-titre field in *Slices page → Slice zone → multiple_block → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].multiple_block.primary.block_subtitle
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	block_subtitle: prismic.RichTextField;
	
	/**
	 * Afficher le sous-titre ? field in *Slices page → Slice zone → multiple_block → Primary*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: slices_page.body[].multiple_block.primary.block_should_use_subtitle
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	block_should_use_subtitle: prismic.BooleanField;
	
	/**
	 * Couleur de background field in *Slices page → Slice zone → multiple_block → Primary*
	 *
	 * - **Field Type**: Color
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].multiple_block.primary.block_background_color
	 * - **Documentation**: https://prismic.io/docs/fields/color
	 */
	block_background_color: prismic.ColorField;
}

/**
 * Item content in *Slices page → Slice zone → multiple_block → Items*
 */
export interface SlicesPageDocumentDataBodyMultipleBlockSliceItem {
	/**
	 * item_image field in *Slices page → Slice zone → multiple_block → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].multiple_block.items.item_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	item_image: prismic.ImageField<never>;
	
	/**
	 * Titre du sous-bloc field in *Slices page → Slice zone → multiple_block → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].multiple_block.items.item_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	item_title: prismic.RichTextField;
	
	/**
	 * Description du sous-bloc field in *Slices page → Slice zone → multiple_block → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].multiple_block.items.item_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	item_description: prismic.RichTextField;
	
	/**
	 * Lien 1 : label field in *Slices page → Slice zone → multiple_block → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].multiple_block.items.item_link_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	item_link_label: prismic.KeyTextField;
	
	/**
	 * Lien 1 : URL field in *Slices page → Slice zone → multiple_block → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].multiple_block.items.item_link_url
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	item_link_url: prismic.KeyTextField;
	
	/**
	 * Lien 1 : style field in *Slices page → Slice zone → multiple_block → Items*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: slices_page.body[].multiple_block.items.item_link_style
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	item_link_style: prismic.BooleanField;
	
	/**
	 * Lien 2 : label field in *Slices page → Slice zone → multiple_block → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].multiple_block.items.item_link2_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	item_link2_label: prismic.KeyTextField;
	
	/**
	 * Lien 2 : URL field in *Slices page → Slice zone → multiple_block → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].multiple_block.items.item_link2_url
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	item_link2_url: prismic.KeyTextField;
	
	/**
	 * Lien 2 : style field in *Slices page → Slice zone → multiple_block → Items*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: slices_page.body[].multiple_block.items.item_link2_style
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	item_link2_style: prismic.BooleanField;
	
	/**
	 * Plausible field in *Slices page → Slice zone → multiple_block → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: classes personnalisées pour le tracking
	 * - **API ID Path**: slices_page.body[].multiple_block.items.item_plausible_class
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	item_plausible_class: prismic.KeyTextField;
}

/**
 * Slice for *Slices page → Slice zone*
 */
export type SlicesPageDocumentDataBodyMultipleBlockSlice = prismic.Slice<"multiple_block", Simplify<SlicesPageDocumentDataBodyMultipleBlockSlicePrimary>, Simplify<SlicesPageDocumentDataBodyMultipleBlockSliceItem>>

/**
 * Primary content in *Slices page → Slice zone → stat → Primary*
 */
export interface SlicesPageDocumentDataBodyStatSlicePrimary {
	/**
	 * block_title field in *Slices page → Slice zone → stat → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].stat.primary.block_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	block_title: prismic.RichTextField;
	
	/**
	 * block_presentation field in *Slices page → Slice zone → stat → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].stat.primary.block_presentation
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	block_presentation: prismic.RichTextField;
	
	/**
	 * block_data_name field in *Slices page → Slice zone → stat → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].stat.primary.block_data_name
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	block_data_name: prismic.RichTextField;
	
	/**
	 * block_graph_color field in *Slices page → Slice zone → stat → Primary*
	 *
	 * - **Field Type**: Color
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].stat.primary.block_graph_color
	 * - **Documentation**: https://prismic.io/docs/fields/color
	 */
	block_graph_color: prismic.ColorField;
	
	/**
	 * metabase_card_id field in *Slices page → Slice zone → stat → Primary*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].stat.primary.metabase_card_id
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	metabase_card_id: prismic.NumberField;
	
	/**
	 * metabase_x_axis_label field in *Slices page → Slice zone → stat → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].stat.primary.metabase_x_axis_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	metabase_x_axis_label: prismic.KeyTextField;
	
	/**
	 * metabase_y_axis_label field in *Slices page → Slice zone → stat → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].stat.primary.metabase_y_axis_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	metabase_y_axis_label: prismic.KeyTextField;
}

/**
 * Slice for *Slices page → Slice zone*
 */
export type SlicesPageDocumentDataBodyStatSlice = prismic.Slice<"stat", Simplify<SlicesPageDocumentDataBodyStatSlicePrimary>, never>

/**
 * Primary content in *Slices page → Slice zone → pop-in → Primary*
 */
export interface SlicesPageDocumentDataBodyPopInSlicePrimary {
	/**
	 * description field in *Slices page → Slice zone → pop-in → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].pop-in.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * short_description field in *Slices page → Slice zone → pop-in → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].pop-in.primary.short_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	short_description: prismic.RichTextField;
	
	/**
	 * button_title field in *Slices page → Slice zone → pop-in → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].pop-in.primary.button_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	button_title: prismic.RichTextField;
	
	/**
	 * button_link field in *Slices page → Slice zone → pop-in → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].pop-in.primary.button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *Slices page → Slice zone*
 */
export type SlicesPageDocumentDataBodyPopInSlice = prismic.Slice<"pop-in", Simplify<SlicesPageDocumentDataBodyPopInSlicePrimary>, never>

/**
 * Primary content in *Slices page → Slice zone → embed → Primary*
 */
export interface SlicesPageDocumentDataBodyEmbedSlicePrimary {
	/**
	 * Iframe Link field in *Slices page → Slice zone → embed → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].embed.primary.iframe_link
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	iframe_link: prismic.KeyTextField;
}

/**
 * Slice for *Slices page → Slice zone*
 */
export type SlicesPageDocumentDataBodyEmbedSlice = prismic.Slice<"embed", Simplify<SlicesPageDocumentDataBodyEmbedSlicePrimary>, never>

/**
 * Item content in *Slices page → Slice zone → Testimonials → Items*
 */
export interface SlicesPageDocumentDataBodyTestimonialsSliceItem {
	/**
	 * First and last names field in *Slices page → Slice zone → Testimonials → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].testimonials.items.name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Photo field in *Slices page → Slice zone → Testimonials → Items*
	 *
	 * - **Field Type**: Link to Media
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].testimonials.items.photo
	 * - **Documentation**: https://prismic.io/docs/fields/link-to-media
	 */
	photo: prismic.LinkToMediaField<prismic.FieldState, never>;
	
	/**
	 * Job field in *Slices page → Slice zone → Testimonials → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].testimonials.items.job
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	job: prismic.KeyTextField;
	
	/**
	 * Company field in *Slices page → Slice zone → Testimonials → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].testimonials.items.company
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	company: prismic.KeyTextField;
	
	/**
	 * Testimonial field in *Slices page → Slice zone → Testimonials → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].testimonials.items.testimonial
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	testimonial: prismic.RichTextField;
	
	/**
	 * Link field in *Slices page → Slice zone → Testimonials → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].testimonials.items.link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *Slices page → Slice zone*
 */
export type SlicesPageDocumentDataBodyTestimonialsSlice = prismic.Slice<"testimonials", Record<string, never>, Simplify<SlicesPageDocumentDataBodyTestimonialsSliceItem>>

/**
 * Primary content in *Slices page → Slice zone → Tabs → Primary*
 */
export interface SlicesPageDocumentDataBodyTabsSlicePrimary {
	/**
	 * Block title field in *Slices page → Slice zone → Tabs → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Titre du bloc
	 * - **API ID Path**: slices_page.body[].tabs.primary.block_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	block_title: prismic.KeyTextField;
}

/**
 * Item content in *Slices page → Slice zone → Tabs → Items*
 */
export interface SlicesPageDocumentDataBodyTabsSliceItem {
	/**
	 * Tab title field in *Slices page → Slice zone → Tabs → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Titre de l'onglet
	 * - **API ID Path**: slices_page.body[].tabs.items.tab_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	tab_title: prismic.KeyTextField;
	
	/**
	 * Tab textual content field in *Slices page → Slice zone → Tabs → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Contenu textuel
	 * - **API ID Path**: slices_page.body[].tabs.items.tab_textual_content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	tab_textual_content: prismic.RichTextField;
	
	/**
	 * Tab image field in *Slices page → Slice zone → Tabs → Items*
	 *
	 * - **Field Type**: Link to Media
	 * - **Placeholder**: Contenu visuel
	 * - **API ID Path**: slices_page.body[].tabs.items.tab_image
	 * - **Documentation**: https://prismic.io/docs/fields/link-to-media
	 */
	tab_image: prismic.LinkToMediaField<prismic.FieldState, never>;
	
	/**
	 * tab action name field in *Slices page → Slice zone → Tabs → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].tabs.items.tab_action_name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	tab_action_name: prismic.KeyTextField;
	
	/**
	 * tab action url field in *Slices page → Slice zone → Tabs → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[].tabs.items.tab_action_url
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	tab_action_url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Slice for *Slices page → Slice zone*
 */
export type SlicesPageDocumentDataBodyTabsSlice = prismic.Slice<"tabs", Simplify<SlicesPageDocumentDataBodyTabsSlicePrimary>, Simplify<SlicesPageDocumentDataBodyTabsSliceItem>>

type SlicesPageDocumentDataBodySlice = SlicesPageDocumentDataBodyBannerSlice | SlicesPageDocumentDataBodyArticleSlice | SlicesPageDocumentDataBodyPartnersLogosSlice | SlicesPageDocumentDataBodyLatestNewsSlice | SlicesPageDocumentDataBodyMultipleBlockSlice | SlicesPageDocumentDataBodyStatSlice | SlicesPageDocumentDataBodyPopInSlice | SlicesPageDocumentDataBodyEmbedSlice | SlicesPageDocumentDataBodyTestimonialsSlice | SlicesPageDocumentDataBodyTabsSlice

/**
 * Primary content in *Slices page → Slice zone → General Card → Primary*
 */
export interface SlicesPageDocumentDataMetaGeneralCardSlicePrimary {
	/**
	 * Title field in *Slices page → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Title...
	 * - **API ID Path**: slices_page.meta[].general_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *Slices page → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Description...
	 * - **API ID Path**: slices_page.meta[].general_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *Slices page → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.meta[].general_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Slice for *Slices page → Slice zone*
 */
export type SlicesPageDocumentDataMetaGeneralCardSlice = prismic.Slice<"general_card", Simplify<SlicesPageDocumentDataMetaGeneralCardSlicePrimary>, never>

/**
 * Primary content in *Slices page → Slice zone → Twitter Card → Primary*
 */
export interface SlicesPageDocumentDataMetaTwitterCardSlicePrimary {
	/**
	 * Title field in *Slices page → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Title...
	 * - **API ID Path**: slices_page.meta[].twitter_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *Slices page → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Description...
	 * - **API ID Path**: slices_page.meta[].twitter_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *Slices page → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.meta[].twitter_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<"large_image">;
}

/**
 * Slice for *Slices page → Slice zone*
 */
export type SlicesPageDocumentDataMetaTwitterCardSlice = prismic.Slice<"twitter_card", Simplify<SlicesPageDocumentDataMetaTwitterCardSlicePrimary>, never>

type SlicesPageDocumentDataMetaSlice = SlicesPageDocumentDataMetaGeneralCardSlice | SlicesPageDocumentDataMetaTwitterCardSlice

/**
 * Content for Slices page documents
 */
interface SlicesPageDocumentData {
	/**
	 * Title field in *Slices page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * seo description field in *Slices page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.seo_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	seo_description: prismic.RichTextField;
	
	/**
	 * seo image field in *Slices page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.seo_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	seo_image: prismic.ImageField<never>;
	
	/**
	 * Slice zone field in *Slices page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.body[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	body: prismic.SliceZone<SlicesPageDocumentDataBodySlice>;/**
	 * Slice zone field in *Slices page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: slices_page.meta[]
	 * - **Tab**: Social Cards
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	meta: prismic.SliceZone<SlicesPageDocumentDataMetaSlice>;
}

/**
 * Slices page document from Prismic
 *
 * - **API ID**: `slices_page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SlicesPageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<SlicesPageDocumentData>, "slices_page", Lang>;

/**
 * Primary content in *Social Cards → Slice zone → General Card → Primary*
 */
export interface SocialCardsDocumentDataMetaGeneralCardSlicePrimary {
	/**
	 * Title field in *Social Cards → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Title...
	 * - **API ID Path**: social_cards.meta[].general_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *Social Cards → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Description...
	 * - **API ID Path**: social_cards.meta[].general_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *Social Cards → Slice zone → General Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: social_cards.meta[].general_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Slice for *Social Cards → Slice zone*
 */
export type SocialCardsDocumentDataMetaGeneralCardSlice = prismic.Slice<"general_card", Simplify<SocialCardsDocumentDataMetaGeneralCardSlicePrimary>, never>

/**
 * Primary content in *Social Cards → Slice zone → Twitter Card → Primary*
 */
export interface SocialCardsDocumentDataMetaTwitterCardSlicePrimary {
	/**
	 * Title field in *Social Cards → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Title...
	 * - **API ID Path**: social_cards.meta[].twitter_card.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *Social Cards → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Twitter Card Description...
	 * - **API ID Path**: social_cards.meta[].twitter_card.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *Social Cards → Slice zone → Twitter Card → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: social_cards.meta[].twitter_card.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<"large_image">;
}

/**
 * Slice for *Social Cards → Slice zone*
 */
export type SocialCardsDocumentDataMetaTwitterCardSlice = prismic.Slice<"twitter_card", Simplify<SocialCardsDocumentDataMetaTwitterCardSlicePrimary>, never>

type SocialCardsDocumentDataMetaSlice = SocialCardsDocumentDataMetaGeneralCardSlice | SocialCardsDocumentDataMetaTwitterCardSlice

/**
 * Content for Social Cards documents
 */
interface SocialCardsDocumentData {
	/**
	 * meta for field in *Social Cards*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: pix-site
	 * - **API ID Path**: social_cards.meta_for
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	meta_for: prismic.SelectField<"pix-site" | "pix-pro", "filled">;
	
	/**
	 * Slice zone field in *Social Cards*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: social_cards.meta[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	meta: prismic.SliceZone<SocialCardsDocumentDataMetaSlice>;
}

/**
 * Social Cards document from Prismic
 *
 * - **API ID**: `social_cards`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SocialCardsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<SocialCardsDocumentData>, "social_cards", Lang>;

/**
 * Primary content in *Statistiques → Slice zone → Stats → Primary*
 */
export interface StatistiquesDocumentDataStatsStatsSlicePrimary {
	/**
	 * date field in *Statistiques → Slice zone → Stats → Primary*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: mm-yyyy
	 * - **API ID Path**: statistiques.stats[].stats.primary.date
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	date: prismic.DateField;
	
	/**
	 * accounts field in *Statistiques → Slice zone → Stats → Primary*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: 300 000
	 * - **API ID Path**: statistiques.stats[].stats.primary.accounts
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	accounts: prismic.NumberField;
	
	/**
	 * Evaluation Campaigns field in *Statistiques → Slice zone → Stats → Primary*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: 5 000
	 * - **API ID Path**: statistiques.stats[].stats.primary.campaigns
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	campaigns: prismic.NumberField;
	
	/**
	 * Certifications field in *Statistiques → Slice zone → Stats → Primary*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: 50 000
	 * - **API ID Path**: statistiques.stats[].stats.primary.certifications
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	certifications: prismic.NumberField;
	
	/**
	 * Organizations partners field in *Statistiques → Slice zone → Stats → Primary*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: 1 800
	 * - **API ID Path**: statistiques.stats[].stats.primary.organizations
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	organizations: prismic.NumberField;
}

/**
 * Slice for *Statistiques → Slice zone*
 */
export type StatistiquesDocumentDataStatsStatsSlice = prismic.Slice<"stats", Simplify<StatistiquesDocumentDataStatsStatsSlicePrimary>, never>

type StatistiquesDocumentDataStatsSlice = StatistiquesDocumentDataStatsStatsSlice

/**
 * Content for Statistiques documents
 */
interface StatistiquesDocumentData {
	/**
	 * title field in *Statistiques*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Titre
	 * - **API ID Path**: statistiques.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * accounts field in *Statistiques*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Comptes utilisateurs
	 * - **API ID Path**: statistiques.accounts
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	accounts: prismic.RichTextField;
	
	/**
	 * campaigns field in *Statistiques*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Evaluation des compétences numériques
	 * - **API ID Path**: statistiques.campaigns
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	campaigns: prismic.RichTextField;
	
	/**
	 * certifications field in *Statistiques*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Certifications Pix
	 * - **API ID Path**: statistiques.certifications
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	certifications: prismic.RichTextField;
	
	/**
	 * organizations field in *Statistiques*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Déploiement
	 * - **API ID Path**: statistiques.organizations
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	organizations: prismic.RichTextField;
	
	/**
	 * Slice zone field in *Statistiques*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: statistiques.stats[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	stats: prismic.SliceZone<StatistiquesDocumentDataStatsSlice>;
}

/**
 * Statistiques document from Prismic
 *
 * - **API ID**: `statistiques`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type StatistiquesDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<StatistiquesDocumentData>, "statistiques", Lang>;

/**
 * Content for Support : FAQ Article documents
 */
interface SupportFaqPostDocumentData {
	/**
	 * Contact form link field in *Support : FAQ Article*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__faq_post.contact_form_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	contact_form_link: prismic.ContentRelationshipField<"easiware_form">;
	
	/**
	 * title field in *Support : FAQ Article*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__faq_post.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * seo description field in *Support : FAQ Article*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__faq_post.seo_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	seo_description: prismic.RichTextField;
	
	/**
	 * seo image field in *Support : FAQ Article*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__faq_post.seo_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	seo_image: prismic.ImageField<never>;
	
	/**
	 * content field in *Support : FAQ Article*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__faq_post.content
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	content: prismic.RichTextField;
}

/**
 * Support : FAQ Article document from Prismic
 *
 * - **API ID**: `support__faq_post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SupportFaqPostDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<SupportFaqPostDocumentData>, "support__faq_post", Lang>;

/**
 * Item in *Support : FAQ Sub Persona  → Articles*
 */
export interface SupportPersonaFaqDocumentDataPopularPostsItem {
	/**
	 * Article field in *Support : FAQ Sub Persona  → Articles*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__persona_faq.popular_posts[].post
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	post: prismic.ContentRelationshipField<"support__faq_post">;
}

/**
 * Primary content in *Support : FAQ Sub Persona  → Slice zone → Category → Primary*
 */
export interface SupportPersonaFaqDocumentDataBodyCategorySlicePrimary {
	/**
	 * Category name field in *Support : FAQ Sub Persona  → Slice zone → Category → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__persona_faq.body[].category.primary.category_name
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	category_name: prismic.RichTextField;
	
	/**
	 * Category description field in *Support : FAQ Sub Persona  → Slice zone → Category → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__persona_faq.body[].category.primary.category_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	category_description: prismic.RichTextField;
}

/**
 * Item content in *Support : FAQ Sub Persona  → Slice zone → Category → Items*
 */
export interface SupportPersonaFaqDocumentDataBodyCategorySliceItem {
	/**
	 * Sub category field in *Support : FAQ Sub Persona  → Slice zone → Category → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__persona_faq.body[].category.items.sub_category
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	sub_category: prismic.KeyTextField;
	
	/**
	 * Post field in *Support : FAQ Sub Persona  → Slice zone → Category → Items*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__persona_faq.body[].category.items.post
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	post: prismic.ContentRelationshipField<"support__faq_post">;
}

/**
 * Slice for *Support : FAQ Sub Persona  → Slice zone*
 */
export type SupportPersonaFaqDocumentDataBodyCategorySlice = prismic.Slice<"category", Simplify<SupportPersonaFaqDocumentDataBodyCategorySlicePrimary>, Simplify<SupportPersonaFaqDocumentDataBodyCategorySliceItem>>

type SupportPersonaFaqDocumentDataBodySlice = SupportPersonaFaqDocumentDataBodyCategorySlice

/**
 * Content for Support : FAQ Sub Persona  documents
 */
interface SupportPersonaFaqDocumentData {
	/**
	 * Persona name field in *Support : FAQ Sub Persona *
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__persona_faq.persona_name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	persona_name: prismic.RichTextField;
	
	/**
	 * seo description field in *Support : FAQ Sub Persona *
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__persona_faq.seo_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	seo_description: prismic.RichTextField;
	
	/**
	 * FAQ page title field in *Support : FAQ Sub Persona *
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__persona_faq.faq_page_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	faq_page_title: prismic.RichTextField;
	
	/**
	 * Icon field in *Support : FAQ Sub Persona *
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__persona_faq.icon
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	icon: prismic.ImageField<never>;
	
	/**
	 * Contact form link field in *Support : FAQ Sub Persona *
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__persona_faq.contact_form_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	contact_form_link: prismic.ContentRelationshipField<"easiware_form">;/**
	 * Popular article title field in *Support : FAQ Sub Persona *
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__persona_faq.popular_posts_title
	 * - **Tab**: Popular posts
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	popular_posts_title: prismic.RichTextField;
	
	/**
	 * Articles field in *Support : FAQ Sub Persona *
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__persona_faq.popular_posts[]
	 * - **Tab**: Popular posts
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	popular_posts: prismic.GroupField<Simplify<SupportPersonaFaqDocumentDataPopularPostsItem>>;/**
	 * Slice zone field in *Support : FAQ Sub Persona *
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support__persona_faq.body[]
	 * - **Tab**: Posts list
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	body: prismic.SliceZone<SupportPersonaFaqDocumentDataBodySlice>;
}

/**
 * Support : FAQ Sub Persona  document from Prismic
 *
 * - **API ID**: `support__persona_faq`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SupportPersonaFaqDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<SupportPersonaFaqDocumentData>, "support__persona_faq", Lang>;

/**
 * Content for Support persona documents
 */
interface SupportPersonaDocumentData {
	/**
	 * Name field in *Support persona*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support_persona.name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	name: prismic.RichTextField;
	
	/**
	 * Description field in *Support persona*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support_persona.description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Icon field in *Support persona*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: support_persona.icon
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	icon: prismic.ImageField<never>;
	
	/**
	 * Parent persona field in *Support persona*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: Leave empty if current persona is a parent
	 * - **API ID Path**: support_persona.parent_persona
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	parent_persona: prismic.ContentRelationshipField<"support_persona">;
	
	/**
	 * FAQ link field in *Support persona*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: Fill the field if you want to redirect to a FAQ
	 * - **API ID Path**: support_persona.faq_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	faq_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Support persona document from Prismic
 *
 * - **API ID**: `support_persona`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SupportPersonaDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<SupportPersonaDocumentData>, "support_persona", Lang>;

interface TestDocumentData {}

/**
 * test document from Prismic
 *
 * - **API ID**: `test`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type TestDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<TestDocumentData>, "test", Lang>;

export type AllDocumentTypes = AboutDocument | BlogPostDocument | CguPageDocument | CompetencesDocument | DistributorItemDocument | EasiwareFormDocument | EasiwareFormPageDocument | EmployersDocument | FaqCategoryDocument | FaqItemDocument | FaqMenuDocument | FormPageDocument | HigherEducationDocument | HotNewsDocument | IndexDocument | JobOfferDocument | KeyNumbersDocument | LegalNoticesDocument | LoremIpsumDolorDocument | MainFooterDocument | MainNavigationDocument | MainNavigationV2Document | MediationDocument | MentionDpDetailleeDocument | NavigationDocument | NewsItemDocument | PartnersPageDocument | PersonasListDocument | PrivacyPolicyPageDocument | SchoolEducationDocument | SimplePageDocument | SlicesPageDocument | SocialCardsDocument | StatistiquesDocument | SupportFaqPostDocument | SupportPersonaFaqDocument | SupportPersonaDocument | TestDocument;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			AboutDocument,
			AboutDocumentData,
			AboutDocumentDataBodySectionSlicePrimary,
			AboutDocumentDataBodySectionSliceItem,
			AboutDocumentDataBodyHeroBannerSlicePrimary,
			AboutDocumentDataBodyLeftSectionSlicePrimary,
			AboutDocumentDataBodyLeftSectionSliceItem,
			AboutDocumentDataBodySlice,
			AboutDocumentDataMetaGeneralCardSlicePrimary,
			AboutDocumentDataMetaTwitterCardSlicePrimary,
			AboutDocumentDataMetaSlice,
			BlogPostDocument,
			BlogPostDocumentData,
			BlogPostDocumentDataBodyContentSlicePrimary,
			BlogPostDocumentDataBodyQuoteSlicePrimary,
			BlogPostDocumentDataBodyImageSlicePrimary,
			BlogPostDocumentDataBodySlice,
			CguPageDocument,
			CguPageDocumentData,
			CguPageDocumentDataMetaGeneralCardSlicePrimary,
			CguPageDocumentDataMetaTwitterCardSlicePrimary,
			CguPageDocumentDataMetaSlice,
			CompetencesDocument,
			CompetencesDocumentData,
			CompetencesDocumentDataBodySectionSlicePrimary,
			CompetencesDocumentDataBodySectionSliceItem,
			CompetencesDocumentDataBodySlice,
			CompetencesDocumentDataMetaGeneralCardSlicePrimary,
			CompetencesDocumentDataMetaTwitterCardSlicePrimary,
			CompetencesDocumentDataMetaSlice,
			DistributorItemDocument,
			DistributorItemDocumentData,
			EasiwareFormDocument,
			EasiwareFormDocumentData,
			EasiwareFormPageDocument,
			EasiwareFormPageDocumentData,
			EmployersDocument,
			EmployersDocumentData,
			EmployersDocumentDataBodyHeroBannerSlicePrimary,
			EmployersDocumentDataBodySectionSlicePrimary,
			EmployersDocumentDataBodySectionSliceItem,
			EmployersDocumentDataBodyButtonSlicePrimary,
			EmployersDocumentDataBodyCardSectionSlicePrimary,
			EmployersDocumentDataBodyCardSectionSliceItem,
			EmployersDocumentDataBodyRessourceSlicePrimary,
			EmployersDocumentDataBodyLeftSection1SlicePrimary,
			EmployersDocumentDataBodyLeftSection1SliceItem,
			EmployersDocumentDataBodyDistributorsSectionSlicePrimary,
			EmployersDocumentDataBodyDistributorsSectionSliceItem,
			EmployersDocumentDataBodySlice,
			EmployersDocumentDataMetaGeneralCardSlicePrimary,
			EmployersDocumentDataMetaTwitterCardSlicePrimary,
			EmployersDocumentDataMetaSlice,
			FaqCategoryDocument,
			FaqCategoryDocumentData,
			FaqCategoryDocumentDataFaqItemsItem,
			FaqItemDocument,
			FaqItemDocumentData,
			FaqMenuDocument,
			FaqMenuDocumentData,
			FaqMenuDocumentDataFaqCategoriesItem,
			FormPageDocument,
			FormPageDocumentData,
			HigherEducationDocument,
			HigherEducationDocumentData,
			HigherEducationDocumentDataBodyHeroBannerSlicePrimary,
			HigherEducationDocumentDataBodyHeroBannerSliceItem,
			HigherEducationDocumentDataBodySectionSlicePrimary,
			HigherEducationDocumentDataBodySectionSliceItem,
			HigherEducationDocumentDataBodyLeftSectionSlicePrimary,
			HigherEducationDocumentDataBodyLeftSectionSliceItem,
			HigherEducationDocumentDataBodyHeroSectionSlicePrimary,
			HigherEducationDocumentDataBodyHeroSectionSliceItem,
			HigherEducationDocumentDataBodyCardSectionSlicePrimary,
			HigherEducationDocumentDataBodyCardSectionSliceItem,
			HigherEducationDocumentDataBodyRessourceSlicePrimary,
			HigherEducationDocumentDataBodySlice,
			HigherEducationDocumentDataMetaGeneralCardSlicePrimary,
			HigherEducationDocumentDataMetaTwitterCardSlicePrimary,
			HigherEducationDocumentDataMetaSlice,
			HotNewsDocument,
			HotNewsDocumentData,
			IndexDocument,
			IndexDocumentData,
			JobOfferDocument,
			JobOfferDocumentData,
			KeyNumbersDocument,
			KeyNumbersDocumentData,
			KeyNumbersDocumentDataColumnItem,
			LegalNoticesDocument,
			LegalNoticesDocumentData,
			LegalNoticesDocumentDataBodySectionSlicePrimary,
			LegalNoticesDocumentDataBodySectionSliceItem,
			LegalNoticesDocumentDataBodyTextSlicePrimary,
			LegalNoticesDocumentDataBodySlice,
			LegalNoticesDocumentDataMetaGeneralCardSlicePrimary,
			LegalNoticesDocumentDataMetaTwitterCardSlicePrimary,
			LegalNoticesDocumentDataMetaSlice,
			LoremIpsumDolorDocument,
			LoremIpsumDolorDocumentData,
			MainFooterDocument,
			MainFooterDocumentData,
			MainFooterDocumentDataBodySocialMediaSliceItem,
			MainFooterDocumentDataBodyLogosZoneSliceItem,
			MainFooterDocumentDataBodyTextSlicePrimary,
			MainFooterDocumentDataBodyNavigationGroupSlicePrimary,
			MainFooterDocumentDataBodyNavigationGroupSliceItem,
			MainFooterDocumentDataBodySlice,
			MainNavigationDocument,
			MainNavigationDocumentData,
			MainNavigationDocumentDataBodyLogosZoneSliceItem,
			MainNavigationDocumentDataBodyNavigationZoneSliceItem,
			MainNavigationDocumentDataBodyActionsZoneSliceItem,
			MainNavigationDocumentDataBodyProcessZoneSlicePrimary,
			MainNavigationDocumentDataBodyProcessZoneSliceItem,
			MainNavigationDocumentDataBodySlice,
			MainNavigationV2Document,
			MainNavigationV2DocumentData,
			MainNavigationV2DocumentDataBodyLogosZoneSliceItem,
			MainNavigationV2DocumentDataBodyNavigationZoneSliceItem,
			MainNavigationV2DocumentDataBodyActionsZoneSlicePrimary,
			MainNavigationV2DocumentDataBodyActionsZoneSliceItem,
			MainNavigationV2DocumentDataBodyProcessSlicePrimary,
			MainNavigationV2DocumentDataBodyProcessSliceItem,
			MainNavigationV2DocumentDataBodySlice,
			MediationDocument,
			MediationDocumentData,
			MediationDocumentDataBodyHeroBannerSlicePrimary,
			MediationDocumentDataBodyHeroBannerSliceItem,
			MediationDocumentDataBodyLeftSectionSlicePrimary,
			MediationDocumentDataBodyLeftSectionSliceItem,
			MediationDocumentDataBodyInsertSlicePrimary,
			MediationDocumentDataBodyInsertSliceItem,
			MediationDocumentDataBodySection1SlicePrimary,
			MediationDocumentDataBodySection1SliceItem,
			MediationDocumentDataBodySlice,
			MediationDocumentDataMetaGeneralCardSlicePrimary,
			MediationDocumentDataMetaTwitterCardSlicePrimary,
			MediationDocumentDataMetaSlice,
			MentionDpDetailleeDocument,
			MentionDpDetailleeDocumentData,
			NavigationDocument,
			NavigationDocumentData,
			NavigationDocumentDataBodyElementSlicePrimary,
			NavigationDocumentDataBodySlice,
			NewsItemDocument,
			NewsItemDocumentData,
			NewsItemDocumentDataSlicesWebSnippetSlicePrimary,
			NewsItemDocumentDataSlicesMultipleColumnSlicePrimary,
			NewsItemDocumentDataSlicesMultipleColumnSliceItem,
			NewsItemDocumentDataSlicesRichTextSlicePrimary,
			NewsItemDocumentDataSlicesSlice,
			NewsItemDocumentDataMetaGeneralCardSlicePrimary,
			NewsItemDocumentDataMetaTwitterCardSlicePrimary,
			NewsItemDocumentDataMetaSlice,
			PartnersPageDocument,
			PartnersPageDocumentData,
			PartnersPageDocumentDataOrganizationsItem,
			PartnersPageDocumentDataSchoolsItem,
			PartnersPageDocumentDataMetaGeneralCardSlicePrimary,
			PartnersPageDocumentDataMetaTwitterCardSlicePrimary,
			PartnersPageDocumentDataMetaSlice,
			PersonasListDocument,
			PersonasListDocumentData,
			PersonasListDocumentDataBodyPersonaSlicePrimary,
			PersonasListDocumentDataBodyPersonaSliceItem,
			PersonasListDocumentDataBodySlice,
			PrivacyPolicyPageDocument,
			PrivacyPolicyPageDocumentData,
			SchoolEducationDocument,
			SchoolEducationDocumentData,
			SchoolEducationDocumentDataBodyHeroSectionSlicePrimary,
			SchoolEducationDocumentDataBodyHeroSectionSliceItem,
			SchoolEducationDocumentDataBodyCardSectionSlicePrimary,
			SchoolEducationDocumentDataBodyCardSectionSliceItem,
			SchoolEducationDocumentDataBodySectionSlicePrimary,
			SchoolEducationDocumentDataBodySectionSliceItem,
			SchoolEducationDocumentDataBodyHeroBanner1SlicePrimary,
			SchoolEducationDocumentDataBodyLeftSection1SlicePrimary,
			SchoolEducationDocumentDataBodyLeftSection1SliceItem,
			SchoolEducationDocumentDataBodyBanner1SlicePrimary,
			SchoolEducationDocumentDataBodyBanner1SliceItem,
			SchoolEducationDocumentDataBodySlice,
			SchoolEducationDocumentDataMetaGeneralCardSlicePrimary,
			SchoolEducationDocumentDataMetaTwitterCardSlicePrimary,
			SchoolEducationDocumentDataMetaSlice,
			SimplePageDocument,
			SimplePageDocumentData,
			SimplePageDocumentDataSlicesSlice,
			SlicesPageDocument,
			SlicesPageDocumentData,
			SlicesPageDocumentDataBodyBannerSlicePrimary,
			SlicesPageDocumentDataBodyBannerSliceItem,
			SlicesPageDocumentDataBodyArticleSlicePrimary,
			SlicesPageDocumentDataBodyPartnersLogosSlicePrimary,
			SlicesPageDocumentDataBodyPartnersLogosSliceItem,
			SlicesPageDocumentDataBodyLatestNewsSlicePrimary,
			SlicesPageDocumentDataBodyMultipleBlockSlicePrimary,
			SlicesPageDocumentDataBodyMultipleBlockSliceItem,
			SlicesPageDocumentDataBodyStatSlicePrimary,
			SlicesPageDocumentDataBodyPopInSlicePrimary,
			SlicesPageDocumentDataBodyEmbedSlicePrimary,
			SlicesPageDocumentDataBodyTestimonialsSliceItem,
			SlicesPageDocumentDataBodyTabsSlicePrimary,
			SlicesPageDocumentDataBodyTabsSliceItem,
			SlicesPageDocumentDataBodySlice,
			SlicesPageDocumentDataMetaGeneralCardSlicePrimary,
			SlicesPageDocumentDataMetaTwitterCardSlicePrimary,
			SlicesPageDocumentDataMetaSlice,
			SocialCardsDocument,
			SocialCardsDocumentData,
			SocialCardsDocumentDataMetaGeneralCardSlicePrimary,
			SocialCardsDocumentDataMetaTwitterCardSlicePrimary,
			SocialCardsDocumentDataMetaSlice,
			StatistiquesDocument,
			StatistiquesDocumentData,
			StatistiquesDocumentDataStatsStatsSlicePrimary,
			StatistiquesDocumentDataStatsSlice,
			SupportFaqPostDocument,
			SupportFaqPostDocumentData,
			SupportPersonaFaqDocument,
			SupportPersonaFaqDocumentData,
			SupportPersonaFaqDocumentDataPopularPostsItem,
			SupportPersonaFaqDocumentDataBodyCategorySlicePrimary,
			SupportPersonaFaqDocumentDataBodyCategorySliceItem,
			SupportPersonaFaqDocumentDataBodySlice,
			SupportPersonaDocument,
			SupportPersonaDocumentData,
			TestDocument,
			TestDocumentData,
			AllDocumentTypes
		}
	}
}