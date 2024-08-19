"use client";

import React from "react";
import type { ChildrenProps, StyleProps } from "../../types";
import ListItem from "../layout/ListItem";
import ChevronRightIcon from "../icons/collection/ChevronRight";
import TreeView from "./TreeView";
import { hasChildren } from "../../util";

interface TreeViewItemProps extends StyleProps, ChildrenProps {
    text: string;
    href?: string;
    onClick?: React.MouseEventHandler;
    depth?: number;
    active?: boolean;
}

export default function TreeViewItem(props: TreeViewItemProps) {
    const [open, setOpen] = React.useState(false);
    const _hasChildren = hasChildren(props.children);
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
            <li>
                <TreeView depth={depth + 1}>{props.children}</TreeView>
            </li>
        </>
    );
}
