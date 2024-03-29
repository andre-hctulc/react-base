import clsx from "clsx";
import React from "react";
import { collapse, flattenChildren, styleProps } from "../../util";
import Flex from "./Flex";
import type { Size, StyleProps } from "../../types";

interface GridColsProps extends StyleProps {
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
    const [colGap, spaceY] = collapse(
        props.spacing || "none",
        {
            none: [0, ""],
            small: [10, "space-y-3"],
            medium: [20, "space-y-7"],
            large: [30, "space-y-10"],
        },
        []
    );
    const colClases = clsx("flex-grow flex-shrink-0", spaceY);
    const cols: React.ReactNode[][] = props.content?.map((c) => [c]) || [];
    const children = flattenChildren(props.children);

    children.forEach((child, i) => {
        let col = 0;

        if (props.itemsWrapper && React.isValidElement(child))
            child = React.cloneElement(props.itemsWrapper, { ...props.itemsWrapper.props, children: child });

        if (i < props.cols) col = i;
        else col = i % props.cols;

        if (cols[col]) cols[col].push(child);
        else cols[col] = [child];

        col++;
    });

    return (
        <div
            {...styleProps(
                {
                    className: "grid",
                    style: {
                        columnGap: colGap,
                        gridTemplateColumns: `repeat(${props.cols}, ${props.colsWidth || "1fr"})`,
                    },
                },
                props
            )}
        >
            {Array.from({ length: props.cols }, (_, i) => {
                const colContent = props.colsWrapper
                    ? React.cloneElement(props.colsWrapper, { ...props.colsWrapper.props, children: cols[i] })
                    : cols[i];

                return (
                    <Flex key={i} className={colClases}>
                        {colContent}
                    </Flex>
                );
            })}
        </div>
    );
}
