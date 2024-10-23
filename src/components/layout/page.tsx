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
            grow: "flex-grow",
        },
        flex: {
            row: "flex flex-row",
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
    maxHFull?: boolean;
    minH0?: boolean;
}

export const Page = React.forwardRef<HTMLDivElement, PageProps>(
    ({ children, className, grow, size, maxHFull, minH0 }, ref) => {
        return (
            <div
                className={page({
                    size,
                    className: [className, minH0 && "min-h-0", maxHFull && "max-h-full", grow && "flex-grow"],
                })}
                ref={ref}
            >
                {children}
            </div>
        );
    }
);

Page.displayName = withPrefix("Page");
