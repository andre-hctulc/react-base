"use client";

import React from "react";
import { LinkComponentProps, ParentProps, StyleProps } from "../../../types";
import ListItem from "../../data-display/list/ListItem";
import ChevronRightIcon from "../../icons/collection/ChevronRight";
import TreeView, { TreeViewStruct } from "./TreeView";
import { hasChildren } from "../../../util";
import Fade from "../../transitions/Fade";

interface TreeViewItemProps extends StyleProps, ParentProps {
    text: string;
    from?: TreeViewStruct;
    href?: string;
    onClick?: React.MouseEventHandler;
    linkComponent?: React.ComponentType<LinkComponentProps>;
    depth?: number;
}

export default function TreeViewItem(props: TreeViewItemProps) {
    const [open, setOpen] = React.useState(false);
    const _hasChildren = hasChildren(props.children) || (props.from && !!Object.keys(props.from).length);
    const depth = Math.max(0, props.depth || 0);

    return (
        <>
            <ListItem
                iconSize={15}
                href={props.href}
                className={props.className}
                style={{ paddingLeft: depth * 15, ...props.style }}
                onClick={e => {
                    e.stopPropagation();
                    props.onClick?.(e);
                }}
                hoverEffect
                icon={_hasChildren ? <ChevronRightIcon onClick={() => setOpen(!open)} className="cursor-pointer" rotate={open ? 90 : 0} /> : null}
            >
                {props.text}
            </ListItem>
            <Fade in={_hasChildren && open}>
                <li>
                    <TreeView depth={depth + 1} from={props.from}>
                        {props.children}
                    </TreeView>
                </li>
            </Fade>
        </>
    );
}
