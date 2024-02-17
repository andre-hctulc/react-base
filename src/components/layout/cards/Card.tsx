import clsx from "clsx";
import React from "react";
import type { DragEventProps, MouseEventProps, ParentProps, StyleProps } from "../../../types";
import { eventProps } from "../../../util";

export interface CardProps extends ParentProps, StyleProps, DragEventProps, MouseEventProps {
    /** @default "contained" */
    variant?: "outlined" | "contained";
    shadow?: boolean;
    tag?: string;
    border?: boolean;
    noPadding?: boolean;
}

const Card = React.forwardRef<Element, CardProps>((props, ref) => {
    const isContained = props.variant !== "outlined";
    const Comp: any = props.tag || "div";

    return (
        <Comp
            onMouseLeave={props.onMouseLeave}
            onClick={props.onClick}
            ref={ref}
            className={clsx(
                "flex box-border rounded flex-col overflow-y-auto",
                !props.noPadding && "p-2",
                isContained ? "bg-bg-paper" : "border bg-bg",
                props.shadow ? "shadow-md" : "shadow-none",
                props.border && "border",
                props.border === false && "border-none",
                props.className
            )}
            style={props.style}
            {...eventProps(props)}
            draggable={props.draggable}
        >
            {props.children}
        </Comp>
    );
});

Card.displayName = "DefaultCard";

export default Card;
