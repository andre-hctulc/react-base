import clsx from "clsx";
import React from "react";
import { alignClass, eventProps, justifyClass } from "../../util";
import { DragEventProps, KeyboardEventProps, MouseEventProps, ParentProps, StyleProps } from "../../types";

interface StackProps extends StyleProps, ParentProps, MouseEventProps, KeyboardEventProps, DragEventProps {
    direction?: "row" | "col";
    id?: string;
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
    width?: number | string;
    height?: number | string;
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
            ref={ref}
            style={{ height: props.height, with: props.width, ...props.style }}
            draggable={props.draggable}
            {...eventProps(props)}
        >
            {props.children}
        </Comp>
    );
});

Stack.displayName = "Stack";

export default Stack;
