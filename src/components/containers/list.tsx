"use client";

import React, { type FC } from "react";
import { tv } from "tailwind-variants";
import type { LinkComponent, PartialPropsOf, PropsOf, TVCProps } from "../../types/index.js";
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

export type ListItemDef = {
    key: string;
    label: React.ReactNode;
    data?: any;
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

export interface ListProps extends TVCProps<typeof list, "ol" | "ul"> {
    children?: React.ReactNode;
    items?: ListItemDef[];
    onItemClick?: (item: ListItemDef) => void;
    activeKey?: string | ((item: ListItemDef) => boolean);
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
            {populateProps(children, linkItemProps, "left", (el) => el.type === ListItem)}
            {items?.map((item) => {
                const active =
                    item.props?.active ??
                    (typeof activeKey === "function" ? activeKey(item) : item.key === activeKey);

                if (variant === "icons") {
                    return (
                        <IconButton
                            size={size === "xl" ? "lg" : size}
                            variant="text"
                            color={active ? "black" : "neutral"}
                            {...iconButtonProps}
                            {...item.props}
                            {...item.buttonProps}
                            key={item.key}
                            className={clsx(
                                active && "bg-transparent2",
                                item.props?.className,
                                item.buttonProps?.className,
                                iconButtonProps?.className
                            )}
                            onClick={(e) => {
                                item.buttonProps?.onClick?.(e);
                                item.props?.onClick?.(e);
                                iconButtonProps?.onClick?.(e);
                                onItemClick?.(item);
                            }}
                        >
                            {item.props?.icon}
                        </IconButton>
                    );
                }

                return (
                    <ListItem
                        as="li"
                        size={size || "md"}
                        {...linkItemProps}
                        {...item.listItemProps}
                        {...item.props}
                        key={item.key}
                        active={active}
                        className={clsx(item.props?.className, listItemProps?.className as any)}
                        onClick={(e) => {
                            item.listItemProps?.onClick?.(e);
                            item.props?.onClick?.(e);
                            listItemProps?.onClick?.(e);
                            onItemClick?.(item);
                        }}
                        clickable={
                            !!item.props?.clickable ||
                            !!item.props?.onClick ||
                            !!item.listItemProps?.onClick ||
                            !!item.listItemProps?.clickable ||
                            !!listItemProps?.onClick ||
                            !!listItemProps?.clickable ||
                            !!item.props?.href ||
                            !!item.listItemProps?.href
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
