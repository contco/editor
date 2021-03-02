/* eslint no-underscore-dangle: "off" */
import * as React from 'react';
import { Code } from './plugins/LeafStyle';
import {
  Paragraph,
  BlockQuote,
  Link,
  LinkContainer,
  Triangle,
  Rectangle,
  Heading1,
  Heading2,
} from './plugins/ElementStyle';
import {
  PROPERTY_BOLD,
  PROPERTY_ITALIC,
  PROPERTY_CODE,
  PROPERTY_UNDERLINED,
  PROPERTY_LINK,
} from './constant/propertyType';
import { HEADING1, HEADING2, TEXT, BLOCK_QUOTE } from './constant/blockType';
import getShortLink from './utils/getShortLink';

interface ViewerProps {
  data?: any;
  className?: string;
}

const Viewer: (props: ViewerProps) => any = ({ data, className }) => {
  const renderProperty = (properties: string[], text: any) => {
    let textWithProperty = text;
    properties.forEach((p, index) => {
      switch (p) {
        case PROPERTY_BOLD:
          textWithProperty = <b> {textWithProperty} </b>;
          break;
        case PROPERTY_ITALIC:
          textWithProperty = <i> {textWithProperty} </i>;
          break;
        case PROPERTY_UNDERLINED:
          textWithProperty = <u> {textWithProperty} </u>;
          break;
        case PROPERTY_CODE:
          textWithProperty = <Code> {textWithProperty} </Code>;
          break;
        case PROPERTY_LINK:
          textWithProperty = (
            <Link href={properties[index + 1]} target="_blank">
              {' '}
              {textWithProperty}
              <LinkContainer>
                <Triangle />
                <Rectangle>{getShortLink(properties[index + 1])}</Rectangle>
              </LinkContainer>
            </Link>
          );
          break;
        default:
          textWithProperty = <span> {textWithProperty}</span>;
          break;
      }
    });
    return <span> {textWithProperty} </span>;
  };

  const renderBlock = () => {
    const render = data.map((block: any) => {
      if (block.block.type === HEADING1) {
        return (
          <Heading1 key={block.block._id}>
            {block.block.properties.document.map((document: any) => (
              <span key={document.text}>
                {document.properties !== undefined ? renderProperty(document.properties, document.text) : document.text}
              </span>
            ))}
          </Heading1>
        );
      }
      if (block.block.type === HEADING2) {
        return (
          <Heading2 key={block.block._id}>
            {block.block.properties.document.map((document: any) => (
              <span key={document.text}>
                {document.properties !== undefined ? renderProperty(document.properties, document.text) : document.text}
              </span>
            ))}
          </Heading2>
        );
      }
      if (block.block.type === TEXT) {
        return (
          <Paragraph key={block.block._id}>
            {block.block.properties.document.map((document: any) => (
              <span key={document.text}>
                {document.properties !== undefined ? renderProperty(document.properties, document.text) : document.text}
              </span>
            ))}
          </Paragraph>
        );
      }
      if (block.block.type === BLOCK_QUOTE) {
        return (
          <BlockQuote key={block.block._id}>
            {block.block.properties.document.map((document: any) => (
              <span key={document.text}>
                {document.properties !== undefined ? renderProperty(document.properties, document.text) : document.text}
              </span>
            ))}
          </BlockQuote>
        );
      }

      return null;
    });
    return render;
  };
  return <div className={className}>{renderBlock()}</div>;
};
export default Viewer;
