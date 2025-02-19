import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import React from "react";
const stat = tv({
    variants: {
        size: {
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
        },
    },
    defaultVariants: { size: "md" },
});
export const Stat = React.forwardRef(({ className, size, value, prefix, suffix, unit, ...props }, ref) => {
    return (_jsxs("div", { className: stat({ className, size }), ref: ref, ...props, children: [prefix, value + " ", unit && _jsx("span", { className: "text-xs text-t2", children: unit }), suffix] }));
});
Stat.displayName = withPrefix("Stat");
