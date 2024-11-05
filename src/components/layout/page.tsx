import React from "react";
import { withPrefix } from "../../util/system";
import { type ClassValue, tv, type VariantProps } from "tailwind-variants";

const page = tv({
    base: "container box-border",
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
    },
    defaultVariants: {
        size: "lg",
    },
});

interface PageProps extends VariantProps<typeof page> {
    children?: React.ReactNode;
    className?: ClassValue;
    grow?: boolean;
    maxHeightFull?: boolean;
    minHeight0?: boolean;
    fullHeight?: boolean;
}

export const Page = React.forwardRef<HTMLDivElement, PageProps>(
    (
        { children, className, grow, size, maxHeightFull: maxHFull, minHeight0: minH0, fullHeight: hFull },
        ref
    ) => {
        return (
            <div
                className={page({
                    size,
                    className: [
                        className,
                        minH0 && "min-h-0",
                        maxHFull && "max-h-full",
                        hFull && "h-full",
                        grow && "flex-grow",
                    ],
                })}
                ref={ref}
            >
                {children}
            </div>
        );
    }
);

Page.displayName = withPrefix("Page");
