const getChildNodes = (block: any) => {
  if (block && 'properties' in block && 'document' in block.properties) {
    const blockDocumentsList = block.properties.document;
    const childNodes = blockDocumentsList.map((propertyBlock: any) => {
      const { properties, text } = propertyBlock;
      if (properties.length === 0) {
        return { text };
      }
      let childObject: any = { text };
      Object.keys(properties).forEach((property) => {
        if (property === 'a') {
          childObject = {
            type: 'link',
            url: properties[1],
            children: [{ text }],
          };
        } else {
          switch (property) {
            case 'b':
              childObject.bold = true;
              break;
            case 'i':
              childObject.italic = true;
              break;
            case 'u':
              childObject.underlined = true;
              break;
            case 'code':
              childObject.code = true;
              break;
            default:
              break;
          }
        }
      });
      return childObject;
    });
    return childNodes;
  }
  return [];
};

const getNodeType = (blockType: string) => {
  switch (blockType) {
    case 'text':
      return 'paragraph';
    default:
      return blockType;
  }
};

const deserialization = (blockContent: any) => {
  const deserializedContent = blockContent.map((block: any) => {
    const children = getChildNodes(block);
    const type = getNodeType(block.type);
    return { type, children };
  });
  return deserializedContent;
};

export default deserialization;
