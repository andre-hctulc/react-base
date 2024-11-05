"use client";

import React from "react";
import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import { IconButton, Tool, type ToolItem } from "../input";
import type { TVCProps } from "../../types";
import { Toolbar } from "./toolbar";

export interface MenuItem {
    key: string;
    label: React.ReactNode;
    className?: string;
    data?: any;
    icon?: React.ReactNode;
    active?: boolean;
    tools?: ToolItem[];
    color?: string;
}

const menu = tv({
    base: "rounded",
    variants: {
        elevate: {
            1: "bg-elevate-1",
            2: "bg-elevate-2",
            3: "bg-elevate-3",
        },
        size: {
            sm: "space-y-0.5",
            md: "space-y-1",
            lg: "space-y-1.5",
        },
        variant: {
            icons: "flex flex-column items-center",
            default: "",
        },
    },
    defaultVariants: {
        size: "md",
        variant: "default",
    },
});

interface MenuProps extends TVCProps<typeof menu, "ol"> {
    children?: React.ReactNode;
    items?: MenuItem[];
    onItemClick?: (item: MenuItem) => void;
    activeKey?: string;
}

export const Menu: React.FC<MenuProps> = ({
    className,
    items,
    style,
    onItemClick,
    children,
    size,
    variant,
    activeKey,
    ...props
}) => {
    return (
        <ol className={menu({ className: [className], size, elevate: props.elevate })} {...props}>
            {children}
            {items?.map((item) => {
                const active = item.active || item.key === activeKey;

                if (variant === "icons") {
                    return (
                        <IconButton
                            key={item.key}
                            onClick={() => onItemClick?.(item)}
                            variant="text"
                            color={active ? "black" : "neutral"}
                            className={active && "bg-transparent-2"}
                        >
                            {item.icon}
                        </IconButton>
                    );
                }

                return (
                    <MenuItem
                        size={size}
                        key={item.key}
                        className={item.className}
                        onClick={onItemClick ? () => onItemClick(item) : undefined}
                        icon={item.icon}
                        active={active}
                        tools={item.tools}
                    >
                        {item.label}
                    </MenuItem>
                );
            })}
        </ol>
    );
};

const menuItem = tv({
    base: "rounded hover:bg-transparent-1 flex w-full box-border transition gap-2",
    variants: {
        size: {
            sm: "text-xs",
            md: "text-[15px]",
            lg: "text-base",
            xl: "text-lg",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

interface MenuItemProps extends VariantProps<typeof menuItem> {
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
    className?: ClassValue;
    style?: React.CSSProperties;
    active?: boolean;
    icon?: React.ReactNode;
    key?: string;
    tools?: ToolItem[];
}

export const MenuItem: React.FC<MenuItemProps> = ({
    children,
    onClick,
    className,
    active,
    style,
    tools,
    ...props
}) => {
    return (
        <li
            className={menuItem({
                className: [active && "bg-transparent-1", onClick && "cursor-pointer", className],
                size: props.size,
            })}
            onClick={onClick}
            style={style}
        >
            <div className="rounded-l active:bg-transparent-1 gap-2 flex-grow flex items-center px-3 py-1.5">
                {props.icon ? <span className="mr-2">{props.icon}</span> : null}
                {children}
            </div>
            {tools?.length && (
                <Toolbar justify="end" gap="sm" className="mr-2">
                    {tools?.map(({ key, ...tool }) => (
                        <Tool variant="text" size="sm" color="neutral" key={key} {...tool} />
                    ))}
                </Toolbar>
            )}
        </li>
    );
};
