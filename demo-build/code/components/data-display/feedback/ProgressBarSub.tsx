"use client";

import clsx from "clsx";
import React from "react";
import type { StyleProps } from "../../../types";

interface ProgressBarSubProps extends StyleProps {
    /** _0 < portion < 1_ */
    portion: number;
    transparent?: boolean;
}

export default function ProgressBarSub(props: ProgressBarSubProps) {
    const percantage = React.useMemo(() => Math.round(props.portion * 100) / 100, [props.portion]);
    return <div style={{ ...props.style, width: `${percantage}%` }} className={clsx("h-full flex-shrink-0", props.transparent && "bg-opacity-60", props.className)} />;
}
