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

import serialize from './serialize/index';
import deserialize from './deserialize/index';
import { ADD, UPDATE, DELETE } from './constant/operations';

interface Props {
  data?: any;
  onContentUpdate: (content: any) => void;
  initialData?: any;
  readOnly?: boolean;
  attributes?: any;
  element?: any;
}
const Editor: (props: Props) => any = ({ data, onContentUpdate, readOnly = false }) => {
  const [editorData, setData] = useState([]);
  const withPlugins = [withReact, withHistory, withLinks, withBlockID] as const;
  const editor: any = useMemo(() => pipe(createEditor(), ...withPlugins), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  useEffect(() => {
    const initialData = deserialize(data);
    setData(initialData);
  }, []);

  const sendContentToApp = (nodeData: any, operation: string) => {
    if (!isEmpty(nodeData)) {
      const type = nodeData.length === 1 ? 'single' : 'multi';
      const activeObject = { data: serialize(nodeData), type, operation };
      onContentUpdate(activeObject);
    }
  };

  const onChangeContent = (newData: any) => {
    const createdBlocks = differenceBy(newData, editorData, (item: Node) => item.id);
    sendContentToApp(createdBlocks, ADD);
    const deletedBlocks = differenceBy(editorData, newData, (item: Node) => item.id);
    sendContentToApp(deletedBlocks, DELETE);
    const allModifiedBlocks = differenceWith(newData, editorData, isEqual);
    const updatedBlocks = differenceBy(allModifiedBlocks, createdBlocks, (item: Node) => item.id);
    sendContentToApp(updatedBlocks, UPDATE);
    setData(newData);
  };

  return (
    <Slate editor={editor} value={editorData} onChange={(newValue: any) => onChangeContent(newValue)}>
      <ToolBar />
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} readOnly={readOnly} />
    </Slate>
  );
};

export default React.memo(Editor);
