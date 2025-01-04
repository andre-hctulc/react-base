import { withPrefix } from "../../util/system";
import React from "react";
import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types";

const subtitle = tv({
    base: "text-lg font-medium text-2",
    variants: {
        variant: {
            h2: "text-lg",
            h3: "text-base",
            h4: "text-sm",
            h5: "text-xs",
        },
        underline: {
            true: "underline",
        },
        my: {
            none: "",
            xs: "my-1",
            sm: "my-2",
            md: "my-4",
            lg: "my-7",
            xl: "my-12",
        },
        mt: {
            none: "",
            xs: "mt-1",
            sm: "mt-2",
            md: "mt-4",
            lg: "mt-7",
            xl: "mt-12",
        },
        mb: {
            none: "",
            xs: "mb-1",
            sm: "mb-2",
            md: "mb-4",
            lg: "mb-7",
            xl: "mb-12",
        },
        lineHeight: {
            none: "",
            tight: "leading-tight",
            snug: "leading-snug",
            normal: "leading-normal",
            relaxed: "leading-relaxed",
            loose: "leading-loose",
        },
    },
    defaultVariants: {
        variant: "h2",
    },
});

interface SubtitleProps extends TVCProps<typeof subtitle, "h2"> {
    as?: any;
}

/**
 * ### Props
 * - `variant`
 * - `underline`
 */
export const Subtitle = React.forwardRef<HTMLElement, SubtitleProps>(
    ({ children, className, as, variant, underline, my, mt, mb, lineHeight, ...props }, ref) => {
        const Comp = as || variant || "h2";

        return (
            <Comp
                className={subtitle({ className, underline, variant, my, mb, mt, lineHeight })}
                ref={ref as any}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);

Subtitle.displayName = withPrefix("Subtitle");
