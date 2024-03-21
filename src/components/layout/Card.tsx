import React from "react";
import type { DragEventProps, MouseEventProps, ParentProps, Size, StyleProps } from "../../types";
import { collapse, eventProps, styleProps } from "../../util";

export interface CardProps extends ParentProps, StyleProps, DragEventProps, MouseEventProps {
    /** @default "contained" */
    variant?: "outlined" | "contained";
    shadow?: "none" | Size;
    tag?: string;
    border?: boolean;
    noPadding?: boolean;
}

const Card = React.forwardRef<Element, CardProps>((props, ref) => {
    const isContained = props.variant !== "outlined";
    const Comp: any = props.tag || "div";
    const shadow = collapse(props.shadow || "none", {
        small: "shadow-sm",
        medium: "shadow-md",
        large: "shadow-lg",
        none: "",
    });

    return (
        <Comp
            onMouseLeave={props.onMouseLeave}
            onClick={props.onClick}
            ref={ref}
            {...styleProps(
                {
                    className: [
                        "flex box-border rounded flex-col overflow-y-auto",
                        !props.noPadding && "p-2",
                        isContained ? "bg-bg-paper" : "border bg-bg",
                        shadow,
                        props.border && "border",
                        props.border === false && "border-none",
                    ],
                },
                props
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
