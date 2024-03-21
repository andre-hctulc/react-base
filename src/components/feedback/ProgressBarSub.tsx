"use client";

import React from "react";
import type { StyleProps } from "../../types";
import { styleProps } from "../../util";

interface ProgressBarSubProps extends StyleProps {
    /** _0 < portion < 1_ */
    portion: number;
    transparent?: boolean;
}

export default function ProgressBarSub(props: ProgressBarSubProps) {
    const percantage = React.useMemo(() => Math.round(props.portion * 100) / 100, [props.portion]);
    return (
        <div
            {...styleProps(
                {
                    className: ["h-full flex-shrink-0", props.transparent && "bg-opacity-60"],
                    style: { width: `${percantage}%` },
                },
                props
            )}
        />
    );
}
