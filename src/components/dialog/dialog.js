"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Dialog as BaseDialog, DialogPanel } from "@headlessui/react";
import { tv } from "tailwind-variants";
import clsx from "clsx";
import { useIsHydrated } from "../../hooks";
import { createPortal } from "react-dom";
const dialog = tv({
    base: "relative z-10 focus:outline-hidden",
    variants: {},
    defaultVariants: {
        variant: "default",
    },
});
const dialogPanel = tv({
    base: [
        // use flex layout to fix overflow issues
        "flex flex-col",
        "max-w-full bg-paper max-w-md rounded-xl backdrop-blur-2xl m-4 box-border max-h-full",
        "duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0",
    ],
    variants: {
        width: {
            sm: "w-[300px]",
            md: "w-[500px]",
            lg: "w-[700px]",
            none: "",
        },
        height: {
            none: "",
            sm: "h-[250px]",
            md: "h-[400px]",
            lg: "h-[550px]",
            xl: "h-[800px]",
        },
        maxHeight: {
            none: "",
            sm: "max-h-[250px]",
            md: "max-h-[400px]",
            lg: "max-h-[550px]",
            xl: "max-h-[800px]",
        },
        shadow: {
            sm: "shadow-xs",
            md: "shadow-sm",
            lg: "shadow-md",
            xl: "shadow-lg",
        },
    },
    defaultVariants: {
        width: "md",
        shadow: "lg",
    },
});
export const Dialog = ({ open, children, className, loading, variant, closable, onClose, width, height, shadow, style, }) => {
    const mounted = useIsHydrated();
    const cl = closable !== false;
    if (!mounted)
        return null;
    return createPortal(_jsx(BaseDialog, { open: open, as: "div", className: dialog({ className }), style: style, onClose: () => {
            if (cl && onClose)
                onClose();
        }, children: _jsx("div", { "data-open": open, className: clsx("fixed inset-0 z-40 w-screen overflow-y-auto transition-all duration-500 ease-out", variant == "transparent"
                ? ""
                : open
                    ? "data-[open=true]:bg-black/10"
                    : "data-[open=false]:bg-black/0"), children: _jsx("div", { className: "flex h-screen items-center justify-center p-4 box-border", children: _jsx(DialogPanel, { transition: true, className: dialogPanel({ width, height, shadow }), children: children }) }) }) }), document.body);
};
