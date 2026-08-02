import type { FC, ComponentProps } from "react";
import { cn } from "@/util/cn.js";
import { cva, type VariantProps } from "class-variance-authority";

const rootVariants = cva("max-w-full box-border flex", {
    variants: {
        direction: {
            row: "flex-row",
            row_reverse: "flex-row-reverse",
            col: "flex-col",
            col_reverse: "flex-col-reverse",
        },
        height: {
            full: "h-full",
            screen: "h-screen",
            auto: "h-auto",
            min: "h-min",
            max: "h-max",
            fit: "h-fit",
            "0": "h-0",
        },
        maxHeight: {
            full: "max-h-full",
            screen: "max-h-screen",
            auto: "max-h-auto",
            min: "max-h-min",
            max: "max-h-max",
            fit: "max-h-fit",
            "0": "max-h-0",
        },
        minHeight: {
            full: "min-h-full",
            screen: "min-h-screen",
            auto: "min-h-auto",
            min: "min-h-min",
            max: "min-h-max",
            fit: "min-h-fit",
            "0": "min-h-0",
        },
        overflow: {
            hidden: "overflow-hidden",
            auto: "overflow-auto",
            visible: "overflow-visible",
            scroll: "overflow-scroll",
        },
        scroll: { true: "overflow-auto", false: "" },
        scrollY: { true: "overflow-y-auto", false: "" },
        scrollX: { true: "overflow-x-auto", false: "" },
        grow: { true: "grow", false: "" },
        relative: { true: "relative", false: "" },
        bg: { none: "", "1": "bg-paper", "2": "bg-paper-2", "3": "bg-paper-3", "4": "bg-paper-4" },
    },
    defaultVariants: { direction: "col" },
});

export type RootProps = ComponentProps<"div"> & VariantProps<typeof rootVariants>;

/** Flex container. Use as the contextual root container for your layout. */
export const Root: FC<RootProps> = ({
    direction,
    grow = true,
    relative,
    height,
    maxHeight,
    minHeight,
    overflow,
    scroll,
    scrollY,
    scrollX,
    bg,
    className,
    children,
    ...restProps
}) => (
    <div
        className={cn(
            rootVariants({
                direction,
                grow,
                relative,
                height,
                maxHeight,
                minHeight,
                overflow,
                scroll,
                scrollY,
                scrollX,
                bg,
            }),
            className,
        )}
        {...restProps}
    >
        {children}
    </div>
);
