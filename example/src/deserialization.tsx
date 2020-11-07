export const deserialization = (blockContent: any) => {
  let deserializedContent = blockContent.map((block: any) => {
      let children = getChildNodes(block);
      let type = getNodeType(block.type);
      return {type, children}
    });
    return deserializedContent;
};


const getChildNodes= (block: any) => {
  if(block && "properties" in block  && "document" in block.properties) {
    const blockDocumentsList = block.properties.document;
    const childNodes = blockDocumentsList.map((propertyBlock:any) => {
      const {properties, text} = propertyBlock;
      if(properties.length === 0) {
        return {text};
      }
      else {
      let childObject= {};
      for(let property of properties) {
      if (property ==="a") {
          childObject = {...childObject, type: "link", url:properties[1], children: [{text}] }
          break;
      }
      else {
        childObject = {text};
        switch(property) {
          case "b":
            childObject = {...childObject, block : true}
            break;
          case "i":
            childObject = {...childObject, italic : true}
            break;
          case "u":
            childObject = {...childObject, underlined : true}
            break;
          case "code":
            childObject = {...childObject, code : true}
            break;
        }
      }
    }
    return childObject;
  }
});
  return childNodes;
}
else return [];
}

const getNodeType = (blockType: string) => {
  switch(blockType) {
    case "text":
      return "paragraph";
    default:
      return blockType;
  }
}
