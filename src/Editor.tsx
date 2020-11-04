import React, { useCallback, useMemo, ReactNode, Fragment} from "react";
import { createEditor } from "slate";
import {
  Slate,
  Editable,
  withReact,
} from "slate-react";

import { ToolBar } from "./ToolBar";
import { withLinks } from "./Helpers/LinkHelper";
import {Element } from './plugins/Element';
import {Leaf} from './plugins/Leaf';
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
const Editor: (props: Props) => any = ({ data, setContent, readOnly = false }) => {
  const editor = useMemo(() => withLinks(withHistory(withReact(createEditor()))), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <Fragment>
    <Slate
      editor={editor}
      value={data}
      onChange={(newValue: any) => setContent(newValue)}
    >
      <ToolBar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        readOnly={readOnly}
  
      />
    </Slate>
    </Fragment>

  );
};

export default React.memo(Editor);
