/* eslint no-underscore-dangle:off */
import * as React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createEditor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { withHistory } from 'slate-history';
import { pipe } from '@udecode/slate-plugins';
import { differenceBy, differenceWith, isEmpty, isEqual } from 'lodash';
import { ToolBar } from './ToolBar';
import { withLinks } from './Helpers/LinkHelper';
import Element from './plugins/Element';
import Leaf from './plugins/Leaf';
import withBlockID from './plugins/withBlockID';
import withBreak from './plugins/withBreak';
import serialize from './serialize/index';
import deserialize from './deserialize/index';
import { ADD, UPDATE, DELETE } from './constant/operations';
import EMPTY_NODE from './constant/emptyNode';

interface Props {
  data?: any;
  onContentUpdate: (content: any) => void;
  initialData?: any;
  readOnly?: boolean;
  attributes?: any;
  element?: any;
  placeholder?: string;
  placeholderStyles?: any;
  className?: string;
}

const Editor: (props: Props) => any = ({
  data,
  onContentUpdate,
  readOnly = false,
  placeholder = '',
  placeholderStyles = {},
  className,
}) => {
  const [editorData, setData] = useState(EMPTY_NODE);
  const withPlugins = [withReact, withHistory, withLinks, withBlockID, withBreak] as const;
  const editor: any = useMemo(() => pipe(createEditor(), ...withPlugins), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} placeholderStyles={placeholderStyles} />, []);

  useEffect(() => {
    if (data.length) {
      const initialData = deserialize(data);
      setData(initialData);
    }
  }, [data]);

  const sendContentToApp = (nodeData: any, operation: string, newNodes: any) => {
    if (!isEmpty(nodeData)) {
      const type = nodeData.length === 1 ? 'single' : 'multi';
      const activeObject = { data: serialize(nodeData), type, operation, newChildren: serialize(newNodes) };
      onContentUpdate(activeObject);
    }
  };

  const onChangeContent = (newData: any) => {
    const createdBlocks = differenceBy(newData, editorData, (item: Node) => item.id);
    if (!isEmpty(createdBlocks)) {
      sendContentToApp(createdBlocks, ADD, newData);
    }
    const deletedBlocks = differenceBy(editorData, newData, (item: Node) => item.id);
    sendContentToApp(deletedBlocks, DELETE, newData);
    const allModifiedBlocks = differenceWith(newData, editorData, isEqual);
    const updatedBlocks = differenceBy(allModifiedBlocks, createdBlocks, (item: Node) => item.id);
    sendContentToApp(updatedBlocks, UPDATE, newData);
    setData(newData);
  };

  // const handleOnnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
  //   console.log(`event`, event);
  //   console.log('editor(handleOnnKeyDown)---> ', editor);
  //   if (!event.ctrlKey && event.keyCode === 13) {
  //     if (event.shiftKey) {
  //       // "Shift+Enter" inserts a new line
  //       event.preventDefault()
  //       editor.insertNewLine(editor)
  //       return
  //     } else {
  //       const selectionParent = Node.parent(editor, editor.selection!.anchor.path)
  //       const parentString = Node.string(selectionParent)
  //       if (parentString === '' && selectionParent.type !== 'paragraph') {
  //         // "Enter" within an empty Node resets that Node to "paragraph"
  //         event.preventDefault()
  //         editor.resetToParagraph(editor)
  //         return
  //       }
  //     }
  //   }
  // }
  return (
    <Slate editor={editor} value={editorData} onChange={(newValue: any) => onChangeContent(newValue)}>
      <ToolBar />
      <Editable
        className={className}
        placeholder={placeholder}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        readOnly={readOnly}
        // onKeyDown={handleOnnKeyDown}
      />
    </Slate>
  );
};

export default React.memo(Editor);
