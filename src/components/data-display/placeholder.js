import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { tv } from "tailwind-variants";
import { Typography } from "../text";
import { Icon } from "../icons";
import React from "react";
const placeholder = tv({
    base: "flex flex-col items-center justify-center",
    variants: {
        gap: {
            none: "",
            sm: "gap-2.5",
            md: "gap-4",
            lg: "gap-6",
        },
        padding: {
            none: "",
            sm: "p-6",
            md: "p-8",
            lg: "p-10",
        },
        grow: {
            true: "grow",
        },
        fullHeight: {
            true: "h-full",
        },
        fullWidth: {
            true: "w-full",
        },
        my: {
            none: "",
            sm: "my-4",
            md: "my-8",
            lg: "my-12",
            xl: "my-20",
        },
    },
    defaultVariants: {
        padding: "md",
        gap: "md",
    },
});
/**
 * ### Props
 * - `gap`
 * - `padding`
 * - `icon`
 * - `helperText`
 * - `grow`
 * - `fullHeight`
 * - `fullWidth`
 * - `my`
 */
export const Placeholder = ({ children, className, icon, iconProps, gap, padding, helperText, helperTextProps, grow, textProps, fullHeight, fullWidth, my, ...props }) => {
    return (_jsxs("div", { className: placeholder({ className, gap, padding, grow, fullHeight, fullWidth, my }), ...props, children: [icon && (_jsx("span", { className: "text-2", children: _jsx(Icon, { size: "4xl", ...iconProps, children: icon }) })), typeof children === "string" ? (_jsx(Typography, { variant: "secondary", ...textProps, children: children ?? "Empty" })) : (children), helperText && (_jsx(Typography, { variant: "tertiary", ...helperTextProps, children: helperText }))] }));
};
