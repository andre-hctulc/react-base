"use client";

import React from "react";
import clsx from "clsx";
import { ThemeColor, PropsOf } from "../../../types";
import { themeColor } from "../../../util";
import Stack from "../../layout/Stack";
import Typography from "../../text/Typography";

export type ProgressBarAppearance = { absolute?: boolean; unit?: string; showMax?: boolean; color?: ThemeColor };

interface ProgressBarProps extends ProgressBarAppearance {
    className?: string;
    style?: React.CSSProperties;
    max: number;
    progress: number;
    error?: boolean;
    slotProps?: { progressText?: PropsOf<typeof Typography> };
}

const progressHeight = 13;

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>((props, ref) => {
    const { bg, bgSuperLight } = themeColor(props.color || (props.error ? "error" : "info"));
    const progressPercent = React.useMemo(() => {
        if (props.max <= 0) return 100;
        const perc = (props.progress / props.max) * 100;
        return Math.round(perc * 100) / 100;
    }, [props.progress, props.max]);

    return (
        <Stack direction="row" align="center" className={clsx("space-x-1.5", props.className)} style={props.style}>
            <div className="flex-grow">
                <div
                    className={clsx("transition duration-100 w-full border border-bg-dark rounded-full overflow-hidden", bgSuperLight, props.className)}
                    style={{ height: progressHeight }}
                >
                    <div className={clsx("transition duration-70 rounded-full h-full max-h-full max-w-full", bg)} style={{ width: `${progressPercent}%` }} />
                </div>
            </div>
            <Typography truncate variant="caption" disabled {...props.slotProps?.progressText} className={clsx("text-left min-w-[35px]", props.slotProps?.progressText)}>
                {props.absolute ? `${props.progress}${props.showMax ? `/${props.max}` : ""} ${props.unit || ""}` : `${progressPercent} ${props.unit || "%"}`}
            </Typography>
        </Stack>
    );
});

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
