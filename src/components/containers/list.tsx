"use client";

import React from "react";
import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import { IconButton, Tool, type ToolItem } from "../input";
import type { LinkComponent, PropsOf, TVCProps } from "../../types";
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

export interface ListProps extends TVCProps<typeof list, "ol" | "ul"> {
    children?: React.ReactNode;
    items?: ListItem[];
    onItemClick?: (item: ListItem) => void;
    activeKey?: string | ((item: ListItem) => boolean);
    size?: "sm" | "md" | "lg" | "xl";
    LinkComponent?: LinkComponent;
    loading?: boolean;
    variant?: "icons" | "default";
    iconButtonProps?: Partial<PropsOf<typeof IconButton>>;
    listItemProps?: Partial<PropsOf<typeof ListItem>>;
    /**
     * @default "ul"
     */
    as?: "ol" | "ul";
}

export const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
    (
        {
            className,
            items,
            style,
            onItemClick,
            children,
            variant,
            activeKey,
            size,
            LinkComponent,
            rounded,
            direction,
            as,
            iconButtonProps,
            listItemProps,
            elevate,
            gap,
            padding,
            ...props
        },
        ref
    ) => {
        const Comp: any = as || "ul";

        return (
            <Comp
                ref={ref}
                className={list({
                    className,
                    direction,
                    padding: padding ?? (size || "md"),
                    elevate,
                    rounded,
                    gap,
                })}
                {...props}
            >
                {children}
                {items?.map(item => {
                    const active = item.active ?? (typeof activeKey === "function" ? activeKey(item) : item.key === activeKey);

                    if (variant === "icons") {
                        const btn = (
                            <IconButton
                                size={size === "xl" ? "lg" : size}
                                loading={item.loading}
                                variant="text"
                                color={active ? "black" : "neutral"}
                                {...iconButtonProps}
                                key={item.key}
                                className={clsx(active && "bg-transparent2", iconButtonProps?.className as any)}
                                onClick={e => {
                                    onItemClick?.(item);
                                    iconButtonProps?.onClick?.(e);
                                }}
                                disabled={item.disabled}
                            >
                                {item.icon}
                            </IconButton>
                        );

                        if (item.href) {
                            const Link = LinkComponent || "a";
                            return (
                                <Link key={item.key} href={item.href}>
                                    {btn}
                                </Link>
                            );
                        }

                        return btn;
                    }

                    return (
                        <ListItem
                            as="li"
                            loading={item.loading}
                            LinkComponent={LinkComponent}
                            size={size || "md"}
                            key={item.key}
                            disabled={item.disabled}
                            icon={item.icon}
                            active={active}
                            tools={item.tools}
                            href={item.href}
                            variant={item.variant}
                            {...listItemProps}
                            className={clsx(item.className, listItemProps?.className as any)}
                            onClick={e => {
                                item.onClick?.(e);
                                onItemClick?.(item);
                                listItemProps?.onClick?.(e);
                            }}
                            clickable={item.clickable || !!item.onClick || !!listItemProps?.onClick || listItemProps?.clickable || !!item.href}
                        >
                            {item.label}
                        </ListItem>
                    );
                })}
            </Comp>
        );
    }
);

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

export interface ListItem {
    key: string;
    label: React.ReactNode;
    className?: string;
    data?: any;
    icon?: React.ReactNode;
    /**
     * Takes precedence over `activeKey` in `List`
     */
    active?: boolean;
    tools?: ToolItem[];
    color?: string;
    loading?: boolean;
    href?: string;
    variant?: "danger" | "default";
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
    /**
     * @default !!onClick
     */
    clickable?: boolean;
}

interface ListItemProps extends VariantProps<typeof listItem>, VariantProps<typeof listItemInner> {
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
    className?: ClassValue;
    style?: React.CSSProperties;
    active?: boolean;
    icon?: React.ReactNode;
    key?: string;
    tools?: ToolItem[];
    href?: string;
    LinkComponent?: LinkComponent;
    innerProps?: any;
    loading?: boolean;
    /**
     * @default "div"
     */
    as?: any;
    disabled?: boolean;
    /**
     * Apply clickable styles? Defaults to true when {@link onClick} or {@link href} is provided.
     */
    clickable?: boolean;
    iconProps?: PropsOf<typeof Icon>;
}

export const ListItem = React.forwardRef<HTMLElement, ListItemProps>(
    ({ children, onClick, className, active, style, tools, href, LinkComponent, loading, variant, size, innerProps, effects, disabled, iconProps, ...props }, ref) => {
        const Link = LinkComponent || "a";
        const icon = loading ? <Spinner color={variant === "danger" ? "error" : "neutral"} /> : props.icon;
        const clickHandler = loading ? undefined : onClick;
        const Comp: any = props.as || "div";
        const Inner: any = href ? Link : "div";
        const _innerProps = href ? { ...innerProps, href } : innerProps;
        const _disabled = loading || disabled;
        const interactive = _disabled ? false : props.clickable ?? (!!onClick || !!href);
        const iconSize = size === "sm" ? "sm" : size === "lg" || size === "xl" ? "xl" : "md";

        return (
            <Comp
                ref={ref}
                data-active={active}
                className={listItem({
                    effects,
                    variant,
                    className,
                    clickable: interactive,
                })}
                data-reactive={true}
                onClick={_disabled ? undefined : clickHandler}
                style={style}
            >
                <Inner className={listItemInner({ size })} {..._innerProps}>
                    {icon ? (
                        <Icon className="self-center" size={iconSize}>
                            {icon}
                        </Icon>
                    ) : null}
                    {typeof children === "string" ? <span className="grow truncate">{children}</span> : children}
                    {tools?.length && (
                        <Toolbar justify="end" gap="sm">
                            {tools?.map(({ key, ...tool }) => (
                                <Tool variant="text" size="sm" color="neutral" key={key} {...tool} />
                            ))}
                        </Toolbar>
                    )}
                </Inner>
            </Comp>
        );
    }
);

ListItem.displayName = withPrefix("ListItem");
