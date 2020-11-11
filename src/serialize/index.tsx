const serialize = (slateNodesList: any) => {
  const serializedBlocks = slateNodesList.map((node: any) => {
    switch (node.type) {
      case 'paragraph':
        return serializeParagraph(node, 'text')
      case 'block-quote':
        return serializeParagraph(node, 'block-quote')
      case 'heading-one':
      case 'heading-two':
        return serializeHeading(node, node.type)
      default:
        return serializeParagraph(node, 'text')
    }
  })
  return serializedBlocks
}

const serializeParagraph = (paragraphNode: any, textType: string) => {
  const document = paragraphNode.children.map((childNodes: any) => {
    const text = getParagraphText(childNodes)
    const properties = getParagraphProperties(childNodes)
    return { text, properties }
  })
  const paragraphBlock = checkIdAndReturnBlock(
    textType,
    document,
    paragraphNode
  )
  return paragraphBlock
}

const serializeHeading = (headingNode: any, headingType: string) => {
  const document = headingNode.children.map((childNode: any) => {
    const properties = getHeadingProperties(childNode)
    return { text: childNode.text, properties }
  })
  const headingBlock = checkIdAndReturnBlock(headingType, document, headingNode)
  return headingBlock
}

const getParagraphText = (textNode: any) => {
  if ('type' in textNode && textNode.type === 'link') {
    return textNode.children[0].text
  } else return textNode.text
}

const getParagraphProperties = (textNode: any) => {
  const properties = []
  if ('type' in textNode && textNode.type === 'link') {
    properties.push('a', textNode.url)
  } else if (textNode.code) {
    properties.push('code')
  } else {
    if (textNode.bold) properties.push('b')
    if (textNode.italic) properties.push('i')
    if (textNode.underlined) properties.push('u')
  }
  return properties
}
const getHeadingProperties = (textNode: any) => {
  const properties = []
  if (textNode.italic) properties.push('i')
  if (textNode.underlined) properties.push('u')
  return properties
}

const checkIdAndReturnBlock = (type: string, document: any, node: any) => {
  if (node._id) {
    return { block: { _id: node._id, type: type, properties: { document } } }
  } else return { block: { type: type, properties: { document } } }
}
export default serialize
