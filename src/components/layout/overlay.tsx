"use client";

import { type FC, type ComponentProps } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/util/cn/cn.util.js";
import { cva, type VariantProps } from "class-variance-authority";

const overlayVariants = cva("w-full h-full transition-all transition-100 overflow-hidden", {
    variants: {
        variant: {
            fixed: "fixed inset-0",
            absolute: "absolute",
        },
        bg: {
            transparent: "",
            transparent1: "bg-black/10",
            transparent2: "bg-black/20",
            transparent3: "bg-black/30",
            transparent4: "bg-black/40",
            transparent5: "bg-black/50",
            blur_xs: "bg-black/10 backdrop-blur-xs",
            blur_sm: "bg-black/10 backdrop-blur-sm",
            blur: "bg-black/10 backdrop-blur-md",
            blur_lg: "bg-black/10 backdrop-blur-lg",
        },
        zIndex: { "10": "z-10", "20": "z-20", "30": "z-30", "40": "z-40", "50": "z-50", none: "" },
        centerContent: { true: "flex justify-center items-center", false: "" },
        noInteraction: { true: "pointer-events-none", false: "" },
    },
    defaultVariants: { variant: "fixed", bg: "transparent1" },
});

export type OverlayProps = ComponentProps<"div"> &
    VariantProps<typeof overlayVariants> & {
        /** Portal the overlay to the body */
        portal?: boolean;
    };

/**
 * ### Props
 * - `portal` - Render this overlay in the body
 */
export const Overlay: FC<OverlayProps> = ({
    children,
    variant,
    noInteraction,
    bg,
    portal,
    centerContent,
    zIndex,
    ref,
    className,
    ...props
}) => {
    const over = (
        <div
            ref={ref}
            className={cn(overlayVariants({ variant, bg, zIndex, centerContent, noInteraction }), className)}
            {...props}
        >
            {children}
        </div>
    );

    if (portal) return createPortal(over, document.body);
    return over;
};
