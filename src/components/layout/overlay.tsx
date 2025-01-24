import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types";
import React from "react";
import { withPrefix } from "../../util/system";
import { createPortal } from "react-dom";

const overlay = tv({
    base: "w-full h-full transition",
    variants: {
        variant: {
            fixed: "fixed top-0 left-0",
            absolute: "absolute",
        },
        bg: {
            transparent: "",
            "transparent-1": "bg-black/10",
            "transparent-2": "bg-black/20",
            "transparent-3": "bg-black/30",
            "transparent-4": "bg-black/40",
            "transparent-5": "bg-black/50",
        },
        zIndex: {
            "10": "z-10",
            "20": "z-20",
            "30": "z-30",
            "40": "z-40",
            "50": "z-50",
            none: "",
        },
        noInteraction: {
            true: "pointer-events-none",
        },
    },
    defaultVariants: {
        variant: "fixed",
        bg: "transparent-1",
    },
});

interface OverlayProps extends TVCProps<typeof overlay, "div"> {
    children?: React.ReactNode;
    noInteraction?: boolean;
    /**
     * Render this overlay in the body
     */
    portal?: boolean;
}

/**
 * ### Props
 * - `portal` - Render this overlay in the body
 */
export const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
    ({ children, className, variant, noInteraction, bg, portal, zIndex, ...props }, ref) => {
        const over = (
            <div
                ref={ref}
                className={overlay({
                    className,
                    variant,
                    bg,
                    zIndex,
                    noInteraction,
                })}
                {...props}
            >
                {children}
            </div>
        );

        if (portal) return createPortal(over, document.body);
        return over;
    }
);

Overlay.displayName = withPrefix("Overlay");
