import * as React from 'react';
import { RenderElementProps } from 'slate-react';
import { Paragraph, CodeBlock, BlockQuote, Link, Image, LinkContainer, Triangle, Rectangle } from './ElementStyle';
import getShortLink from '../utils/getShortLink';

const Element: React.FC<RenderElementProps> = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case 'paragraph':
      return <Paragraph {...attributes}>{children}</Paragraph>;
    case 'code-block':
      return <CodeBlock {...attributes}>{children} </CodeBlock>;
    case 'block-quote':
      return <BlockQuote {...attributes}>{children}</BlockQuote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'link':
      return (
        <Link {...attributes} href={element.url} target="_blank" contentEditable={false}>
          {children}
          <LinkContainer>
            <Triangle />
            <Rectangle>{getShortLink(element?.url)}</Rectangle>
          </LinkContainer>
        </Link>
      );
    case `image`:
      return (
        <div {...attributes}>
          <div contentEditable={false}>
            <Image src={element.url} />
          </div>
          {children}
        </div>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default Element;
