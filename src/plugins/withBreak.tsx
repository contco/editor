import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

const withBreak = (editor: ReactEditor) => {
  const localEditor = editor;
  localEditor.insertBreak = () => {
    const newLine = {
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    };
    Transforms.insertNodes(editor, newLine);
  };
  return localEditor;
};
export default withBreak;
