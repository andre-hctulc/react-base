"use client";

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { StyleProps } from "../../types/index.js";
import { CollapseH750, CollapseVScreen } from "../transitions/collapse.js";

const menu = tv({
    base: "bg-paper box-border h-full shrink-0 min-h-0 overflow-y-auto border-transparent",
    variants: {
        elevated: {
            "1": "bg-paper",
            "2": "bg-paper2",
            "3": "bg-paper3",
            "4": "bg-paper4",
        },
        size: {
            none: "",
            auto: "w-auto",
            sm: "w-[250px]",
            md: "w-[350px]",
            lg: "w-[450px]",
            xl: "w-[600px]",
            full: "w-full",
        },
        flex: {
            col: "flex flex-col",
            row: "flex flex-row",
        },
        variant: {
            embedded: "",
            absolute: "absolute",
        },
        sticky: {
            // height must be auto and align must be start for sticky to work (especially in flex context)
            true: "sticky top-0 h-auto",
        },
        height: {
            full: "h-full",
            screen: "h-screen",
        },
        position: {
            left: "left-0 border-r-divider",
            right: "right-0 border-l-divider",
            none: "border-r-divider",
        },
        border: {
            thin: "border-[0.5px]",
            base: "border",
        },
        padding: {
            none: "",
            "2xs": "p-0.5",
            xs: "p-1",
            sm: "p-1.5",
            md: "p-2",
            lg: "p-4",
            xl: "p-6",
            "2xl": "p-8",
            "3xl": "p-10",
        },
        shadow: {
            none: "",
            sm: "shadow-xs",
            base: "shadow-sm",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
            "2xl": "shadow-2xl",
        },
        bg: {
            none: "",
            "1": "bg-paper",
            "2": "bg-paper2",
            "3": "bg-paper3",
            "5": "bg-paper4",
        },
    },
    defaultVariants: {
        size: "md",
        position: "none",
        variant: "embedded",
    },
});

interface MenuProps extends VariantProps<typeof menu>, StyleProps {
    children?: React.ReactNode;
    /**
     * @default true
     * */
    open?: boolean;
    as?: any;
    onClose?: () => void;
    animationDirection?: "vertical" | "horizontal";
}

export const Menu: React.FC<MenuProps> = ({
    children,
    style,
    className,
    size,
    as,
    open,
    position,
    shadow,
    border,
    sticky,
    height,
    variant,
    elevated,
    flex,
    padding,
    animationDirection,
    bg,
}) => {
    const Comp = as || "div";
    const show = open ?? true;
    const Transition = animationDirection === "horizontal" ? CollapseH750 : CollapseVScreen;

    return (
        <Transition appear={false} show={show}>
            <Comp
                className={menu({
                    className,
                    padding,
                    size,
                    position,
                    shadow,
                    border,
                    sticky,
                    height,
                    variant,
                    elevated,
                    flex,
                    bg,
                })}
                style={style}
            >
                {children}
            </Comp>
        </Transition>
    );
};
