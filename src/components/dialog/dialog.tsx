"use client";

import { Dialog as BaseDialog, DialogPanel } from "@headlessui/react";
import { tv, type VariantProps } from "tailwind-variants";
import type { XStyleProps } from "../../types";
import clsx from "clsx";
import { useIsHydrated } from "../../hooks";
import { createPortal } from "react-dom";

const dialog = tv({
    base: "relative z-10 focus:outline-none",
    variants: {},
    defaultVariants: {
        variant: "default",
    },
});

const dialogPanel = tv({
    base: "max-w-full bg max-w-md rounded-xl backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0",
    variants: {
        size: {
            sm: "w-[300px]",
            md: "w-[500px]",
            lg: "w-[700px]",
            auto: "",
        },
        shadow: {
            sm: "shadow-sm",
            md: "shadow",
            lg: "shadow-md",
            xl: "shadow-lg",
        },
    },
    defaultVariants: {
        size: "md",
        shadow: "lg",
    },
});

interface DialogProps extends VariantProps<typeof dialog>, VariantProps<typeof dialogPanel>, XStyleProps {
    open: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    loading?: boolean;
    variant?: "transparent" | "default";
}

export const Dialog: React.FC<DialogProps> = ({ open, children, className, loading, variant, ...props }) => {
    const mounted = useIsHydrated();

    if (!mounted) return null;

    return createPortal(
        <BaseDialog
            open={open}
            as="div"
            className={dialog({ className })}
            style={props.style}
            onClose={() => props.onClose?.()}
        >
            <div
                data-open={open}
                className={clsx(
                    "fixed inset-0 z-40 w-screen overflow-y-auto transition duration-500",
                    variant == "transparent" ? "" : "data-[open=true]:bg-black/20"
                )}
            >
                <div className="flex h-screen items-center justify-center p-4 box-border">
                    <DialogPanel
                        transition
                        className={dialogPanel({ size: props.size, shadow: props.shadow })}
                    >
                        <div>{children}</div>
                    </DialogPanel>
                </div>
            </div>
        </BaseDialog>,
        document.body
    );
};
