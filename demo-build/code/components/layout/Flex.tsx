import clsx from "clsx";
import React from "react";
import { alignClass, eventProps, justifyClass } from "../../util";
import type { DragEventProps, KeyboardEventProps, MouseEventProps, ParentProps, StyleProps } from "../../types";

interface FlexProps extends StyleProps, ParentProps, MouseEventProps, KeyboardEventProps, DragEventProps {
    direction?: "row" | "col";
    id?: string;
    align?: "start" | "end" | "center";
    justify?: "start" | "end" | "center";
    grow?: true | number;
    shrink?: false | number;
    minW0?: boolean;
    minH0?: boolean;
    tag?: string;
    scrollY?: boolean;
    scrollX?: boolean;
    scroll?: boolean;
    reverse?: boolean;
    draggable?: boolean;
    width?: number | string;
    height?: number | string;
    gap?: number;
    rowGap?: number;
    colGap?: number;
    wrap?: boolean;
    basis?: number;
}

const Flex = React.forwardRef<Element, FlexProps>((props, ref) => {
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
                props.scrollX && "overflow-x-auto",
                props.scrollY && "overflow-y-auto",
                props.scroll && "overflow-auto",
                props.wrap && "flex-wrap",
                align,
                justify,
                props.className
            )}
            ref={ref}
            style={{
                flexShrink: props.shrink === false ? 0 : props.shrink,
                flexGrow: props.grow === true ? 1 : props.grow,
                flexBasis: props.basis,
                height: props.height,
                with: props.width,
                columnGap: props.colGap,
                gap: props.gap,
                rowGap: props.rowGap,
                ...props.style,
            }}
            draggable={props.draggable}
            {...eventProps(props)}
        >
            {props.children}
        </Comp>
    );
});

Flex.displayName = "Stack";

export default Flex;
