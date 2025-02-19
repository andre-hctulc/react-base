"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { tv } from "tailwind-variants";
import { Button } from "../input";
import { Toolbar } from "../containers";
const dialogFooter = tv({
    base: "px-6 pb-5 pt-4 box-border",
    variants: {
        variant: {
            actions: "flex justify-end",
            default: "",
            flex: "flex",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
export const DialogFooter = ({ children, className, variant, ...props }) => {
    return (_jsx("div", { className: dialogFooter({ className, variant }), ...props, children: children }));
};
