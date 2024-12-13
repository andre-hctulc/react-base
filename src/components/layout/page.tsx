import React from "react";
import { withPrefix } from "../../util/system";
import { tv, type VariantProps } from "tailwind-variants";
import type { StyleProps } from "../../types";

const page = tv({
    base: "box-border w-full min-h-0",
    variants: {
        size: {
            "4xs": "max-w-xl mx-auto",
            "3xs": "max-w-2xl mx-auto",
            "2xs": "max-w-3xl mx-auto",
            xs: "max-w-4xl mx-auto",
            sm: "max-w-5xl mx-auto",
            md: "max-w-6xl mx-auto",
            lg: "max-w-7xl mx-auto",
            full_width: "w-full",
        },
        variant: {
            default: "",
            flex_row: "flex",
            flex_col: "flex flex-col",
            center: "flex items-center justify-center",
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
        flex: {
            row: "flex",
            col: "flex flex-col",
        },
    },
    defaultVariants: {
        size: "lg",
        variant: "default",
    },
});

interface PageProps extends VariantProps<typeof page>, StyleProps {
    children?: React.ReactNode;
}

export const Page = React.forwardRef<HTMLDivElement, PageProps>(
    (
        { children, variant, className, grow, size, maxHeightFull, minHeight0, fullHeight, style, flex },
        ref
    ) => {
        return (
            <div
                className={page({
                    size,
                    flex,
                    className,
                    grow,
                    maxHeightFull,
                    minHeight0,
                    fullHeight,
                    variant,
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
