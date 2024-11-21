import type { TVCProps } from "../../types";
import React from "react";
import { withPrefix } from "../../util/system";
import { tv } from "tailwind-variants";

const typography = tv({
    base: "",
    variants: {
        variant: {
            primary: "",
            secondary: "text-2 text-sm",
            tertiary: "text-3 text-sm",
            pale: "text-3 text-xs",
        },
        center: {
            true: "text-center",
        },
        underline: {
            true: "underline",
        },
        italic: {
            true: "italic",
        },
    },
    defaultVariants: {
        variant: "primary",
    },
});

interface TypographyProps extends TVCProps<typeof typography, "span"> {
    as?: any;
}

/**
 * Text. Used across components to consistently style text.
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
    ({ children, className, variant, center, underline, italic, as, ...props }, ref) => {
        const Comp = as || "p";

        return (
            <Comp
                ref={ref}
                className={typography({ className, variant, center, underline, italic })}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);

Typography.displayName = withPrefix("Typography");
