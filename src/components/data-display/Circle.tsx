import React from "react";
import type { StyleProps } from "../../types";

const defaultSize = 8;

interface CircleProps extends StyleProps {
    /** @default 8 */
    size?: number;
}

export default function Circle(props: CircleProps) {
    const size = props.size || defaultSize;
    return (
        <div className="rounded-full flex-shrink-0" style={{ height: size, width: size, ...props.style }} />
    );
}
