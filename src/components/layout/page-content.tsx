import React from "react";
import { withPrefix } from "../../util/system.js";
import { type ClassValue, tv, type VariantProps } from "tailwind-variants";

const pageContent = tv({
    base: "max-w-full box-border",
    variants: {
        minHeight0: {
            true: "min-h-0",
        },
        width: {
            full: "w-full",
            none: "",
            auto: "w-auto",
        },
        padding: {
            none: "",
            sm: "p-2 md:p-4",
            md: "p-3.5 md:p-7",
            lg: "p-5 md:p-9",
        },
        justifyContent: {
            center: "justify-center",
            start: "justify-start",
            end: "justify-end",
        },
        alignItems: {
            center: "items-center",
            start: "items-start",
            end: "items-end",
        },
        flex: {
            row: "flex",
            col: "flex flex-col",
        },
        grow: {
            true: "grow",
        },
        fullHeight: {
            true: "h-full",
        },
        maxHeightFull: {
            true: "max-h-full",
        },
    },
    defaultVariants: {
        padding: "md",
        width: "full",
    },
});

interface PageContentProps extends VariantProps<typeof pageContent> {
    children?: React.ReactNode;
    className?: ClassValue;
}

/**
 * Use this inside a `Page` component to display page content.
 */
export const PageContent = React.forwardRef<HTMLElement, PageContentProps>(
    (
        {
            children,
            className,
            padding,
            fullHeight,
            maxHeightFull,
            flex,
            width,
            grow,
            minHeight0,
            alignItems,
            justifyContent,
        },
        ref
    ) => {
        return (
            <main
                className={pageContent({
                    className,
                    alignItems,
                    justifyContent,
                    width,
                    padding,
                    flex,
                    maxHeightFull,
                    fullHeight,
                    grow,
                    minHeight0,
                })}
                ref={ref}
            >
                {children}
            </main>
        );
    }
);

PageContent.displayName = withPrefix("PageContent");
