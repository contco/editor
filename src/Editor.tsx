/* eslint no-underscore-dangle:off */
import * as React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { withHistory } from 'slate-history';
import { pipe } from '@udecode/slate-plugins';
import { ToolBar } from './ToolBar';
import { withLinks } from './Helpers/LinkHelper';
import Element from './plugins/Element';
import Leaf from './plugins/Leaf';
import withBlockID from './plugins/withBlockID';

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
  const withPlugins = [withReact, withHistory, withLinks, withBlockID] as const;
  const editor: any = useMemo(() => pipe(createEditor(), ...withPlugins), []);
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
      const changeInBlock = lodash.differenceWith(nData, oData, lodash.isEqual);
      activeBlock.blocks = changeInBlock;
      if (activeBlock.blocks.length) activeBlock.operation = 'update';
    }
    setActiveBlock(activeBlock);
    setData(newData);
    setContent(nData);
  };

  const handKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      console.log(event);
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
