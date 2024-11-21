import { withPrefix } from "../../util/system";
import React from "react";
import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types";

const subtitle = tv({
    base: "text-lg font-medium text-gray-500",
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
    ({ children, className, as, variant, underline, ...props }, ref) => {
        const Comp = as || variant || "h2";

        return (
            <Comp className={subtitle({ className, underline, variant })} ref={ref as any} {...props}>
                {children}
            </Comp>
        );
    }
);

Subtitle.displayName = withPrefix("Subtitle");
