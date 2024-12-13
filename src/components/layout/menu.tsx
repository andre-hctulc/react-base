"use client";

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { StyleProps } from "../../types";
import { CollapseH } from "../transitions";
import { IconButton } from "../input";
import { XIcon } from "../icons/x";

const menu = tv({
    base: "box-border w-full h-full flex-shrink-0",
    variants: {
        size: {
            none: "",
            auto: "w-auto",
            sm: "w-[250px]",
            md: "w-[350px]",
            lg: "w-[450px]",
            xl: "w-[600px]",
        },
        sticky: {
            // height must be auto and align must be start for sticky to work (especially in flex context)
            true: "sticky top-0 h-auto",
        },
        heightScreen: {
            true: "h-screen",
        },
        position: {
            left: "left-0 self-start",
            right: "right-0 ml-auto self-end",
        },
        border: {
            true: "",
        },
        shadow: {
            none: "",
            sm: "shadow-sm",
            base: "shadow",
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
            position: ["left"],
            border: true,
            class: "border-r",
        },
    ],
    defaultVariants: {
        size: "md",
        position: "left",
        border: true,
    },
});

interface MenuProps extends VariantProps<typeof menu>, StyleProps {
    children?: React.ReactNode;
    /** @default true */
    closable?: boolean;
    open?: boolean;
    as?: any;
    onClose?: () => void;
}

export const Menu: React.FC<MenuProps> = ({
    children,
    style,
    className,
    size,
    as,
    open,
    closable,
    position,
    shadow,
    border,
    sticky,
    heightScreen,
    onClose,
}) => {
    const Comp = as || "div";

    return (
        <CollapseH show={open !== false}>
            <Comp
                className={menu({
                    className,
                    size,
                    position,
                    shadow,
                    border,
                    sticky,
                    heightScreen,
                })}
                style={style}
            >
                {closable && (
                    <div className="p-3">
                        <IconButton className="ml-auto" onClick={() => onClose?.()}>
                            <XIcon />
                        </IconButton>
                    </div>
                )}
                {children}
            </Comp>
        </CollapseH>
    );
};
