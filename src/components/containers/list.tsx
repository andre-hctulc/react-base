"use client";

import React from "react";
import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import { IconButton, Tool, type ToolItem } from "../input";
import type { LinkComponent, TVCProps } from "../../types";
import { Toolbar } from "./toolbar";
import clsx from "clsx";
import { Icon } from "../icons";
import { Spinner } from "../data-display/spinner";
import { withPrefix } from "../../util/system";

const list = tv({
    base: "rounded flex",
    variants: {
        elevate: {
            "1": "bg-elevate-1",
            "2": "bg-elevate-2",
            "3": "bg-elevate-3",
        },
        gap: {
            none: "",
            sm: "gap-0.5",
            md: "gap-1",
            lg: "gap-1.5",
            xl: "gap-2",
            "2xl": "gap-3",
            "3xl": "gap-4",
            "4xl": "gap-5",
        },
        rounded: {
            sm: "overflow-hidden rounded-sm",
            base: "overflow-hidden rounded",
            md: "overflow-hidden rounded-md",
            lg: "overflow-hidden rounded-lg",
        },
        direction: {
            row: "flex-row",
            col: "flex-col items-center",
        },
    },
    defaultVariants: {
        gap: "none",
        variant: "default",
        direction: "col",
    },
});

interface ListProps extends TVCProps<typeof list, "ol" | "ul"> {
    children?: React.ReactNode;
    items?: ListItem[];
    onItemClick?: (item: ListItem) => void;
    activeKey?: string;
    size?: "sm" | "md" | "lg" | "xl";
    LinkComponent?: LinkComponent;
    loading?: boolean;
    variant?: "icons" | "default";
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
            gap,
            variant,
            activeKey,
            size,
            LinkComponent,
            rounded,
            direction,
            as,
            ...props
        },
        ref
    ) => {
        const Comp: any = as || "ul";

        return (
            <Comp
                ref={ref}
                className={list({ className, direction, gap, elevate: props.elevate, rounded })}
                {...props}
            >
                {children}
                {items?.map((item) => {
                    const active = item.active || item.key === activeKey;

                    if (variant === "icons") {
                        const btn = (
                            <IconButton
                                size={size === "xl" ? "lg" : size}
                                loading={item.loading}
                                key={item.key}
                                onClick={() => onItemClick?.(item)}
                                variant="text"
                                color={active ? "black" : "neutral"}
                                className={active && "bg-transparent-2"}
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
                            className={item.className}
                            onClick={onItemClick ? () => onItemClick(item) : undefined}
                            icon={item.icon}
                            active={active}
                            tools={item.tools}
                            href={item.href}
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
    base: "flex w-full box-border transition duration-100",
    variants: {
        size: {
            sm: "text-xs",
            md: "text-[15px]",
            lg: "text-base",
            xl: "text-lg",
        },
        variant: {
            danger: "text-error hover:bg-error/5 data-[active=true]:bg-error/10",
            default: "hover:bg-transparent-1 data-[active=true]:bg-transparent-2",
        },
    },
    defaultVariants: {
        size: "md",
        variant: "default",
    },
});

export interface ListItem {
    key: string;
    label: React.ReactNode;
    className?: string;
    data?: any;
    icon?: React.ReactNode;
    active?: boolean;
    tools?: ToolItem[];
    color?: string;
    loading?: boolean;
    href?: string;
    variant?: "danger" | "default";
}

interface ListItemProps extends VariantProps<typeof listItem> {
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
    loading?: boolean;
    /**
     * @default "div"
     */
    as?: any;
}

export const ListItem = React.forwardRef<HTMLElement, ListItemProps>(
    (
        {
            children,
            onClick,
            className,
            active,
            style,
            tools,
            href,
            LinkComponent,
            loading,
            variant,
            ...props
        },
        ref
    ) => {
        const Link = LinkComponent || "a";
        const strChildren = typeof children === "string";
        const textClasses = "flex-grow truncate py-1.5";
        const icon = loading ? <Spinner /> : props.icon;
        const clickHandler = loading ? undefined : onClick;
        const rawChildren = !href && typeof children !== "string";
        const Comp: any = props.as || "div";

        return (
            <Comp
                ref={ref}
                data-active={active}
                className={listItem({
                    variant,
                    className: [clickHandler && "cursor-pointer", className],
                    size: props.size,
                })}
                data-reactive={true}
                onClick={clickHandler}
                style={style}
            >
                <div className={clsx("gap-3 flex-grow flex px-3", rawChildren && "py-1.5")}>
                    {icon ? (
                        <Icon className="self-center" size="md">
                            {icon}
                        </Icon>
                    ) : null}
                    {href ? (
                        <Link href={href} className={clsx("block", strChildren && textClasses)}>
                            {children}
                        </Link>
                    ) : typeof children === "string" ? (
                        <span className={textClasses}>{children}</span>
                    ) : (
                        children
                    )}
                </div>
                {tools?.length && (
                    <Toolbar justify="end" gap="sm" className="mx-2">
                        {tools?.map(({ key, ...tool }) => (
                            <Tool variant="text" size="sm" color="neutral" key={key} {...tool} />
                        ))}
                    </Toolbar>
                )}
            </Comp>
        );
    }
);

ListItem.displayName = withPrefix("ListItem");
