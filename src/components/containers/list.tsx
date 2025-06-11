"use client";

import React, { type FC, type MouseEvent } from "react";
import { tv } from "tailwind-variants";
import type { LinkComponent, PartialPropsOf, PropsOf, TVCProps } from "../../types/index.js";
import clsx from "clsx";
import { withPrefix } from "../../util/system.js";
import { IconButton } from "../input/icon-button.js";
import { ListItem } from "./list-item.js";
import { mergeProps, populateProps } from "../../util/react.js";

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
            col: "flex-col",
        },
    },
    defaultVariants: {
        variant: "default",
        direction: "col",
    },
});

export type ListItemDef<D = any> = {
    key: string;
    label: React.ReactNode;
    data?: D;
    /**
     * Used for {@link ListItem}s and  {@link IconButton}s
     */
    props?: PartialPropsOf<typeof ListItem> & PartialPropsOf<typeof IconButton>;
    /**
     * Used for {@link IconButton}s  (variant "icons")
     */
    buttonProps?: PartialPropsOf<typeof IconButton>;
    /**
     * Used for {@link ListItem}s  (variant "default")
     */
    listItemProps?: PartialPropsOf<typeof ListItem>;
};

export interface ListProps<D = any> extends TVCProps<typeof list, "ol" | "ul"> {
    children?: React.ReactNode;
    items?: ListItemDef<D>[];
    onItemClick?: (item: ListItemDef<D>, e: MouseEvent) => void;
    activeItems?: string | string[] | ((item: ListItemDef<D>) => boolean);
    size?: "xs" | "sm" | "md" | "lg" | "xl";
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
export const List = <D = any,>({
    className,
    items,
    onItemClick,
    children,
    variant,
    activeItems,
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
}: ListProps<D>) => {
    const Comp: any = as || "ul";
    const globalItemProps = { LinkComponent, size, ...listItemProps };

    const isItemActive = (item: ListItemDef<D>) => {
        return (
            item.props?.active ??
            (typeof activeItems === "function"
                ? activeItems(item)
                : Array.isArray(activeItems)
                ? activeItems.includes(item.key)
                : item.key === activeItems)
        );
    };

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
            {populateProps(children, globalItemProps, {
                mergeStrategy: "left",
                populateIf: (el) => el.type === ListItem,
            })}
            {items?.map((item) => {
                const active = isItemActive(item);

                if (variant === "icons") {
                    const _buttonProps = mergeProps<PropsOf<typeof IconButton>>([
                        {
                            size: size === "xl" ? "lg" : size,
                            variant: "text",
                            color: active ? "black" : "neutral",
                        },
                        iconButtonProps,
                        item.props,
                        item.buttonProps,
                        {
                            className: clsx(active && "bg-transparent2"),
                            onClick: (e) => {
                                onItemClick?.(item, e);
                            },
                        },
                    ]);

                    return (
                        <IconButton {..._buttonProps} key={item.key}>
                            {item.props?.icon}
                        </IconButton>
                    );
                }

                const _itemProps = mergeProps<PropsOf<typeof ListItem>>([
                    { size: "md" },
                    globalItemProps,
                    item.listItemProps,
                    item.props,
                    {
                        onClick: onItemClick
                            ? (e) => {
                                  onItemClick?.(item, e);
                              }
                            : undefined,
                    },
                ]);

                return (
                    <ListItem {..._itemProps} key={item.key}>
                        {item.label}
                    </ListItem>
                );
            })}
        </Comp>
    );
};

List.displayName = withPrefix("List");
