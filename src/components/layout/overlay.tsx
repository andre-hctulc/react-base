import { tv } from "tailwind-variants";
import type { TVCProps, XStyleProps } from "../../types";
import React from "react";
import { withPrefix } from "../../util/system";

const overlay = tv({
    base: "w-full h-full transition",
    variants: {
        variant: {
            fixed: "fixed top-0 left-0",
            absolute: "absolute",
        },
        bg: {
            transparent: "",
            1: "bg-black/10",
            2: "bg-white/20",
            3: "bg-white/30",
            4: "bg-white/40",
            5: "bg-white/50",
        },
    },
    defaultVariants: {
        variant: "fixed",
        bg: 1,
    },
});

interface OverlayProps extends TVCProps<typeof overlay, "div"> {
    children?: React.ReactNode;
    noInteraction?: boolean;
}

export const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
    ({ children, className, variant, noInteraction, bg, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={overlay({
                    className: [noInteraction && "pointer-events-none", className],
                    variant,
                    bg,
                })}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Overlay.displayName = withPrefix("Overlay");
