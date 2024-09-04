import React from "react";
import { alignClass, eventProps, justifyClass } from "../../util";
import type { Align, ChildrenProps, EventProps, StyleProps } from "../../types";
import clsx from "clsx";

interface FlexProps extends StyleProps, ChildrenProps, EventProps {
    direction?: "row" | "col";
    id?: string;
    align?: Align;
    justify?: Align;
    grow?: boolean | number;
    shrink?: boolean | number;
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
    gap?: number | string;
    rowGap?: number | string;
    colGap?: number | string;
    wrap?: boolean;
    basis?: number;
    inline?: boolean;
}

const Flex = React.forwardRef<Element, FlexProps>((props, ref) => {
    const align = props.align && alignClass(props.align);
    const justify = props.justify && justifyClass(props.justify);
    const Comp: any = props.tag || "div";

    return (
        <Comp
            id={props.id}
            style={{
                flexShrink: props.shrink === false ? 0 : props.shrink === true ? 1 : props.shrink,
                flexGrow: props.grow === true ? 1 : props.grow === false ? 0 : props.grow,
                flexBasis: props.basis,
                height: props.height,
                width: props.width,
                columnGap: props.colGap,
                gap: props.gap,
                rowGap: props.rowGap,
                ...props.style,
            }}
            className={clsx([
                props.inline ? "inline-flex" : "flex",
                props.direction === "row"
                    ? props.reverse
                        ? "flex-row-reverse"
                        : "flex-row"
                    : props.reverse
                    ? "flex-col-reverse"
                    : "flex-col",
                props.grow && "flex-grow",
                props.minH0 && "min-h-0",
                props.minW0 && "min-w-0",
                props.scrollX && "overflow-x-auto",
                props.scrollY && "overflow-y-auto",
                props.scroll && "overflow-auto",
                props.wrap && "flex-wrap",
                align,
                justify,
                props.className,
            ])}
            ref={ref}
            draggable={props.draggable}
            {...eventProps(props)}
        >
            {props.children}
        </Comp>
    );
});

Flex.displayName = "Stack";

export default Flex;
