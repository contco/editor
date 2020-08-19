import React, { useRef, useEffect, useState, createRef, Fragment } from "react";
import { ReactEditor, useSlate } from "slate-react";
import { Editor } from "slate";
import { Menu, Portal } from "./Helper";
import { BlockButton } from "./BlockHelper";
import { MarkButton } from "./MarkHelper";
import { LinkButton, insertLink } from "./LinkHelper";
import { Range } from "slate";
import styled from "styled-components";
//icons
import {ReactComponent as Bold }from "../assets/bold.svg";
import {ReactComponent as Coding} from "../assets/coding.svg";
import {ReactComponent as Italic} from "../assets/italic.svg";
import {ReactComponent as Link} from "../assets/link.svg";
import {ReactComponent as Quote} from "../assets/quote.svg";
import {ReactComponent as Underline} from "../assets/underline.svg";
import {ReactComponent as H1} from "../assets/h1.svg";
import {ReactComponent as H2} from "../assets/h2.svg";

export interface ToolBarProps { }

const ToolBar: React.FC<ToolBarProps> = () => {

  const [isInput, setIsInput] = useState<boolean>(false);
  const [inputToolbarPosition, setInputToolbarPosition] = useState<any>({});
  const [selectedArea, setSelectedArea] = useState<any>({});
  const ref = useRef();
  const inputMenuRef = useRef();
  const inputContainerRef = createRef<any>();
  const editor = useSlate();
  let el: any;
  let rect: any;
  const { selection } = editor;


  useEffect(() => {
    if (isInput) {
      el = inputMenuRef.current;
      if (!el) {
        return;
      }
      el.style.opacity = 1;
      el.style.top = inputToolbarPosition.top;
      el.style.left = inputToolbarPosition.left;
    }
  });



  //tooltip reference
  useEffect(() => {
    el = ref.current;
    if (!el) {
      return;
    }
    if (
      (!isInput) &&
      (!selection ||
        !ReactEditor.isFocused(editor) ||
        Range.isCollapsed(selection) ||
        Editor.string(editor, selection) === "")
    ) {
      el.removeAttribute("style");
      return;
    }
    const domSelection = window.getSelection();
    const domRange = domSelection?.getRangeAt(0);
    rect = domRange?.getBoundingClientRect();
    el.style.opacity = 1;
    el.style.top = `${rect?.top + window.pageYOffset - el.offsetHeight + 70}px`;
    el.style.left = `${
      rect?.left + window.pageXOffset - el.offsetWidth / 2 + rect?.width / 2
      }px`;
  });

  const LinkButtonClick = () => {
    setSelectedArea(selection);
    const domSelection = window.getSelection();
    const domRange = domSelection?.getRangeAt(0);
    rect = domRange?.getBoundingClientRect();
    let position = {
      top: `${rect?.top + window.pageYOffset - el.offsetHeight + 70}px`, left: `${
        rect?.left + window.pageXOffset - el.offsetWidth / 2 + rect?.width / 2
        }px`
    };
    setInputToolbarPosition(position);
    setIsInput(true);
  }
  const handleInput = (e: any) => {
    if (e.key === 'Enter') {
      const val = e.target.value;
      editor['selection'] = selectedArea;
      insertLink(editor, val);
      setIsInput(false);
    }
    if (e.key === 'Escape') {
      setIsInput(false);
    }
  }
  if (isInput) {
    return (
      <Fragment>
      <Portal>
        <Menu ref={inputMenuRef}>
          <div>
            <Input onBlur={() => setIsInput(false)} autoFocus ref={inputContainerRef} type="text" onKeyPress={(e) => handleInput(e)} />
          </div>
        </Menu>
      </Portal>
      </Fragment>
    );
  }
  return (
    <Fragment>
    <Portal>
      <Menu ref={ref}>
        <MarkButton format="bold" icon={Bold} />
        <MarkButton format="italic" icon={Italic} />
        <MarkButton format="underlined" icon={Underline} />
        <LinkButton showInput={LinkButtonClick} icon={Link} />
        <BlockButton format="heading-one" icon={H1} />
        <BlockButton format="heading-two" icon={H2} />
        <BlockButton format="block-quote" icon={Quote} />
        <MarkButton format="code" icon={Coding} />
      </Menu>
    </Portal>
    </Fragment>
  );
};
const Input = styled.input`
    border: none;
    background: #050b21;
    box-sizing: border-box;
    color: #FFFFFF;
    padding:6px
    font-size:16px
`;

export default ToolBar;
