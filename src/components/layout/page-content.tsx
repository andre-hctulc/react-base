import { type FC, type ComponentProps } from "react";
import { cn } from "@/util/cn/cn.util.js";
import { cva, type VariantProps } from "class-variance-authority";
import { sz } from "@/util/react/variants.util.js";

const pageContentVariants = cva("max-w-full box-border", {
    variants: {
        p: sz("p"),
        px: sz("px"),
        py: sz("py"),
        pt: sz("pt"),
        pr: sz("pr"),
        pb: sz("pb"),
        pl: sz("pl"),
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
        width: {
            full: "w-full",
            screen: "w-screen",
            auto: "w-auto",
            min: "min-w-full",
            max: "max-w-full",
            fit: "w-fit",
            "0": "w-0",
        },
        maxWidth: {
            full: "max-w-full",
            screen: "max-w-screen",
            auto: "max-w-auto",
            min: "max-w-min",
            max: "max-w-max",
            fit: "max-w-fit",
            "0": "max-w-0",
        },
        minWidth: {
            full: "min-w-full",
            screen: "min-w-screen",
            auto: "min-w-auto",
            min: "min-w-min",
            max: "min-w-max",
            fit: "min-w-fit",
            "0": "min-w-0",
        },
        justifyContent: {
            start: "justify-start",
            center: "justify-center",
            end: "justify-end",
            between: "justify-between",
            around: "justify-around",
        },
        alignItems: {
            auto: "",
            start: "items-start",
            center: "items-center",
            end: "items-end",
            stretch: "items-stretch",
            baseline: "items-baseline",
        },
        flex: {
            row: "flex flex-row",
            row_reverse: "flex flex-row-reverse",
            col: "flex flex-col",
            col_reverse: "flex flex-col-reverse",
        },
        grow: { true: "grow", false: "" },
    },
    defaultVariants: { p: "lg", width: "full" },
});

export type PageContentProps = ComponentProps<"main"> & VariantProps<typeof pageContentVariants>;

/** Use inside a `Page` component to display page content. */
export const PageContent: FC<PageContentProps> = ({
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    height,
    maxHeight,
    minHeight,
    width,
    maxWidth,
    minWidth,
    justifyContent,
    alignItems,
    flex,
    grow,
    className,
    children,
    ...restProps
}) => (
    <main
        className={cn(
            pageContentVariants({
                p,
                px,
                py,
                pt,
                pr,
                pb,
                pl,
                height,
                maxHeight,
                minHeight,
                width,
                maxWidth,
                minWidth,
                justifyContent,
                alignItems,
                flex,
                grow,
            }),
            className,
        )}
        {...restProps}
    >
        {children}
    </main>
);
