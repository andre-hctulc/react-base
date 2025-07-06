"use client";

import { collapse } from "@dre44/util";
import clsx from "clsx";
import { useEffect } from "react";
import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types/index.js";
import { Overlay } from "../layout/overlay.js";

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
        bg: {
            none: "",
            "1": "bg-paper",
            "2": "bg-paper2",
            "3": "bg-paper3",
            "5": "bg-paper4",
        },
        padding: {
            xs: "p-1",
            sm: "p-2",
            md: "p-4",
            lg: "p-6",
            xl: "p-8",
            "2xl": "p-10",
            "3xl": "p-14",
        },
    },
    defaultVariants: {
        position: "left",
        size: "md",
        shadow: "lg",
    },
});

export interface DrawerProps extends TVCProps<typeof drawer, "div"> {
    open: boolean;
    defaultOpen?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    overlayProps?: PropsOf<typeof Overlay>;
}

export const Drawer: React.FC<DrawerProps> = ({
    open,
    onClose,
    position = "right",
    size,
    shadow,
    children,
    className,
    padding,
    overlayProps,
    bg,
    ...props
}) => {
    const _size = size || "md";
    const isVert = position === "top" || position === "bottom";
    const sizeClasses = isVert
        ? collapse(_size, {
              sm: "h-32",
              md: "h-48",
              lg: "h-64",
          })
        : collapse(_size, {
              sm: "w-64",
              md: "w-80",
              lg: "w-[28rem]",
          });

    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose?.();
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
            {open && (
                <Overlay
                    noInteraction={!open}
                    zIndex="40"
                    bg="blur_xs"
                    variant="fixed"
                    onClick={() => onClose?.()}
                    {...overlayProps}
                />
            )}
            <div
                {...props}
                className={clsx(
                    drawer({
                        position,
                        size,
                        shadow,
                        open,
                        bg,
                        padding,
                        className: [className, sizeClasses],
                    }),
                    open ? transformClasses.open : transformClasses.closed,
                    className
                )}
            >
                {children}
            </div>
        </>
    );
};
