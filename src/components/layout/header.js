import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
const header = tv({
    base: "w-full max-w-full box-border shrink-0",
    variants: {
        variant: {
            elevated: "bg-paper2",
            border: "bg-paper border-b",
            custom: "",
        },
        shadow: {
            none: "",
            sm: "shadow-xs",
            base: "shadow-sm",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
            "2xl": "shadow-2xl",
        },
        sticky: { true: "sticky top-0 z-10" },
    },
    defaultVariants: {
        variant: "elevated",
    },
});
/**
 * ### Props
 * - `variant`
 * - `shadow-sm`
 */
export const Header = React.forwardRef(({ children, variant, className, style, sticky, shadow }, ref) => {
    return (_jsx("div", { ref: ref, className: header({ className, variant, shadow, sticky }), style: style, children: children }));
});
Header.displayName = withPrefix("Header");
