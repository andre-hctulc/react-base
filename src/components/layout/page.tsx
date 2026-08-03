import { type FC, type ComponentProps } from "react";
import { cn } from "@/util/cn.util.js";
import { cva, type VariantProps } from "class-variance-authority";

const pageVariants = cva("box-border w-full min-h-0", {
    variants: {
        width: {
            xs: "max-w-xl mx-auto",
            sm: "max-w-2xl mx-auto",
            md: "max-w-3xl mx-auto",
            lg: "max-w-4xl mx-auto",
            xl: "max-w-5xl mx-auto",
            "2xl": "max-w-6xl mx-auto",
            "3xl": "max-w-7xl mx-auto",
            "4xl": "max-w-8xl mx-auto",
            "5xl": "max-w-8xl mx-auto",
            "6xl": "max-w-8xl mx-auto",
            "7xl": "max-w-8xl mx-auto",
            full: "w-full",
        },
        bg: { none: "", "1": "bg-paper", "2": "bg-paper-2", "3": "bg-paper-3", "4": "bg-paper-4" },
        flex: {
            row: "flex flex-row",
            row_reverse: "flex flex-row-reverse",
            col: "flex flex-col",
            col_reverse: "flex flex-col-reverse",
        },
        grow: { true: "grow", false: "" },
        noShrink: { true: "shrink-0", false: "" },
        sticky: { true: "sticky top-0 z-10", false: "" },
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
    },
    defaultVariants: { width: "md" },
});

export type PageProps = ComponentProps<"div"> & VariantProps<typeof pageVariants>;

/**
 * Page container. Generally there should only be one `Page` per route.
 */
export const Page: FC<PageProps> = ({
    sticky,
    width,
    bg,
    flex,
    grow,
    noShrink = true,
    height,
    maxHeight,
    minHeight,
    className,
    children,
    ...restProps
}) => (
    <div
        className={cn(
            pageVariants({ sticky, width, bg, flex, grow, noShrink, height, maxHeight, minHeight }),
            className,
        )}
        {...restProps}
    >
        {children}
    </div>
);

/** {@link Page} alias */
export const PageLike = Page;
