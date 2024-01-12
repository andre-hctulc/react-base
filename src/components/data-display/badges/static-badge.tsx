// * SSR

import React from "react";
import clsx from "clsx";
import {  collapse } from "@client-util/style-util";
import { ThemeColor } from "@react-client/types";
import { themeColor } from "@react-client/util";

interface StaticBadgeProps {
    className?: string;
    style?: React.CSSProperties;
    color?: ThemeColor;
    children?: React.ReactNode;
    max?: number;
    variant?: "text" | "icon" | "small";
}

const StaticBadge = React.forwardRef<HTMLSpanElement, StaticBadgeProps>((props, ref) => {
    const { bg, contrastText } = themeColor(props.color || "primary");
    const content = (() => {
        if (props.max && typeof props.children === "number" && props.children > props.max) return props.max + "+";
        else return props.children;
    })();
    const variant = props.variant || "text";
    const variantClasses = collapse(variant, { text: "px-1 text-[16px] rounded", icon: "p-1.5 rounded", small: "p-[3.5px] text-sm rounded-sm" });
    const classes = clsx(
        "inline-flex align-middle justify-center font-medium text-13",
        props.children === undefined && "p-[2px]",
        contrastText,
        bg,
        variantClasses,
        props.className
    );

    return (
        <span ref={ref} style={props.style} className={classes}>
            {content}
        </span>
    );
});

StaticBadge.displayName = "StaticBadge";

export default StaticBadge;
