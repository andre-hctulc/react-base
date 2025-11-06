"use client";

import { type FC, type ComponentProps } from "react";
import { createPortal } from "react-dom";
import { createTheme } from "flowbite-react/helpers/create-theme";
import type { BaseTheme } from "../../util/style.js";
import { useResolveT } from "../../hooks/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        overlay: OverlayTheme;
    }
}

export interface OverlayTheme extends BaseTheme {
    variant: Record<"fixed" | "absolute", string>;
    centerContent: Record<"true" | "false", string>;
    bg: Record<
        | "transparent"
        | "transparent1"
        | "transparent2"
        | "transparent3"
        | "transparent4"
        | "transparent5"
        | "blur_xs"
        | "blur_sm"
        | "blur"
        | "blur_lg",
        string
    >;
    zIndex: Record<"10" | "20" | "30" | "40" | "50" | "none", string>;
    noInteraction: Record<"true", string>;
}

const overlay = createTheme<OverlayTheme>({
    base: "w-full h-full transition-all transition-100 overflow-hidden",
    variant: {
        fixed: "fixed inset-0",
        absolute: "absolute",
    },
    centerContent: {
        true: "flex justify-center items-center",
        false: "",
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
    defaultVariants: {
        variant: "fixed",
        bg: "transparent1",
    },
});

export interface OverlayProps extends ComponentProps<"div"> {
    noInteraction?: boolean;
    /**
     * Portal the popover to the body
     */
    portal?: boolean;
    variant?: keyof OverlayTheme["variant"];
    bg?: keyof OverlayTheme["bg"];
    centerContent?: boolean;
    zIndex?: keyof OverlayTheme["zIndex"];
    theme?: Partial<OverlayTheme>;
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
    theme: customTheme,
    ...props
}) => {
    const { className, restProps } = useResolveT("overlay", overlay, {
        variant,
        bg,
        zIndex,
        noInteraction: noInteraction ? "true" : undefined,
        centerContent: centerContent ? "true" : "false",
        theme: customTheme,
        ...props,
    });

    const over = (
        <div ref={ref} className={className} {...restProps}>
            {children}
        </div>
    );

    if (portal) return createPortal(over, document.body);
    return over;
};
