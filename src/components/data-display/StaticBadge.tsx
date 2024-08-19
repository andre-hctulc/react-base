import React from "react";
import type { StyleProps } from "../../types";
import { collapse } from "../../util";
import clsx from "clsx";

interface StaticBadgeProps extends StyleProps {
    children?: React.ReactNode;
    max?: number;
    variant?: "text" | "icon" | "small";
}

const StaticBadge = React.forwardRef<HTMLSpanElement, StaticBadgeProps>((props, ref) => {
    const content = (() => {
        if (props.max && typeof props.children === "number" && props.children > props.max)
            return props.max + "+";
        else return props.children;
    })();
    const variant = props.variant || "text";
    const variantClasses = collapse(variant, {
        text: "px-1 text-[16px] rounded",
        icon: "p-1.5 rounded",
        small: "p-[3.5px] text-sm rounded-sm",
    });

    return (
        <span
            ref={ref}
            style={props.style}
            className={clsx([
                "inline-flex align-middle justify-center font-medium text-13",
                props.children === undefined && "p-[2px]",
                variantClasses,
            ])}
        >
            {content}
        </span>
    );
});

StaticBadge.displayName = "StaticBadge";

export default StaticBadge;
