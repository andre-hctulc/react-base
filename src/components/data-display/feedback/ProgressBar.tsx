"use client";

import React from "react";
import clsx from "clsx";
import type { ThemeColor, PropsOf } from "../../../types";
import { themeColor } from "../../../util";
import Flex from "../../layout/Flex";
import Typography from "../../text/Typography";

export type ProgressBarAppearance = { absolute?: boolean; unit?: string; showMax?: boolean; color?: ThemeColor };

interface ProgressBarProps extends ProgressBarAppearance {
    className?: string;
    style?: React.CSSProperties;
    max: number;
    progress: number;
    error?: boolean;
    slotProps?: { progressText?: PropsOf<typeof Typography> };
    progressText?: (progress: number, max: number) => React.ReactNode;
    children?: React.ReactNode;
}

const progressHeight = 13;

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>((props, ref) => {
    const { bg, bgSuperLight } = themeColor(props.color || (props.error ? "error" : "info"));
    const progressPercent = React.useMemo(() => {
        if (props.max <= 0) return 100;
        const perc = (props.progress / props.max) * 100;
        return Math.round(perc * 100) / 100;
    }, [props.progress, props.max]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const progText = React.useMemo(() => (props.progressText ? props.progressText(props.progress, props.max) : undefined), [props.progress, props.max]);

    return (
        <Flex ref={ref} direction="col" className={clsx("space-x-1.5", props.className)} style={props.style}>
            <div className="flex-grow">
                <div
                    className={clsx("transition duration-100 w-full border border-bg-dark rounded-full overflow-hidden", bgSuperLight, props.className)}
                    style={{ height: progressHeight }}
                >
                    <div className={clsx("transition-all duration-75 rounded-full h-full max-h-full max-w-full", bg)} style={{ width: `${progressPercent}%` }} />
                    {props.children}
                </div>
            </div>
            <Typography truncate textAlign={"right"} variant="caption" disabled {...props.slotProps?.progressText} className={clsx("", props.slotProps?.progressText)}>
                {progText !== undefined
                    ? progText
                    : props.absolute
                    ? `${props.progress}${props.showMax ? `/${props.max}` : ""} ${props.unit || ""}`
                    : `${progressPercent} ${props.unit || "%"}`}
            </Typography>
        </Flex>
    );
});

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
