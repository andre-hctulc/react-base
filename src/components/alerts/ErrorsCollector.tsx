import React from "react";
import ErrorAlert from "./ErrorAlert";
import { styleProps } from "../../util";

interface ErrorsCollectorProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    noMargin?: boolean;
}

export default function ErrorsCollector(props: ErrorsCollectorProps) {
    const hasChildren = React.Children.toArray(props.children).some(
        (child) =>
            React.isValidElement(child) &&
            (child.type === ErrorAlert ? child.props.active !== false : !!child)
    );

    if (!hasChildren) return null;

    return (
        <div {...styleProps({ className: ["space-y-2", !props.noMargin && "m-2"] }, props)}>
            {props.children}
        </div>
    );
}
