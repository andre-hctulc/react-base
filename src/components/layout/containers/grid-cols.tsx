// * SSR

import { range } from "@client-util/iterables";
import { flattenChildren, mapChildren } from "@react-client/util";
import clsx from "clsx";
import React from "react";
import Stack from "./stack";
import {  collapse } from "@client-util/style-util";
import { Size } from "@react-client/types";

interface GridColsProps {
    className?: string;
    style?: React.CSSProperties;
    cols: number;
    children?: React.ReactNode;
    spacing?: Size;
    content?: React.ReactNode[];
    /** Kann bpsw. in Kombination mit `itemsWrapper` für _react-transition-group_ Transitions benutzt werden. */
    colsWrapper?: React.ReactElement;
    /** Kann bpsw. in Kombination mit `colsWrapper` für _react-transition-group_ Transitions benutzt werden. */
    itemsWrapper?: React.ReactElement;
    /** @default "1fr" */
    colsWidth?: string;
}

export default function GridCols(props: GridColsProps) {
    const [colGap, spaceY] = collapse(props.spacing || "none", {
        none: [0, ""],
        small: [10, "space-y-3"],
        medium: [20, "space-y-7"],
        large: [30, "space-y-10"],
    });
    const colClases = clsx("flex-grow flex-shrink-0", spaceY);
    const classes = clsx("grid", props.className);
    const cols: React.ReactNode[][] = props.content?.map(c => [c]) || [];
    const children = flattenChildren(props.children);

    children.forEach((child, i) => {
        let col = 0;

        if (props.itemsWrapper && React.isValidElement(child)) child = React.cloneElement(props.itemsWrapper, { ...props.itemsWrapper.props, children: child });

        if (i < props.cols) col = i;
        else col = i % props.cols;

        if (cols[col]) cols[col].push(child);
        else cols[col] = [child];

        col++;
    });

    return (
        <div className={classes} style={{ columnGap: colGap, ...props.style, gridTemplateColumns: `repeat(${props.cols}, ${props.colsWidth || "1fr"})` }}>
            {range(props.cols, i => {
                const colContent = props.colsWrapper ? React.cloneElement(props.colsWrapper, { ...props.colsWrapper.props, children: cols[i] }) : cols[i];

                return (
                    <Stack key={i} className={colClases}>
                        {colContent}
                    </Stack>
                );
            })}
        </div>
    );
}
