import prismicDOM from 'prismic-dom'

const Elements = prismicDOM.RichText.Elements

export default function (type, element, content, children) {
  // Generate links to Prismic Documents as <router-link> components
  // Present by default, it is recommended to keep this
  if (type === Elements.hyperlink) {
    return `<pix-prismic-link field="${element.data}">${content}</pix-prismic-link>`
  }

  // If the image is also a link to a Prismic Document, it will return a <router-link> component
  // Present by default, it is recommended to keep this
  if (type === Elements.image) {
    let result = `<img src="${element.url}" alt="${
      element.alt || ''
    }" copyright="${element.copyright || ''}">`

    if (element.linkTo) {
      result = `<pix-prismic-link field="${element.linkTo}">${result}</pix-prismic-link>`
    }
    const wrapperClassList = [element.label || '', 'block-img']
    result = `<p class="${wrapperClassList.join(' ')}">${result}</p>`
    return result
  }

  // Return null to stick with the default behavior for everything else
  return null
}
