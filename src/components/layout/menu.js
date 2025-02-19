"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { tv } from "tailwind-variants";
import { CollapseH1000, CollapseVScreen } from "../transitions";
import { IconButton } from "../input";
import { XIcon } from "../icons/x";
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
        },
        flex: {
            true: "flex flex-col",
        },
        variant: {
            embedded: "",
            overlay: "w-full absolute h-full z-30 shadow-lg",
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
export const Menu = ({ children, style, className, size, as, open, closable, position, shadow, border, sticky, heightScreen, onClose, variant, elevated, flex, }) => {
    const Comp = as || "div";
    const main = (_jsxs(Comp, { className: menu({
            className,
            size,
            position,
            shadow,
            border,
            sticky,
            heightScreen,
            variant,
            elevated,
            flex,
        }), style: style, children: [closable && (_jsx("div", { className: "p-3", children: _jsx(IconButton, { className: "ml-auto", onClick: () => onClose?.(), children: _jsx(XIcon, {}) }) })), children] }));
    const show = open ?? true;
    if (variant === "overlay") {
        return (_jsx(CollapseVScreen, { appear: false, show: show, children: main }));
    }
    return (_jsx(CollapseH1000, { appear: false, show: show, children: main }));
};
