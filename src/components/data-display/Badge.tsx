import React from "react";
import clsx from "clsx";
import type { PropsOf, StyleProps } from "../../types";
import { collapse } from "../../util";
import StaticBadge from "./StaticBadge";

interface BadgeProps extends StyleProps {
    children: React.ReactElement;
    content?: React.ReactNode;
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
        <div className={clsx("inline-block relative", props.className)} style={props.style}>
            {props.children}
            <StaticBadge
                variant="small"
                {...props.slotProps?.badge}
                className={clsx("absolute", vertClasses, horClasses, props.slotProps?.badge?.className)}
            >
                {props.content}
            </StaticBadge>
        </div>
    );
}
