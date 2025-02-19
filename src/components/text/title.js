import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, {} from "react";
import { withPrefix } from "../../util/system";
import { tv } from "tailwind-variants";
import { Icon } from "../icons";
import clsx from "clsx";
const title = tv({
    base: "",
    variants: {
        variant: {
            h1: "text-2xl",
            h2: "text-xl",
            h3: "text-lg",
            h4: "text-base",
            h5: "text-sm",
        },
        underline: {
            true: "underline",
        },
        bold: {
            true: "font-semibold",
            false: "font-medium",
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
        variant: "h1",
        bold: false,
    },
});
/**
 * ### Props
 * - `variant`
 * - `underline`
 */
export const Title = React.forwardRef(({ children, className, as, variant, underline, my, mb, mt, lineHeight, bold, icon, iconProps, ...props }, ref) => {
    const Comp = as || variant || "h1";
    return (_jsxs(Comp, { className: title({ className, variant, underline, my, mb, mt, lineHeight, bold }), ref: ref, ...props, children: [icon && (_jsx(Icon, { size: "none", inline: true, ...iconProps, className: clsx("mr-3", iconProps?.className), children: icon })), children] }));
});
Title.displayName = withPrefix("Title");
