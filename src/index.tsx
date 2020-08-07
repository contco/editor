import React, { useCallback, useMemo, ReactNode} from "react";
import { createEditor } from "slate";
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps
} from "slate-react";

import styled from "styled-components";
import ToolBar from "./ToolBar";
import { withLinks } from "./LinkHelper";
import { withHistory } from 'slate-history'


interface Props {
  data?: any;
  setContent: (content: any) => void;
  initialData?: any;
  readOnly?: boolean;
  attributes?: any;
  children?: ReactNode;
  element?: any;
  theme?: any;
}
const Editor: (props: Props) => any = ({ data, setContent, readOnly, theme }) => {
  const editor = useMemo(() => withLinks(withHistory(withReact(createEditor()))), []);
  const renderElement = useCallback((props) => <Element {...props} theme={theme}/>, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <Slate
      editor={editor}
      value={data}
      onChange={(newValue: any) => setContent(newValue)}
    >
      <ToolBar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        readOnly={readOnly ? true : false}

      />
    </Slate>
  );
};

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.67px;
`;

const CodeBlock = styled.div`
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 2px;
  width: max-content;
  padding: 10px;
  padding-bottom: 30px;
  padding-right: 50px;
`;

const Code = styled.code`
  padding: 5px;
`;

const BlockQuote = styled.blockquote`
  font-style: normal;
  font-size: 16px;
  min-height: 30px;
  padding-left: 8px;
 `;

const Triangle = styled.span`
  width: 0;
  height: 0;
  border: solid 8px;
  border-color: transparent transparent #050b21 transparent;
  margin: 0 auto;
  display:flex;
`;

const Rectangle = styled.span`
  width: max-content;
  padding: 0px 5px;
  height: 20px;
  border-radius: 2px;
  background-color: #050b21;
  font-size: 8px;
  letter-spacing: 0.33px;
  color: #ffffff !important;
  display: flex;
  align-items: center;
  `;

const LinkContainer = styled.span`
  position: absolute;
  display:inline-block;
  width: max-content;
  top: 130%;
  left: 50%;
  margin-top: 2px;
  transform: translate(-50%, -50%);
  display:none;
`;
const Link = styled.a`
   position: relative;
  &:hover ${LinkContainer} {
    display: initial;
  }
  &:hover {
    text-decoration: underline;
    
  }
  text-decoration: underline;
  
`;


const Element: React.FC<RenderElementProps> = ({
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
            <Rectangle >{element?.url}</Rectangle>
          </LinkContainer>
        </Link>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
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

export default React.memo(Editor);
