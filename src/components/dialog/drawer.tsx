import { collapse } from "@dre44/util";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { TVCProps } from "../../types/index.js";

const drawer = tv({
    base: "fixed z-50 bg-white transition-transform duration-300 ease-in-out",
    variants: {
        position: {
            left: "top-0 left-0 h-full",
            right: "top-0 right-0 h-full",
            top: "top-0 left-0 w-full",
            bottom: "bottom-0 left-0 w-full",
        },
        size: {
            sm: "",
            md: "",
            lg: "",
        },
        shadow: {
            none: "",
            sm: "shadow-sm",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
        },
        open: {
            true: "",
            false: "",
        },
    },
    compoundVariants: [
        {
            position: "left",
            size: "sm",
            class: "w-64",
        },
        {
            position: "left",
            size: "md",
            class: "w-80",
        },
        {
            position: "left",
            size: "lg",
            class: "w-[28rem]",
        },
        {
            position: "right",
            size: "sm",
            class: "w-64",
        },
        {
            position: "right",
            size: "md",
            class: "w-80",
        },
        {
            position: "right",
            size: "lg",
            class: "w-[28rem]",
        },
        {
            position: "top",
            size: "sm",
            class: "h-32",
        },
        {
            position: "top",
            size: "md",
            class: "h-48",
        },
        {
            position: "top",
            size: "lg",
            class: "h-64",
        },
        {
            position: "bottom",
            size: "sm",
            class: "h-32",
        },
        {
            position: "bottom",
            size: "md",
            class: "h-48",
        },
        {
            position: "bottom",
            size: "lg",
            class: "h-64",
        },
    ],
    defaultVariants: {
        position: "right",
        size: "md",
        shadow: "lg",
    },
});

export interface DrawerProps extends TVCProps<typeof drawer, "div"> {
    open?: boolean;
    defaultOpen?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
    open: controlledOpen,
    defaultOpen = false,
    onClose,
    position = "right",
    size,
    shadow,
    children,
    className,
    ...props
}) => {
    const isControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const open = isControlled ? controlledOpen : internalOpen;
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        if (!isControlled) {
            setInternalOpen(false);
        }
        onClose?.();
    };

    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        if (open) {
            document.addEventListener("keydown", handleEsc);
        }
        return () => document.removeEventListener("keydown", handleEsc);
    }, [open]);
    
    const transformClasses = collapse(position, {
        left: { open: "translate-x-0", closed: "-translate-x-full" },
        right: { open: "translate-x-0", closed: "translate-x-full" },
        top: { open: "translate-y-0", closed: "-translate-y-full" },
        bottom: { open: "translate-y-0", closed: "translate-y-full" },
    });

    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
                    onClick={handleClose}
                />
            )}

            {/* Drawer Panel */}
            <div
                {...props}
                className={clsx(
                    drawer({ position, size, shadow, open }),
                    open ? transformClasses.open : transformClasses.closed,
                    className
                )}
            >
                {children}
            </div>
        </>
    );
};
