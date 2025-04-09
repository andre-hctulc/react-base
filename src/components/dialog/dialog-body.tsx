"use client";

import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types/index.js";
import React from "react";
import { useWindowEvent } from "../../hooks/document/use-window-event.js";

const dialogBody = tv({
    // grow and scroll when content is too long
    base: ["grow min-h-0 overflow-y-auto", "box-border "],
    variants: {
        flex: {
            col: "flex flex-col",
            row: "flex flex-row",
        },
        scrolling: {
            true: "shadow-inner",
        },
        size: {
            xs: "px-2 py-2",
            sm: "px-4 py-3",
            md: "px-6 py-5",
            lg: "px-8 py-6",
            xl: "px-10 py-8",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export interface DialogBodyProps extends TVCProps<typeof dialogBody, "div"> {}

/**
 * The body of a dialog.
 *
 * Use it with `Dialog` or `Popover`.
 */
export const DialogBody: React.FC<DialogBodyProps> = ({ children, className, flex, size, ...props }) => {
    const [scrolling, setScrolling] = React.useState(false);
    const root = React.useRef<HTMLDivElement>(null);

    useWindowEvent("resize", (e) => {
        checkScrolling();
    });

    const checkScrolling = () => {
        if (!root.current) return;
        setScrolling(root.current.scrollHeight > root.current.clientHeight);
    };

    return (
        <div
            ref={root}
            className={dialogBody({ className, flex, scrolling, size })}
            {...props}
            onScroll={(e) => {
                checkScrolling();
                props.onScroll?.(e);
            }}
        >
            {children}
        </div>
    );
};
