/* eslint-disable no-underscore-dangle */

const getNodeType = (blockType: string) => {
  switch (blockType) {
    case 'text':
      return 'paragraph';
    default:
      return blockType;
  }
};

const getChildNodes = (block: any) => {
  if (block && 'properties' in block && 'document' in block.properties) {
    const blockDocumentsList = block.properties.document;
    const childNodes = blockDocumentsList.map((propertyBlock: any) => {
      const { properties, text } = propertyBlock;
      if ((properties !== undefined && properties.length === 0) || properties === undefined) {
        return { text };
      }
      let childObject: any = { text };
      properties.forEach((property: string) => {
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

const deserialization = (blockContentList: any) => {
  const deserializedContent = blockContentList.map((blockContent: any) => {
    const { block } = blockContent;
    const children = getChildNodes(block);
    const type = getNodeType(block.type);
    if (type === 'image' && block.properties) {
      return { id: block._id, type, children, url: block.properties.document[0].properties };
    }

    return { id: block._id, type, children };
  });
  return deserializedContent;
};

export default deserialization;
