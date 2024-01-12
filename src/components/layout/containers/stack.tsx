// * SSR

import { alignClass, justifyClass } from "@react-client/util";
import clsx from "clsx";
import React from "react";

interface StackProps {
    direction?: "row" | "col";
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    align?: "start" | "end" | "center";
    justify?: "start" | "end" | "center";
    grow?: boolean;
    minW0?: boolean;
    minH0?: boolean;
    noShrink?: boolean;
    tag?: string;
    scrollY?: boolean;
    scrollX?: boolean;
    reverse?: boolean;
    draggable?: boolean;
    // Events
    onClick?: React.MouseEventHandler;
    onMouseDown?: React.MouseEventHandler;
    onTouchStart?: React.TouchEventHandler;
    onDragStart?: React.DragEventHandler;
    onDragOver?: React.DragEventHandler;
    onDragLeave?: React.DragEventHandler;
    onDrop?: React.DragEventHandler;
}

const Stack = React.forwardRef<Element, StackProps>((props, ref) => {
    const align = props.align && alignClass(props.align);
    const justify = props.justify && justifyClass(props.justify);
    const Comp: any = props.tag || "div";

    return (
        <Comp
            id={props.id}
            className={clsx(
                "flex",
                props.direction === "row" ? (props.reverse ? "flex-row-reverse" : "flex-row") : props.reverse ? "flex-col-reverse" : "flex-col",
                props.grow && "flex-grow",
                props.minH0 && "min-h-0",
                props.minW0 && "min-w-0",
                props.noShrink && "flex-shrink-0",
                props.scrollX && "overflow-x-auto",
                props.scrollY && "overflow-y-auto",
                align,
                justify,
                props.className
            )}
            onClick={props.onClick}
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            ref={ref}
            style={props.style}
            draggable={props.draggable}
            onDragStart={props.onDragStart}
            onDragOver={props.onDragOver}
            onDragLeave={props.onDragLeave}
            onDrop={props.onDrop}
        >
            {props.children}
        </Comp>
    );
});

Stack.displayName = "Stack";

export default Stack;
