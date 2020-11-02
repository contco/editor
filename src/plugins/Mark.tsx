import * as React from "react";
import {RenderElementProps, RenderLeafProps } from "slate-react";
import { Paragraph, CodeBlock, BlockQuote, Link, LinkContainer, Triangle, Rectangle, Code } from './MarkStyle';

export const Element: React.FC<RenderElementProps> = ({
  attributes,
  children,
  element
}: any) => {
  switch (element.type) {
    case "paragraph":
      return <Paragraph {...attributes}>{children}</Paragraph>;
    case "code-block":
      return <CodeBlock {...attributes}>{children} </CodeBlock>;
    case "block-quote":
      return <BlockQuote {...attributes} >{children}</BlockQuote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "link":
      return (
        <Link {...attributes} href={element.url} target="_blank" contentEditable={false}>
          {children}
          <LinkContainer>
            <Triangle />
            <Rectangle>{element?.url}</Rectangle>
          </LinkContainer>
        </Link>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <Code>{children}</Code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }
    if (leaf.underlined) {
        children = <u>{children}</u>;
    }
    return <span {...attributes}>{children}</span>;
};