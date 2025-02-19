import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import { forwardRef } from "react";
const label = tv({
    base: "inline-block",
    variants: {
        variant: {
            default: "text-base",
            secondary: "text-t2 text-sm",
            tertiary: "text-t3 text-xs",
        },
        mb: {
            none: "mb-0",
            sm: "mb-1",
            md: "mb-2",
            lg: "mb-3",
            xl: "mb-5",
        },
        mt: {
            none: "mt-0",
            sm: "mt-1",
            md: "mt-2",
            lg: "mt-3",
            xl: "mt-5",
        },
        my: {
            none: "my-0",
            sm: "my-1",
            md: "my-2",
            lg: "my-3",
            xl: "my-5",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
export const Label = forwardRef(({ children, className, requiredHint, mb, mt, my, as, variant, ...props }, ref) => {
    const Comp = as || "label";
    const p = { ...props };
    if (as && as !== "label") {
        delete p.htmlFor;
    }
    return (_jsxs(Comp, { ref: ref, className: label({ className, mb, mt, my, variant }), ...p, children: [children, requiredHint && _jsx("span", { children: " *" })] }));
});
Label.displayName = withPrefix("Label");
