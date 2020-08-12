import React, { FC,SVGProps} from 'react'
const isUrl = require('is-url');
import { useSlate } from 'slate-react'
import { Transforms, Editor, Range} from 'slate'
import { Button, Icon } from "./Helper";

interface LinkButtonProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  showInput: () => void;
}

export const LinkButton: (props: LinkButtonProps) => JSX.Element = ({
  icon,
  showInput
}) => {
  const editor = useSlate();
  const active = isLinkActive(editor) !== undefined ? true : false; 
  return (
    <Button
      active={active}
      onMouseDown={event => {
        event.preventDefault();
        showInput();
      }}
      reversed={false}
    >
      <Icon svg={icon} />
    </Button>
  );
};

//with links
export const withLinks = (editor: any) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element: any) => {
    return element.type === "link" ? true : isInline(element);
  };

  editor.insertText = (text: string) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };
  editor.insertData = (data: any) => {
    const text = data.getData("text/plain");
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };
  return editor;
};
const isLinkActive = (editor: any) => {
  const [link] = Editor.nodes(editor, { match: (n) => n.type === "link" });
  return !!link;
};

const unwrapLink = (editor: any) => {
  Transforms.unwrapNodes(editor, { match: (n) => n.type === "link" });
};
//link wrapper
const wrapLink = (editor: any, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};
//insert the link
export const insertLink = (editor: any, url: string) => {
  if (editor.selection) {
    if(isUrl(url)) wrapLink(editor, url);
    else wrapLink(editor,"https://"+url);
  }
};