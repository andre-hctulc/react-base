import React from "react";
import { withPrefix } from "../../util/system";
import { type ClassValue, tv, type VariantProps } from "tailwind-variants";
import type { StyleProps } from "../../types";

const page = tv({
    base: "box-border w-full",
    variants: {
        size: {
            xxs: "max-w-3xl mx-auto",
            xs: "max-w-4xl mx-auto",
            sm: "max-w-5xl mx-auto",
            md: "max-w-6xl mx-auto",
            lg: "max-w-7xl mx-auto",
            full_width: "w-full",
        },
        flex: {
            row: "flex",
            col: "flex flex-col",
        },
        grow: {
            true: "flex-grow",
        },
        maxHeightFull: {
            true: "max-h-full",
        },
        minHeight0: {
            true: "min-h-0",
        },
        fullHeight: {
            true: "h-full",
        },
    },
    defaultVariants: {
        size: "lg",
    },
});

interface PageProps extends VariantProps<typeof page>, StyleProps {
    children?: React.ReactNode;
}

export const Page = React.forwardRef<HTMLDivElement, PageProps>(
    ({ children, className, grow, size, maxHeightFull, minHeight0, fullHeight, style }, ref) => {
        return (
            <div
                className={page({
                    size,
                    className,
                    grow,
                    maxHeightFull,
                    minHeight0,
                    fullHeight,
                })}
                ref={ref}
                style={style}
            >
                {children}
            </div>
        );
    }
);

Page.displayName = withPrefix("Page");
