// * SSR

import type { PropsOf } from "@react-client/types";
import React from "react";
import StaticBadge from "./static-badge";
import clsx from "clsx";
import { ThemeColor } from "@react-client/types";
import { collapse } from "@client-util/helpers";

interface BadgeProps {
    children: React.ReactElement;
    content?: React.ReactNode;
    color?: ThemeColor;
    slotProps?: { badge?: PropsOf<typeof StaticBadge> };
    className?: string;
    style?: React.CSSProperties;
    position?: { vertical?: "top" | "bottom"; horizontal?: "left" | "right" };
}

export default function Badge(props: BadgeProps) {
    const vertClasses = collapse(props.position?.vertical || "top", { top: "top-0 -translate-y-1/2", bottom: "bottom-0 translate-y-1/2" });
    const horClasses = collapse(props.position?.horizontal || "right", { left: "left-0 -translate-x-1/2", right: "right-0 translate-x-1/2" });
    const badgeClasses = clsx("absolute", vertClasses, horClasses, props.slotProps?.badge?.className);

    return (
        <div className={props.className} style={props.style}>
            {props.children}
            <StaticBadge variant="small" color={props.color} {...props.slotProps?.badge} className={badgeClasses}>
                {props.content}
            </StaticBadge>
        </div>
    );
}