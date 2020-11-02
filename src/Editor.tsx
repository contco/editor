import React, { useCallback, useMemo, ReactNode} from "react";
import { createEditor } from "slate";
import {
  Slate,
  Editable,
  withReact,
} from "slate-react";

import ToolBar from "./ToolBar";
import { withLinks } from "./LinkHelper";
import {Element, Leaf} from './plugins/Mark';
import { withHistory } from 'slate-history'


interface Props {
  data?: any;
  setContent: (content: any) => void;
  initialData?: any;
  readOnly?: boolean;
  attributes?: any;
  children?: ReactNode;
  element?: any;
}
const Editor: (props: Props) => any = ({ data, setContent, readOnly }) => {
  const editor = useMemo(() => withLinks(withHistory(withReact(createEditor()))), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <Slate
      editor={editor}
      value={data}
      onChange={(newValue: any) => setContent(newValue)}
    >
      <ToolBar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        readOnly={readOnly ? true : false}

      />
    </Slate>
  );
};

export default React.memo(Editor);
