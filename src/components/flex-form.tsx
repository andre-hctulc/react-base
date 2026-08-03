"use client";

import { cn } from "@/lib/utils.js";
import { cva, type VariantProps } from "class-variance-authority";
import { sz } from "@/lib/variants.util.js";
import type { ComponentProps } from "react";

const flexFormVariants = cva("flex", {
    variants: {
        direction: {
            row: "flex-row",
            row_reverse: "flex-row-reverse",
            col: "flex-col",
            col_reverse: "flex-col-reverse",
        },
        wrap: {
            none: "flex-nowrap",
            normal: "flex-wrap",
            reverse: "flex-wrap-reverse",
        },
        gap: sz("gap"),
        rowGap: sz("row-gap"),
        colGap: sz("column-gap"),
    },
    defaultVariants: { direction: "col", gap: "md" },
});

export type FlexFormProps = ComponentProps<"form"> & VariantProps<typeof flexFormVariants>;

/** Use `formEventToFormData` or `formEventToValues` to convert form event to values. */
export const FlexForm: React.FC<FlexFormProps> = ({
    direction,
    wrap,
    gap,
    rowGap,
    colGap,
    className,
    children,
    ...restProps
}) => (
    <form
        className={cn(flexFormVariants({ direction, wrap, gap, rowGap, colGap }), className)}
        {...restProps}
    >
        {children}
    </form>
);
