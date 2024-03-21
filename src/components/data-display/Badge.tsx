import React from "react";
import clsx from "clsx";
import type { PropsOf, StyleProps, ThemeColor } from "../../types";
import { collapse, styleProps } from "../../util";
import StaticBadge from "./StaticBadge";

interface BadgeProps extends StyleProps {
    children: React.ReactElement;
    content?: React.ReactNode;
    color?: ThemeColor;
    slotProps?: { badge?: PropsOf<typeof StaticBadge> };
    position?: { vertical?: "top" | "bottom"; horizontal?: "left" | "right" };
}

export default function Badge(props: BadgeProps) {
    const vertClasses = collapse(props.position?.vertical || "top", {
        top: "top-0 -translate-y-1/2",
        bottom: "bottom-0 translate-y-1/2",
    });
    const horClasses = collapse(props.position?.horizontal || "right", {
        left: "left-0 -translate-x-1/2",
        right: "right-0 translate-x-1/2",
    });

    return (
        <div {...styleProps({ className: "inline-block relative" }, props)}>
            {props.children}
            <StaticBadge
                variant="small"
                color={props.color}
                {...props.slotProps?.badge}
                className={clsx("absolute", vertClasses, horClasses, props.slotProps?.badge?.className)}
            >
                {props.content}
            </StaticBadge>
        </div>
    );
}
