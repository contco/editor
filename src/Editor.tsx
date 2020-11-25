/* eslint no-underscore-dangle:off */
import * as React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createEditor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { withHistory } from 'slate-history';
import { ToolBar } from './ToolBar';
import { withLinks } from './Helpers/LinkHelper';
import Element from './plugins/Element';
import Leaf from './plugins/Leaf';

import serialize from './serialize/index';
import deserialize from './deserialize/index';

const lodash = require('lodash');

interface Props {
  data?: any;
  setContent: (content: any) => void;
  setActiveBlock: (active: any) => void;
  initialData?: any;
  readOnly?: boolean;
  attributes?: any;
  element?: any;
}
const Editor: (props: Props) => any = ({ data, setContent, setActiveBlock, readOnly = false }) => {
  const [editorData, setData] = useState([]);
  const editor = useMemo(() => withLinks(withHistory(withReact(createEditor()))), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  useEffect(() => {
    const initialData = deserialize(data);
    setData(initialData);
  }, []);

  const onChangeContent = (newData: any) => {
    const activeBlock: any = {};
    const nData = [...serialize(newData)];
    const oData = [...serialize(editorData)];

    // add
    if (nData.length > oData.length) {
      const createdBlock = lodash.differenceWith(nData, oData, lodash.isEqual);
      activeBlock.blocks = createdBlock;
      activeBlock.operation = 'add';
    }
    // delete
    else if (nData.length < oData.length) {
      const deletedBlock = lodash.differenceWith(oData, nData, lodash.isEqual);
      activeBlock.blocks = deletedBlock;
      activeBlock.operation = 'delete';
    }
    // update
    else {
      for (let i = 0; i < nData.length; i += 1) {
        for (let j = 0; j < oData.length; j += 1) {
          if (nData[i].block._id === oData[j].block._id) {
            if (JSON.stringify(nData[i]) !== JSON.stringify(oData[j])) {
              activeBlock.blocks = [nData[i]];
              activeBlock.operation = 'update';
            }
          }
        }
      }
    }
    setActiveBlock(activeBlock);
    setData(newData);
    setContent(nData);
  };

  const handKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      Transforms.insertNodes(editor, {
        type: 'paragraph',
        children: [{ text: '' }],
      });
    }
  };

  return (
    <Slate editor={editor} value={editorData} onChange={(newValue: any) => onChangeContent(newValue)}>
      <ToolBar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => handKeyDown(event)}
        readOnly={readOnly}
      />
    </Slate>
  );
};

export default React.memo(Editor);
