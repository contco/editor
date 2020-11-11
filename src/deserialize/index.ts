const deserialization = (blockContentList: any) => {
  const deserializedContent = blockContentList.map((blockContent: any) => {
    const { block } = blockContent
    const children = getChildNodes(block)
    const type = getNodeType(block.type)
    return { _id: block._id, type, children }
  })
  return deserializedContent
}

const getChildNodes = (block: any) => {
  if (block && 'properties' in block && 'document' in block.properties) {
    const blockDocumentsList = block.properties.document
    const childNodes = blockDocumentsList.map((propertyBlock: any) => {
      const { properties, text } = propertyBlock
      if (properties.length === 0) {
        return { text }
      } else {
        let childObject: any = { text }
        for (const property of properties) {
          if (property === 'a') {
            childObject = {
              type: 'link',
              url: properties[1],
              children: [{ text }]
            }
            break
          } else {
            switch (property) {
              case 'b':
                childObject.bold = true
                break
              case 'i':
                childObject.italic = true
                break
              case 'u':
                childObject.underlined = true
                break
              case 'code':
                childObject.code = true
                break
            }
          }
        }
        return childObject
      }
    })
    return childNodes
  } else return []
}

const getNodeType = (blockType: string) => {
  switch (blockType) {
    case 'text':
      return 'paragraph'
    default:
      return blockType
  }
}

export default deserialization
