"use client";

import React from "react";
import clsx from "clsx";
import ShortText from "@react-client/components/text/short-text";
import { PropsOf, themeColor } from "@react-client/util";
import Stack from "@react-client/components/layout/containers/stack";
import { ThemeColor } from "@react-client/types";

export type ProgressBarAppearance = { absolute?: boolean; unit?: string; showMax?: boolean; color?: ThemeColor };

interface ProgressBarProps extends ProgressBarAppearance {
    className?: string;
    style?: React.CSSProperties;
    max: number;
    progress: number;
    error?: boolean;
    slotProps?: { progressText?: PropsOf<typeof ShortText> };
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
            <ShortText variant="caption" disabled {...props.slotProps?.progressText} className={clsx("text-left min-w-[35px]", props.slotProps?.progressText)}>
                {props.absolute ? `${props.progress}${props.showMax ? `/${props.max}` : ""} ${props.unit || ""}` : `${progressPercent} ${props.unit || "%"}`}
            </ShortText>
        </Stack>
    );
});

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
