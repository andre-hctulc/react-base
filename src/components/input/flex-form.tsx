"use client";

import { cn } from "@/util/cn.js";
import { collapse } from "@dre44/util/objects";
import type { PropsOf } from "../../types/index.js";
import { flexDirection, flexWrap, withGap, type FlexDirection, type FlexWrap } from "../../util/style.js";

type GapSize = keyof typeof withGap.gap;

export type FlexFormProps = PropsOf<"form"> & {
    direction?: FlexDirection;
    wrap?: FlexWrap;
    gap?: GapSize;
    rowGap?: GapSize;
    colGap?: GapSize;
};

/** Use `formEventToFormData` or `formEventToValues` to convert form event to values. */
export const FlexForm: React.FC<FlexFormProps> = ({
    direction = "col",
    wrap,
    gap = "md",
    rowGap,
    colGap,
    className,
    children,
    ...restProps
}) => (
    <form
        className={cn(
            "flex",
            collapse(flexDirection, direction),
            wrap && collapse(flexWrap, wrap!),
            collapse(withGap.gap, gap),
            rowGap && collapse(withGap.rowGap, rowGap),
            colGap && collapse(withGap.colGap, colGap),
            className,
        )}
        {...restProps}
    >
        {children}
    </form>
);
