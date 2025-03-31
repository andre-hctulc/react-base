"use client";

import React, { type FC } from "react";
import { tv } from "tailwind-variants";
import type { LinkComponent, PropsOf, TVCProps } from "../../types/index.js";
import clsx from "clsx";
import { withPrefix } from "../../util/system.js";
import { IconButton } from "../input/icon-button.js";
import { ListItem } from "./list-item.js";
import { populateProps } from "../../util/react.js";

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

export const List: FC<ListProps> = ({
    className,
    items,
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
    ref,
    ...props
}) => {
    const Comp: any = as || "ul";
    const linkItemProps = { LinkComponent, ...listItemProps };

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
            {populateProps(children, linkItemProps, (el) => el.type === ListItem)}
            {items?.map((item) => {
                const active =
                    item.active ??
                    (typeof activeKey === "function" ? activeKey(item) : item.key === activeKey);

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
                            onClick={(e) => {
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
                        size={size || "md"}
                        key={item.key}
                        disabled={item.disabled}
                        icon={item.icon}
                        active={active}
                        tools={item.tools}
                        href={item.href}
                        variant={item.variant}
                        {...linkItemProps}
                        className={clsx(item.className, listItemProps?.className as any)}
                        onClick={(e) => {
                            item.onClick?.(e);
                            onItemClick?.(item);
                            listItemProps?.onClick?.(e);
                        }}
                        clickable={
                            item.clickable ||
                            !!item.onClick ||
                            !!listItemProps?.onClick ||
                            listItemProps?.clickable ||
                            !!item.href
                        }
                    >
                        {item.label}
                    </ListItem>
                );
            })}
        </Comp>
    );
};

List.displayName = withPrefix("List");
