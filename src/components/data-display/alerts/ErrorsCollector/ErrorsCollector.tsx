// * SSR

import React from "react";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import clsx from "clsx";

interface ErrorsCollectorProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    noMargin?: boolean;
}

export default function ErrorsCollector(props: ErrorsCollectorProps) {
    const classes = clsx("space-y-2", !props.noMargin && "m-2", props.className);
    const hasChildren = React.Children.toArray(props.children).some(
        child => React.isValidElement(child) && (child.type === ErrorAlert ? child.props.active !== false : !!child)
    );

    if (!hasChildren) return null;

    return (
        <div className={classes} style={props.style}>
            {props.children}
        </div>
    );
}
