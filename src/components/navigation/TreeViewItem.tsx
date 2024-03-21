"use client";

import React from "react";
import type { LinkProps, ParentProps, StyleProps } from "../../types";
import ListItem from "../layout/ListItem";
import ChevronRightIcon from "../icons/collection/ChevronRight";
import TreeView, { TreeViewStruct } from "./TreeView";
import { hasChildren } from "../../util";
import Fade from "../transitions/Fade";

interface TreeViewItemProps extends StyleProps, ParentProps {
    text: string;
    from?: TreeViewStruct;
    href?: string;
    onClick?: React.MouseEventHandler;
    linkComponent?: React.ComponentType<LinkProps>;
    depth?: number;
    active?: boolean;
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
                onClick={(e) => {
                    e.stopPropagation();
                    props.onClick?.(e);
                }}
                hoverEffect={!!props.onClick || !!props.href}
                icon={
                    _hasChildren ? (
                        <ChevronRightIcon
                            color="text_secondary"
                            onClick={() => setOpen(!open)}
                            className="cursor-pointer"
                            rotate={open ? 90 : 0}
                        />
                    ) : null
                }
                active={props.active}
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
