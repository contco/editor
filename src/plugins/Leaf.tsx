import * as React from "react";
import { RenderLeafProps } from "slate-react";
import {Code} from './LeafStyle';

export const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <Code>{children}</Code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }
    if (leaf.underlined) {
        children = <u>{children}</u>;
    }
    return <span {...attributes}>{children}</span>;
};