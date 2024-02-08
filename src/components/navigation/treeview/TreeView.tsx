import React from "react";
import { ParentProps, PartialPropsOf, StyleProps } from "../../../types";
import List from "../../data-display/list/List";
import TreeViewItem from "./TreeViewItem";

export type TreeViewStruct = Record<string, { props?: PartialPropsOf<typeof TreeViewItem>; children?: TreeViewStruct }>;

interface TreeViewProps extends StyleProps, ParentProps {
    from?: TreeViewStruct;
    depth?: number;
}

export default function TreeView(props: TreeViewProps) {
    return (
        <List className={props.className} style={props.style}>
            {props.children}
            {props.from &&
                Object.entries(props.from).map(([key, value]) => {
                    return <TreeViewItem depth={props.depth} key={key} {...value.props} text={value.props?.text || key} from={value.children} />;
                })}
        </List>
    );
}
