"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import { forwardRef } from "react";
const input = tv({
    base: [
        "block w-full rounded-lg border-none bg-paper3 py-1.5 px-3",
        "transition outline-0 focus:outline-2 focus:outline-divider",
    ],
    variants: {
        size: {
            sm: "h-7 text-sm",
            md: "h-9 text-sm",
            lg: "h-11 text-base",
        },
    },
    defaultVariants: {
        size: "md",
    },
});
export const Input = forwardRef(({ size, className, style, type, name, required, defaultValue, value, onChange, ...props }, ref) => {
    return (_jsx("input", { required: required, ref: ref, value: value, defaultValue: defaultValue, className: input({ size, className }), name: name, type: type, onChange: (e) => {
            onChange?.({ value: e.target.value, ...e });
        }, ...props }));
});
Input.displayName = withPrefix("Input");
