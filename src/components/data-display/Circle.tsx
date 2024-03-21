import React from "react";
import type { StyleProps, ThemeColor } from "../../types";
import { styleProps, themeColor } from "../../util";

const defaultSize = 8;

interface DotProps extends StyleProps {
    color?: ThemeColor;
    /** @default 8 */
    size?: number;
}

export default function Circle(props: DotProps) {
    const size = props.size || defaultSize;
    const { bg } = themeColor(props.color || "primary");
    return (
        <div
            {...styleProps(
                { className: ["rounded-full flex-shrink-0", bg], style: { height: size, width: size } },
                props
            )}
        />
    );
}
