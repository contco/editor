import escapeHtml from 'escape-html'
import { Text } from 'slate'

const serialize = (node:any) => {
  if (Text.isText(node)) {
    // return escapeHtml(node.text)
    return serializeLeaf(node, node.text);

  }
  const children = node.children.map((n:any) => serialize(n)).join('')
  
  return serializeElement(node, children);
}

//serialize elements
function serializeElement(element:any, children:any) {
  switch(element.type) {
    case 'paragraph':
      return `<p>${children}</p>`
    case 'block-quote':
      return `<blockquote>${children}</blockquote>`
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
  if (leaf.underline) {
    children = `<u>${children}</u>`
  }
  return `<span>${children}</span>`
}
export default serialize;