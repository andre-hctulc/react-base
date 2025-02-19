"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { tv } from "tailwind-variants";
import React from "react";
import { useWindowEvent } from "../../hooks";
const dialogBody = tv({
    // grow and scroll when content is too long
    base: ["grow min-h-0 overflow-y-auto", "px-6 py-1 box-border "],
    variants: {
        flex: {
            col: "flex flex-col",
            row: "flex flex-row",
        },
        scrolling: {
            true: "shadow-inner",
        },
        py: {
            // Let footer/header handle padding. This way the dialog looks better when scrolling is active
            true: "py-5!",
        },
    },
    defaultVariants: {},
});
export const DialogBody = ({ children, className, flex, ...props }) => {
    const [scrolling, setScrolling] = React.useState(false);
    const root = React.useRef(null);
    useWindowEvent("resize", (e) => {
        checkScrolling();
    });
    const checkScrolling = () => {
        if (!root.current)
            return;
        setScrolling(root.current.scrollHeight > root.current.clientHeight);
    };
    return (_jsx("div", { ref: root, className: dialogBody({ className, flex, scrolling }), ...props, onScroll: (e) => {
            checkScrolling();
            props.onScroll?.(e);
        }, children: children }));
};
