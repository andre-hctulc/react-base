"use client";

import { type FC, type ComponentProps } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/util/cn.js";
import { collapse } from "@dre44/util/objects";

const variantMap = {
    fixed: "fixed inset-0",
    absolute: "absolute",
} as const;

const bgMap = {
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
} as const;

const zIndexMap = {
    "10": "z-10",
    "20": "z-20",
    "30": "z-30",
    "40": "z-40",
    "50": "z-50",
    none: "",
} as const;

export interface OverlayProps extends ComponentProps<"div"> {
    noInteraction?: boolean;
    /** Portal the overlay to the body */
    portal?: boolean;
    variant?: keyof typeof variantMap;
    bg?: keyof typeof bgMap;
    centerContent?: boolean;
    zIndex?: keyof typeof zIndexMap;
}

/**
 * ### Props
 * - `portal` - Render this overlay in the body
 */
export const Overlay: FC<OverlayProps> = ({
    children,
    variant = "fixed",
    noInteraction,
    bg = "transparent1",
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
            className={cn(
                "w-full h-full transition-all transition-100 overflow-hidden",
                collapse(variantMap, variant),
                collapse(bgMap, bg),
                centerContent && "flex justify-center items-center",
                zIndex && collapse(zIndexMap, zIndex!),
                noInteraction && "pointer-events-none",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );

    if (portal) return createPortal(over, document.body);
    return over;
};
