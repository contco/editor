import { ReactEditor } from 'slate-react';

const withImages = (editor: ReactEditor) => {
  const { isVoid } = editor;
  const localEditor = editor;
  localEditor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element);
  };
  return localEditor;
};
export default withImages;
