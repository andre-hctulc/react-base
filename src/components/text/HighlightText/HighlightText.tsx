// * SSR

import React from "react";
import Typography from "../Typography/Typography";
import clsx from "clsx";

interface HighlightTextProps {
    className?: string;
    style?: React.CSSProperties;
    large?: boolean;
    children?: React.ReactNode;
    letterSpacing?: boolean;
    /** @default true */
    center?: boolean;
    onClick?: React.MouseEventHandler;
}

export default function HighlightText(props: HighlightTextProps) {
    const classes = clsx(
        "rounded bg-bg-dark",
        props.large ? "text-xl px-4 py-2" : "text-md px-2 py-1",
        props.onClick && "cursor-pointer active:text-secondary",
        props.letterSpacing && "tracking-widest",
        props.className
    );

    return (
        <Typography onClick={props.onClick} center={props.center === undefined ? true : props.center} tag="span" className={classes} style={props.style}>
            {props.children}
        </Typography>
    );
}
