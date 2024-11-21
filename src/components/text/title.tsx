import clsx from "clsx";
import React from "react";
import { withPrefix } from "../../util/system";
import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types";

const title = tv({
    base: "font-semibold",
    variants: {
        variant: {
            h1: "text-xl",
            h2: "text-lg",
            h3: "text-base",
            h4: "text-sm",
            h5: "text-xs",
        },
        underline: {
            true: "underline",
        },
    },
    defaultVariants: {
        variant: "h1",
    },
});

interface TitleProps extends TVCProps<typeof title, "h2"> {
    as?: any;
}

/**
 * ### Props
 * - `variant`
 * - `underline`
 */
export const Title = React.forwardRef<HTMLElement, TitleProps>(
    ({ children, className, as, variant, underline, ...props }, ref) => {
        const Comp = as || variant || "h1";

        return (
            <Comp className={title({ className, variant, underline })} ref={ref as any} {...props}>
                {children}
            </Comp>
        );
    }
);

Title.displayName = withPrefix("Title");
