import React, { FC, SVGProps, MouseEvent } from "react";
import { useSlate, ReactEditor } from "slate-react";
import { Editor } from "slate";
import { Button, Icon } from "./Helper";


//Mark Button
interface MarkButtonProps {
    format: string;
    icon: FC<SVGProps<SVGSVGElement>>;
  }
  
  export const MarkButton: (props: MarkButtonProps) => JSX.Element = ({
    format,
    icon,
  }) => {
    const editor = useSlate();
    return (
      <Button
        reversed
        active={isMarkActive(editor, format)}
        onMouseDown={(event: MouseEvent) => {
          event.preventDefault();
          ToggleMark(editor, format);
        }}
      >
        <Icon svg={icon} />
      </Button>
    );
  };

  //Toggle Mark
export const ToggleMark = (editor: ReactEditor, format: string) => {
    
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    }
    else {
      Editor.addMark(editor, format, true);
    }
  };

//is Mark Active
  export const isMarkActive = (editor: ReactEditor, format: string) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };