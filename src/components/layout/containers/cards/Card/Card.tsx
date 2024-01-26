// * SSR

import clsx from "clsx";
import React from "react";

export interface CardProps {
    /** @default "contained" */
    variant?: "outlined" | "contained";
    children?: React.ReactNode;
    className?: string;
    shadow?: boolean;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<Element>;
    onMouseLeave?: React.MouseEventHandler<Element>;
    tag?: string;
    /** @default variant === "outlined" */
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
                "flex rounded flex-col overflow-y-auto",
                !props.noPadding && "p-2",
                isContained ? "bg-bg-paper" : "border bg-bg",
                props.shadow ? "shadow-md" : "shadow-none",
                props.border && "border",
                props.border === false && "border-none",
                props.className
            )}
            style={props.style}
        >
            {props.children}
        </Comp>
    );
});

Card.displayName = "DefaultCard";

export default Card;
