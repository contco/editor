import escapeHtml from 'escape-html'
import { Text } from 'slate'

export const serializeHTML = (node:any) => {
  if (Text.isText(node)) {
    // return serializeLeaf(node, node.text);
    return escapeHtml(node.text)

  }
  const children = node.children.map((n:any) => serializeHTML(n)).join('');
  return serializeElement(node, children);
}

//serialize elements
function serializeElement(element:any, children:any) {
  switch(element.type) {
    case 'paragraph':
      console.log("c---------> ", children);
      return [{type:"text" , children:children}]
   
    default:
        console.log("c---------> ", children);
      return children
  }
}

//serialize leaf
// function serializeLeaf(leaf:any, children:any) {
//   if (leaf.bold) {
//     children = `<strong>${children}</strong>`
//   }
//   if (leaf.code) {
//     children = `<code>${children}</code>`
//   }
//   if (leaf.italic) {
//     children = `<em>${children}</em>`
//   }
//   if (leaf.underlined) {
//     children = `<u>${children}</u>`
//   }
//   return `<span>${children}</span>`
// }