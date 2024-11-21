import React from "react";
import { withPrefix } from "../../util/system";
import { type ClassValue, tv, type VariantProps } from "tailwind-variants";

const pageContent = tv({
    base: "w-full",
    variants: {
        padding: {
            sm: "px-3 md:px-6 py-2 md:py-4",
            md: "px-4 md:px-8 py-3.5 md:py-7",
            lg: "px-6 md:px-10 py-5 md:py-9",
            none: "",
        },
        flex: {
            row: "flex",
            col: "flex flex-col",
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
    ({ children, className, padding, fullHeight, maxHeightFull, flex }, ref) => {
        return (
            <main
                className={pageContent({
                    className,
                    padding,
                    flex,
                    maxHeightFull,
                    fullHeight,
                })}
                ref={ref}
            >
                {children}
            </main>
        );
    }
);

PageContent.displayName = withPrefix("PageContent");
