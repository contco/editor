import * as React from 'react';
import { RenderLeafProps } from 'slate-react';
import Code from './LeafStyle';

const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  let child = children;
  if (leaf.bold) {
    child = <strong>{child}</strong>;
  }
  if (leaf.code) {
    child = <Code>{child}</Code>;
  }

  if (leaf.italic) {
    child = <em>{child}</em>;
  }
  if (leaf.underlined) {
    child = <u>{child}</u>;
  }
  return <span {...attributes}>{child}</span>;
};
export default Leaf;
