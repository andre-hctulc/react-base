import React from "react";
import type { ChildrenProps, EventProps, StyleProps } from "../../types";
import { eventProps } from "../../util";
import clsx from "clsx";

export interface CardProps extends ChildrenProps, StyleProps, EventProps {
    /** @default "contained" */
    variant?: "outlined" | "contained";
    tag?: string;
    border?: boolean;
    noPadding?: boolean;
    draggable?: boolean;
}

const Card = React.forwardRef<Element, CardProps>((props, ref) => {
    const isContained = props.variant !== "outlined";
    const Comp: any = props.tag || "div";

    return (
        <Comp
            onMouseLeave={props.onMouseLeave}
            onClick={props.onClick}
            ref={ref}
            style={props.style}
            className={clsx(
                "flex box-border rounded flex-col overflow-y-auto",
                !props.noPadding && "p-2",
                isContained ? "bg-bg-paper" : "border bg-bg",
                props.border && "border",
                props.border === false && "border-none",
                props.className
            )}
            {...eventProps(props)}
            draggable={props.draggable}
        >
            {props.children}
        </Comp>
    );
});

Card.displayName = "DefaultCard";

export default Card;
