import escapeHtml from 'escape-html'
import { Text } from 'slate'

const serializer = (node:any) => {
  if (Text.isText(node)) {
    return serializeLeaf(node, node.text);
  }
  const children = node.children.map((n:any) => serializer(n)).join('');
  return serializeElement(node, children);
}

//serialize elements
function serializeElement(element:any, children:any) {
  switch(element.type) {
    case 'paragraph':
      return `<p>${children}</p>`
    case 'block-quote':
      return `<blockquote>${children}</blockquote>`
    case "code-block":
      return `<codeblock>${children} </codeblock>`;
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "heading-two":
      return `<h2>${children}</h2>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "numbered-list":
      return `<ol>${children}</ol>`;
    case "bulleted-list":
      return `<ul>${children}</ul>`;
    case 'link':
      return `<a href="${escapeHtml(element.url)}" target="_blank">${children}</a>`
    default:
      return children
  }
}

//serialize leaf
function serializeLeaf(leaf:any, children:any) {
  if (leaf.bold) {
    children = `<strong>${children}</strong>`
  }
  if (leaf.code) {
    children = `<code>${children}</code>`
  }
  if (leaf.italic) {
    children = `<em>${children}</em>`
  }
  if (leaf.underlined) {
    children = `<u>${children}</u>`
  }
  return `<span>${children}</span>`
}

export default serializer;