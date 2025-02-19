"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import React from "react";
import { tv } from "tailwind-variants";
import { IconButton, Tool } from "../input";
import { Toolbar } from "./toolbar";
import clsx from "clsx";
import { Icon } from "../icons";
import { Spinner } from "../data-display/spinner";
import { withPrefix } from "../../util/system";
const list = tv({
    base: "rounded-sm flex",
    variants: {
        elevate: {
            "1": "bg-paper1",
            "2": "bg-paper2",
            "3": "bg-paper3",
        },
        padding: {
            none: "",
            "2xs": "p-0.5",
            xs: "p-1",
            sm: "p-1.5",
            md: "p-2",
            lg: "p-4",
            xl: "p-3",
            "2xl": "p-4",
            "3xl": "p-5",
        },
        gap: {
            none: "",
            xs: "gap-0.5",
            sm: "gap-1",
            md: "gap-1.5",
            lg: "gap-2",
            xl: "gap-3",
            "2xl": "gap-4",
            "3xl": "gap-5",
        },
        rounded: {
            sm: "overflow-hidden rounded-sm",
            md: "overflow-hidden rounded-md",
            lg: "overflow-hidden rounded-lg",
        },
        direction: {
            row: "flex-row",
            col: "flex-col items-center",
        },
    },
    defaultVariants: {
        variant: "default",
        direction: "col",
    },
});
export const List = React.forwardRef(({ className, items, style, onItemClick, children, variant, activeKey, size, LinkComponent, rounded, direction, as, iconButtonProps, listItemProps, elevate, gap, padding, ...props }, ref) => {
    const Comp = as || "ul";
    return (_jsxs(Comp, { ref: ref, className: list({
            className,
            direction,
            padding: padding ?? (size || "md"),
            elevate,
            rounded,
            gap,
        }), ...props, children: [children, items?.map((item) => {
                const active = item.active ??
                    (typeof activeKey === "function" ? activeKey(item) : item.key === activeKey);
                if (variant === "icons") {
                    const btn = (_createElement(IconButton, { size: size === "xl" ? "lg" : size, loading: item.loading, variant: "text", color: active ? "black" : "neutral", ...iconButtonProps, key: item.key, className: clsx(active && "bg-transparent2", iconButtonProps?.className), onClick: (e) => {
                            onItemClick?.(item);
                            iconButtonProps?.onClick?.(e);
                        }, disabled: item.disabled }, item.icon));
                    if (item.href) {
                        const Link = LinkComponent || "a";
                        return (_jsx(Link, { href: item.href, children: btn }, item.key));
                    }
                    return btn;
                }
                return (_jsx(ListItem, { as: "li", loading: item.loading, LinkComponent: LinkComponent, size: size || "md", disabled: item.disabled, icon: item.icon, active: active, tools: item.tools, href: item.href, variant: item.variant, ...listItemProps, className: clsx(item.className, listItemProps?.className), onClick: (e) => {
                        item.onClick?.(e);
                        onItemClick?.(item);
                        listItemProps?.onClick?.(e);
                    }, clickable: item.clickable ||
                        !!item.onClick ||
                        !!listItemProps?.onClick ||
                        listItemProps?.clickable ||
                        !!item.href, children: item.label }, item.key));
            })] }));
});
List.displayName = withPrefix("List");
const listItem = tv({
    base: "w-full transition duration-75",
    variants: {
        rounded: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        },
        clickable: {
            true: "cursor-pointer active:brightness-50",
        },
        variant: {
            danger: "",
            default: "",
            secondary: "",
        },
        effects: {
            true: "",
        },
    },
    compoundVariants: [
        {
            variant: "danger",
            effects: true,
            class: "text-error hover:bg-error/5 data-[active=true]:bg-error/10",
        },
        {
            variant: "default",
            effects: true,
            class: "hover:bg-transparent1 data-[active=true]:bg-transparent2",
        },
        {
            variant: "secondary",
            effects: true,
            class: "text-t2 hover:bg-neutral/5 data-[active=true]:bg-neutral/10",
        },
    ],
    defaultVariants: {
        variant: "default",
        effects: true,
        rounded: "md",
    },
});
const listItemInner = tv({
    base: "w-full flex box-border transition duration-100",
    variants: {
        size: {
            sm: "text-xs px-2 gap-2 py-1",
            md: "text-[15px] px-3 gap-3 py-1.5",
            lg: "text-[15px] px-4 gap-4 py-2",
            xl: "text-[15px] px-5 gap-4 py-3",
        },
    },
    defaultVariants: {
        size: "md",
    },
});
export const ListItem = React.forwardRef(({ children, onClick, className, active, style, tools, href, LinkComponent, loading, variant, size, innerProps, effects, disabled, iconProps, ...props }, ref) => {
    const Link = LinkComponent || "a";
    const icon = loading ? _jsx(Spinner, { color: variant === "danger" ? "error" : "neutral" }) : props.icon;
    const clickHandler = loading ? undefined : onClick;
    const Comp = props.as || "div";
    const Inner = href ? Link : "div";
    const _innerProps = href ? { ...innerProps, href } : innerProps;
    const _disabled = loading || disabled;
    const interactive = _disabled ? false : props.clickable ?? (!!onClick || !!href);
    const iconSize = size === "sm" ? "sm" : size === "lg" || size === "xl" ? "xl" : "md";
    return (_jsx(Comp, { ref: ref, "data-active": active, className: listItem({
            effects,
            variant,
            className,
            clickable: interactive,
        }), "data-reactive": true, onClick: _disabled ? undefined : clickHandler, style: style, children: _jsxs(Inner, { className: listItemInner({ size }), ..._innerProps, children: [icon ? (_jsx(Icon, { className: "self-center", size: iconSize, children: icon })) : null, typeof children === "string" ? (_jsx("span", { className: "grow truncate", children: children })) : (children), tools?.length && (_jsx(Toolbar, { justify: "end", gap: "sm", children: tools?.map(({ key, ...tool }) => (_jsx(Tool, { variant: "text", size: "sm", color: "neutral", ...tool }, key))) }))] }) }));
});
ListItem.displayName = withPrefix("ListItem");
