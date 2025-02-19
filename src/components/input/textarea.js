"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import React from "react";
const textarea = tv({
    base: [
        "transition block w-full rounded-lg border-none paper3 py-1.5 px-3",
        "focus:outline-hidden focus:outline-2 focus:-outline-offset-2 focus:outline-divider",
    ],
    variants: {
        size: {
            sm: "h-7 text-sm",
            md: "h-9 text-sm",
            lg: "h-20 text-sm",
            xl: "h-32 text-sm",
            "2xl": "h-44 text-sm",
        },
    },
    defaultVariants: {
        size: "lg",
    },
});
export const Textarea = React.forwardRef(({ size, className, style, name, required, defaultValue, value, onChange, ...props }, ref) => {
    return (_jsx("textarea", { required: required, ref: ref, value: value, defaultValue: defaultValue, className: textarea({ size, className }), name: name, onChange: (e) => {
            onChange?.({ value: e.target.value, ...e });
        }, ...props }));
});
Textarea.displayName = withPrefix("Textarea");
