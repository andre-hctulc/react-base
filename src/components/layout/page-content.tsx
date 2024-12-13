import React from "react";
import { withPrefix } from "../../util/system";
import { type ClassValue, tv, type VariantProps } from "tailwind-variants";

const pageContent = tv({
    base: "max-w-full min-h-0",
    variants: {
        width: {
            full: "w-full",
            dialog_sm: "w-96",
            dialog_md: "w-[500px]",
            dialog_lg: "w-[700px]",
        },
        pt: {
            none: "",
            sm: "pt-2 md:pt-4",
            md: "pt-3.5 md:pt-7",
            lg: "pt-5 md:pt-9",
        },
        pb: {
            none: "",
            sm: "pb-2 md:pb-4",
            md: "pb-3.5 md:pb-7",
            lg: "pb-5 md:pb-9",
        },
        px: {
            none: "",
            sm: "px-3 md:px-6",
            md: "px-4 md:px-8",
            lg: "px-6 md:px-10",
        },
        flex: {
            row: "flex",
            col: "flex flex-col",
        },
        grow: {
            true: "flex-grow",
        },
        fullHeight: {
            true: "h-full",
        },
        maxHeightFull: {
            true: "max-h-full",
        },
    },
    defaultVariants: {
        px: "md",
        pt: "md",
        pb: "md",
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
    ({ children, className, pb, pt, fullHeight, maxHeightFull, flex, width, grow }, ref) => {
        return (
            <main
                className={pageContent({
                    className,
                    width,
                    pt,
                    pb,
                    flex,
                    maxHeightFull,
                    fullHeight,
                    grow,
                })}
                ref={ref}
            >
                {children}
            </main>
        );
    }
);

PageContent.displayName = withPrefix("PageContent");
