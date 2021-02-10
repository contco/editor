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
    const sub = block.children;
    if (block.type === 'numbered-list' || block.type === 'bulleted-list') {
      const subChild: any = [];
      const document: any = [];

      for (let ii = 0; ii < sub.length; ii += 1) {
        const substate = sub[ii].block.properties;
        for (let jj = 0; jj < substate.document.length; jj += 1) {
          const props: any = {};
          if (substate.document[jj].properties.includes('b')) props.bold = true;
          if (substate.document[jj].properties.includes('u')) props.underlined = true;
          if (substate.document[jj].properties.includes('i')) props.italic = true;
          if (substate.document[jj].properties.includes('code')) props.code = true;
          document.push({ text: substate.document[jj].text, ...props });
        }
        subChild.push({ _id: block._id, children: document, type: 'list-item' });
      }

      const state = { _id: block._id, children: subChild, type: block.type };
      return state;
    }

    return { _id: block._id, type, children };
  });
  return deserializedContent;
};

export default deserialization;
