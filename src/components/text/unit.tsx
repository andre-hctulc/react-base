// * SSR

import React from "react";
import clsx from "clsx";

interface UnitProps {
    className?: string;
    style?: React.CSSProperties;
    children: string;
}

export default function Unit(props: UnitProps) {
    const classes = clsx("text-sm text-text-disabled", props.className);

    return (
        <span className={classes} style={props.style}>
            {props.children}
        </span>
    );
}
