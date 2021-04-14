import { Transforms } from 'slate';

const withBreak = (editor: any) => {
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
