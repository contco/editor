import React, { FC, SVGProps, MouseEvent } from "react";
import { useSlate, ReactEditor } from "slate-react";
import { Editor, Transforms } from "slate";
import { Button, Icon } from "./Helper";


//Block Button
interface BLockButtonProps {
  format: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

export const BlockButton: (props: BLockButtonProps) => JSX.Element = ({
  format,
  icon,
}) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault();
        ToggleBlock(editor, format);
      }}
    >
      <Icon svg={icon} />
    </Button>
  );
};
//Toggle Block
export const ToggleBlock = (editor: ReactEditor, format: string) => {
  const isActive = isBlockActive(editor, format);

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : format,
  });
};
//is Block Active
const isBlockActive = (editor: ReactEditor, format: string) => {
  const [match]: any = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });
  return !!match;
};