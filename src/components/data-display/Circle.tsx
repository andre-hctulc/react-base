import clsx from "clsx";
import React from "react";
import type { ThemeColor } from "../../types";
import { themeColor } from "../../util";

const defaultSize = 8;

interface DotProps {
    className?: string;
    style?: React.CSSProperties;
    color?: ThemeColor;
    /** @default 8 */
    size?: number;
}

export default function Circle(props: DotProps) {
    const size = props.size || defaultSize;
    const { bg } = themeColor(props.color || "primary");
    const classes = clsx("rounded-full flex-shrink-0", bg, props.className);
    return <div className={classes} style={{ height: size, width: size, ...props.style }} />;
}
