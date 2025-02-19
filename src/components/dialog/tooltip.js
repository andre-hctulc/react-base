"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { tv } from "tailwind-variants";
import { cloneElement, useRef, useState } from "react";
import clsx from "clsx";
import { Popover } from "./popover";
const tooltip = tv({
    base: "",
    variants: {},
    defaultVariants: {},
});
/**
 * The child must forward the ref!
 */
export const Tooltip = ({ position, children, containerProps, enterDelay, reEnterDelay, content, disabled, portal, zIndex, }) => {
    const anchor = useRef(null);
    const [open, setOpen] = useState(false);
    const openTimeout = useRef(null);
    const entered = useRef(false);
    return (_jsxs(_Fragment, { children: [cloneElement(children, {
                ref: anchor,
                onMouseEnter: (e) => {
                    children.props?.onMouseEnter?.(e);
                    if (disabled)
                        return;
                    entered.current = true;
                    if (openTimeout.current)
                        clearTimeout(openTimeout.current);
                    openTimeout.current = setTimeout(() => {
                        setOpen(true);
                    }, entered.current ? reEnterDelay ?? 200 : enterDelay ?? 200);
                },
                onMouseLeave: (e) => {
                    children.props?.onMouseLeave?.(e);
                    if (openTimeout.current)
                        clearTimeout(openTimeout.current);
                    setOpen(false);
                },
            }), _jsx(Popover, { open: open, noInteraction: true, position: position || "top", anchor: anchor.current, portal: portal ?? false, zIndex: zIndex, children: _jsx("div", { ...containerProps, className: clsx("bg-black/75 rounded-sm py-1.5 px-2 text-white text-sm", containerProps?.className), children: content }) })] }));
};
