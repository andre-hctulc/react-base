import { jsx as _jsx } from "react/jsx-runtime";
import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import React from "react";
const helperText = tv({
    base: "text-sm text-t2 leading-4",
    variants: {
        italic: {
            true: "italic",
        },
    },
    defaultVariants: {},
});
export const HelperText = React.forwardRef(({ children, className, italic, ...props }, ref) => {
    return (_jsx("p", { ref: ref, className: helperText({ className, italic }), ...props, children: children }));
});
HelperText.displayName = withPrefix("HelperText");
