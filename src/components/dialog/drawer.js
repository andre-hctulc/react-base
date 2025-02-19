"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import { Transition } from "@headlessui/react";
import { Overlay } from "../layout/overlay";
const drawer = tv({
    base: "fixed z-30 bg-background shadow-lg ease-in-out duration-300 max-w-full max-h-full bg-paper",
    variants: {
        position: {
            left: "top-0 left-0 h-screen w-full md:w-80 data-closed:left-[-100%] data-open:left-0",
            right: "top-0 right-0 h-screen w-full md:w-80 data-closed:right-[-100%] data-open:right-0",
            bottom: "bottom-0 left-0 w-full h-screen md:h-100 max-h-full data-closed:bottom-[-100%] data-open:bottom-0",
            top: "top-0 left-0 w-full h-screen md:h-100 max-h-full data-closed:bottom-[-100%] data-open:bottom-0",
        },
    },
    defaultVariants: {
        position: "left",
    },
});
export const Drawer = React.forwardRef(({ children, position, className, style, open, onClose, ...props }, ref) => {
    return (_jsx(Overlay, { portal: true, noInteraction: !open, bg: open ? "transparent1" : "transparent", onClick: () => onClose?.(), children: _jsx(Transition, { show: open, children: _jsx("div", { ref: ref, className: drawer({ position, className }), style: style, onClick: (e) => e.stopPropagation(), children: children }) }) }));
});
Drawer.displayName = withPrefix("Drawer");
