"use client";

import { collapse } from "@dre44/util/objects";
import clsx from "clsx";
import { useEffect } from "react";
import { tv } from "tailwind-variants";
import type { PropsOf, StyleProps, WithTVProps } from "../../types/index.js";
import { Overlay } from "./overlay.js";

const drawer = tv({
    base: "bg-white shrink-0 border-transparent transition-all duration-300 ease-in-out",
    variants: {
        variant: {
            overlay: "fixed z-30",
            absolute: "absolute z-10",
            embedded: "",
        },
        position: {
            left: "top-0 left-0 h-full border-r-divider",
            right: "top-0 right-0 h-full border-l-divider",
            top: "top-0 left-0 w-full border-b-divider",
            bottom: "bottom-0 left-0 w-full border-t-divider",
        },
        size: {
            sm: "",
            md: "",
            lg: "",
            fit: "",
            auto: "",
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
        zIndex: {
            "10": "z-10",
            "20": "z-20",
            "30": "z-30",
            "40": "z-40",
            "50": "z-50",
            none: "",
        },
        border: {
            true: "border",
            false: "",
            thin: "border-[0.5px]",
        },
    },
    defaultVariants: {
        position: "left",
        size: "md",
        variant: "overlay",
    },
});

type DrawerProps = WithTVProps<
    StyleProps & {
        open: boolean;
        defaultOpen?: boolean;
        onClose?: () => void;
        children?: React.ReactNode;
        overlayProps?: PropsOf<typeof Overlay>;
        variant?: "overlay" | "embedded";
        closeable?: boolean;
        /**
         * Can be used to define a custom class for the transition end state.
         *
         * Only applies if `variant` is set to "embedded".
         */
        transitionEndClassName?: string;
    },
    typeof drawer
>;

export const Drawer: React.FC<DrawerProps> = ({
    open = true,
    onClose,
    position = "left",
    size = "md",
    shadow,
    children,
    className,
    padding,
    overlayProps,
    bg,
    zIndex,
    variant,
    border,
    transitionEndClassName,
    ...props
}) => {
    const isEmbedded = variant === "embedded";
    const isVert = position === "top" || position === "bottom";
    const sizeClasses = isVert
        ? collapse(size, {
              sm: "h-32",
              md: "h-48",
              lg: "h-64",
              fit: "h-fit",
              auto: "",
          })
        : collapse(size, {
              sm: "w-64",
              md: "w-80",
              lg: "w-[28rem]",
              fit: "w-fit",
              auto: "",
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

    const transformClasses = isEmbedded
        ? collapse(position, {
              left: { open: transitionEndClassName || "max-w-[1000px]", closed: "max-w-0" },
              right: { open: transitionEndClassName || "max-w-[1000px]", closed: "max-w-0" },
              top: { open: transitionEndClassName || "max-h-[1000px]", closed: "max-h-0" },
              bottom: { open: transitionEndClassName || "max-h-[1000px]", closed: "max-h-0" },
          })
        : collapse(position, {
              left: { open: "translate-x-0", closed: "-translate-x-full" },
              right: { open: "translate-x-0", closed: "translate-x-full" },
              top: { open: "translate-y-0", closed: "-translate-y-full" },
              bottom: { open: "translate-y-0", closed: "translate-y-full" },
          });

    const main = (
        <div
            {...props}
            onClick={(e) => e.stopPropagation()}
            className={clsx(
                drawer({
                    position,
                    size,
                    shadow: isEmbedded ? shadow : shadow ?? "lg",
                    open,
                    bg,
                    padding,
                    variant,
                    className: [className, sizeClasses],
                    border: isEmbedded ? border ?? true : border,
                }),
                open ? transformClasses.open : transformClasses.closed,
                className
            )}
        >
            {children}
        </div>
    );

    if (isEmbedded) {
        return main;
    }

    return (
        <>
            <Overlay
                noInteraction={!open}
                zIndex="40"
                bg={open ? "blur_xs" : "transparent"}
                variant="fixed"
                onClick={() => onClose?.()}
                {...overlayProps}
            >
                {main}
            </Overlay>
        </>
    );
};
