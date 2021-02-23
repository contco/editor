import React, { FC, SVGProps, MouseEvent } from 'react';
import { useSlate, ReactEditor } from 'slate-react';
import { Editor, Transforms } from 'slate';
import { Button, Icon } from './Helper';
import { isMarkActive } from './MarkHelper';

const markFormats = ['bold', 'italic', 'underlined', 'link', 'code'];

// is Block Active
const isBlockActive = (editor: ReactEditor, format: string) => {
  const [match]: any = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });
  return !!match;
};

// Toggle Block
export const ToggleBlock = (editor: ReactEditor, format: string) => {
  const isBActive = isBlockActive(editor, format);
  const selectedFormats = markFormats.filter((a) => isMarkActive(editor, a));

  if (format === 'clear-format') {
    Transforms.setNodes(editor, {
      type: 'paragraph',
    });
    selectedFormats.map((a) => Editor.removeMark(editor, a));
  } else {
    Transforms.setNodes(editor, {
      type: isBActive ? 'paragraph' : format,
    });
  }
};

// Block Button
interface BLockButtonProps {
  format: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  iconColor?: string;
}

export const BlockButton: (props: BLockButtonProps) => JSX.Element = ({ format, icon, iconColor = '#ffffff' }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault();
        ToggleBlock(editor, format);
      }}
    >
      <Icon active={isBlockActive(editor, format)} svg={icon} color={iconColor} />
    </Button>
  );
};
