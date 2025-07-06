import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types/index.js";
import { type FC } from "react";
import { createPortal } from "react-dom";

const overlay = tv({
    base: "w-full h-full transition",
    variants: {
        position: {
            fixed: "fixed inset-0",
            absolute: "absolute",
        },
        variant: {
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
        position: "fixed",
        variant: "transparent1",
    },
});

interface OverlayProps extends TVCProps<typeof overlay, "div"> {
    children?: React.ReactNode;
    noInteraction?: boolean;
    /**
     * Portal the popover to the body
     */
    portal?: boolean;
}

/**
 * ### Props
 * - `portal` - Render this overlay in the body
 */
export const Overlay: FC<OverlayProps> = ({
    children,
    className,
    position,
    noInteraction,
    variant,
    portal,
    zIndex,
    ref,
    ...props
}) => {
    const over = (
        <div
            ref={ref}
            className={overlay({
                className,
                position,
                variant,
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
};
