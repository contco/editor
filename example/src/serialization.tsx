

export const serializeHTML = (slateNodesList:any) => {

  const serializedBlocks = slateNodesList.map((node: any) => {
    switch(node.type) {
      case "paragraph":
        return serializeParagraph(node, "text");
      case "block-quote":
        return serializeParagraph(node, "block-quote");
      case "heading-one":
      case "heading-two":
        return serializeHeading(node, node.type);
      default:
      return serializeParagraph(node, "text");
    }
  });
  return serializedBlocks;

  }

const serializeParagraph = (paragraphNodesList: any , type: string) => {
  const document = paragraphNodesList.children.map((childNodes: any) => {
      const text = getParagraphText(childNodes);
      const properties = getParagraphProperties(childNodes);
      return {text, properties};
  })
  const paragraphBlock =  {type, properties: {document}};
  return paragraphBlock;
}

const serializeHeading = (headingNodes: any, type: String) => {
  const document = headingNodes.children.map((childNode: any) => {
    const properties = getHeadingProperties(childNode);
    return {text:childNode.text , properties};
})
const headingBlock =  {type: type, properties: {document}};
return headingBlock;
}

const getParagraphText = (textNode: any) => {
  if ("type" in textNode && textNode.type === "link") {
    return textNode.children[0].text;
  }
  else return textNode.text;
}

const getParagraphProperties = (textNode: any) => {
  let properties = [];
  if("type" in textNode  && textNode.type === "link") {
    properties.push("a", textNode.url);
  }
  else if (textNode.code) {
    properties.push("code");
  }
  else {
  if (textNode.bold) properties.push("b");
  if (textNode.italic) properties.push("i");
  if (textNode.underlined) properties.push('u');
  }
  return properties;
}
const getHeadingProperties = (textNode: any) => {
let properties = [];
if (textNode.italic) properties.push("i");
if (textNode.underlined) properties.push('u');
  return properties;
}
