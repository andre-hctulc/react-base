"use client";

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { StyleProps } from "../../types/index.js";
import { CollapseH750 } from "../transitions/collapse.js";

const menu = tv({
    base: "bg-paper box-border h-full shrink-0 min-h-0 overflow-y-auto",
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
            left: "left-0",
            right: "right-0",
        },
        border: {
            true: "",
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
    },
    compoundVariants: [
        {
            position: "right",
            border: true,
            class: "border-l",
        },
        {
            position: "left",
            border: true,
            class: "border-r",
        },
    ],
    defaultVariants: {
        size: "md",
        position: "left",
        border: true,
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
}) => {
    const Comp = as || "div";
    const show = open ?? true;

    return (
        <CollapseH750 appear={false} show={show}>
            <Comp
                className={menu({
                    className,
                    size,
                    position,
                    shadow,
                    border,
                    sticky,
                    height,
                    variant,
                    elevated,
                    flex,
                })}
                style={style}
            >
                {children}
            </Comp>
        </CollapseH750>
    );
};
