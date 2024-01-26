import { ThemeColor } from "@react-client/types";
import { themeColor } from "@react-client/util";
import clsx from "clsx";
import React from "react";

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
