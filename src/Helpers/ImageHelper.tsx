import React, { FC, SVGProps } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

import { Button, Icon } from './Helper';

export const insertImage = (editor: ReactEditor, url: string) => {
  const text = { text: '' };
  const image = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};

interface InsertImageButtonProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  iconColor?: string;
}
export const InsertImageButton: (props: InsertImageButtonProps) => JSX.Element = ({ icon, iconColor = '#ffffff' }) => {
  const editor = useSlate();
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the image:');
        if (!url) return;
        insertImage(editor, url);
      }}
    >
      <Icon reversed active={false} svg={icon} color={iconColor}>
        image
      </Icon>
    </Button>
  );
};
