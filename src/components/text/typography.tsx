import type { TVCProps } from "../../types";
import React from "react";
import { withPrefix } from "../../util/system";
import { tv } from "tailwind-variants";

const typography = tv({
    base: "",
    variants: {
        variant: {
            primary: "text-base text-1",
            secondary: "text-sm text-2",
            tertiary: "text-sm text-3",
            quaternary: "text-xs text-4",
        },
        size: {
            xs: "text-xs",
            sm: "text-sm",
            base: "text-base",
            md: "text-md",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
            "3xl": "text-3xl",
            "4xl": "text-4xl",
            "5xl": "text-5xl",
            "6xl": "text-6xl",
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
        lineHeight: {
            none: "",
            tight: "leading-tight",
            snug: "leading-snug",
            normal: "leading-normal",
            relaxed: "leading-relaxed",
            loose: "leading-loose",
        },
    },
    defaultVariants: {},
});

interface TypographyProps extends TVCProps<typeof typography, "span"> {
    as?: any;
}

/**
 * Text. Used across components to consistently style text.
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
    ({ children, className, center, underline, italic, as, size, lineHeight, variant, ...props }, ref) => {
        const Comp = as || "p";

        return (
            <Comp
                ref={ref}
                className={typography({ className, center, underline, size, italic, lineHeight, variant })}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);

Typography.displayName = withPrefix("Typography");
