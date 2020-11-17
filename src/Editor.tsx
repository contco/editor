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

interface Props {
  data?: any;
  setContent: (content: any) => void;
  initialData?: any;
  readOnly?: boolean;
  attributes?: any;
  element?: any;
}
const Editor: (props: Props) => any = ({ data, setContent, readOnly = false }) => {
  const [editorData, setData] = useState([]);
  const editor = useMemo(() => withLinks(withHistory(withReact(createEditor()))), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  useEffect(() => {
    const initialData = deserialize(data);
    setData(initialData);
  }, []);

  const onChangeContent = (newData: any) => {
    setData(newData);
    setContent(serialize(newData));
  };

  return (
    <Slate editor={editor} value={editorData} onChange={(newValue: any) => onChangeContent(newValue)}>
      <ToolBar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            Transforms.insertNodes(editor, {
              type: 'paragraph',
              children: [{ text: '' }],
            });
          }
        }}
        readOnly={readOnly}
      />
    </Slate>
  );
};

export default React.memo(Editor);
