"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { tv } from "tailwind-variants";
import { Chip } from "./chip";
import { Icon } from "../icons";
import clsx from "clsx";
export const tabs = tv({
    base: "flex flex-wrap",
    variants: {
        variant: {
            chips: "",
            default: "",
        },
        size: {
            sm: "gap-2",
            md: "gap-3",
            lg: "gap-4",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "md",
    },
});
export const Tabs = ({ activeTab, variant, size, className, tabs: tabItems, chipProps, tabProps, onTabClick, LinkComponent, bg, elevated, ...props }) => {
    return (_jsx("div", { ...props, className: tabs({ variant, size, className }), children: tabItems.map((t) => {
            if (t.visible === false)
                return null;
            const isActive = typeof activeTab === "function" ? activeTab(t) : activeTab === t.value;
            if (variant === "chips") {
                const chip = (_jsx(Chip, { icon: t.icon, as: "button", size: size, variant: isActive ? "pale" : "outlined", ...chipProps, onClick: (e) => {
                        onTabClick?.(t);
                        chipProps?.onClick?.(e);
                    }, className: clsx(elevated && "shadow-xs", chipProps?.className), children: t.label }, t.value));
                if (t.href) {
                    const Link = LinkComponent || "a";
                    return (_jsx(Link, { href: t.href, children: chip }, t.value));
                }
                return chip;
            }
            return (_jsx(Tab, { bg: bg, elevated: elevated, size: size, active: isActive, icon: t.icon, href: t.href, disabled: t.disabled, LinkComponent: LinkComponent, ...tabProps, clickable: !!onTabClick || !!tabProps?.onClick || !!t.href, onClick: (e) => {
                    onTabClick?.(t);
                    tabProps?.onClick?.(e);
                }, children: t.label }, t.value));
        }) }));
};
const tab = tv({
    base: [
        "transition flex gap-2 items-center rounded-sm bg-paper2",
        "data-[disabled=false]:hover:text-primary/80",
    ],
    variants: {
        disabled: {
            true: "text-t3",
        },
        active: {
            true: "text-primary",
            false: "text-t2",
        },
        clickable: {
            true: "cursor-pointer",
            false: "cursor-not-allowed",
        },
        size: {
            sm: "text-sm py-1 px-2",
            md: "text-base py-1.5 px-3",
            lg: "text-lg py-2 px-4",
        },
        bg: {
            "1": "bg-paper1",
            "2": "bg-paper2",
            "3": "bg-paper3",
            "4": "bg-paper4",
        },
        elevated: {
            true: "shadow-xs",
        },
    },
    defaultVariants: {
        size: "md",
    },
});
const Tab = ({ children, className, size, active, LinkComponent, href, icon, disabled, onClick, clickable, bg, elevated, ...props }) => {
    const Comp = href && !disabled ? LinkComponent || "a" : "button";
    const p = { ...props, href };
    const canClick = !disabled && (clickable ?? (!!onClick || !!href));
    if (!href)
        delete p.href;
    return (_jsxs(Comp, { ...p, "data-disabled": !!disabled, onClick: disabled ? undefined : onClick, className: tab({ className, size, active, elevated, clickable: canClick, disabled, bg }), children: [icon && _jsx(Icon, { children: icon }), children] }));
};
