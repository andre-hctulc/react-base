"use client";

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import { Transition } from "@headlessui/react";
import type { TVCProps, XStyleProps } from "../../types";
import { Overlay } from "./overlay";
import { createPortal } from "react-dom";
import { useIsHydrated } from "../../hooks";

const drawer = tv({
    base: "fixed z-30 bg-background shadow-lg ease-in-out duration-300 max-w-full max-h-full bg",
    variants: {
        position: {
            left: "top-0 left-0 h-screen w-full md:w-80 data-[closed]:left-[-100%] data-[open]:left-0",
            right: "top-0 right-0 h-screen w-full md:w-80 data-[closed]:right-[-100%] data-[open]:right-0",
            bottom: "bottom-0 left-0 w-full h-screen md:h-100 max-h-full data-[closed]:bottom-[-100%] data-[open]:bottom-0",
            top: "top-0 left-0 w-full h-screen md:h-100 max-h-full data-[closed]:bottom-[-100%] data-[open]:bottom-0",
        },
    },
    defaultVariants: {
        position: "left",
    },
});

interface DrawerProps extends TVCProps<typeof drawer, "div"> {
    children?: React.ReactNode;
    open: boolean;
    onClose?: () => void;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
    ({ children, position, className, style, open, ...props }, ref) => {
        const isMounted = useIsHydrated();

        if (!isMounted) return null;

        return createPortal(
            <Overlay noInteraction={!open} bg={open ? 1 : "transparent"} onClick={() => props.onClose?.()}>
                <Transition show={open}>
                    <div ref={ref} className={drawer({ position, className })} style={style}>
                        {children}
                    </div>
                </Transition>
            </Overlay>,
            document.body
        );
    }
);

Drawer.displayName = withPrefix("Drawer");
