"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { tv } from "tailwind-variants";
import type {
    LinkComponent,
    PartialPropsOf,
    PropsOf,
    RefProps,
    StyleProps,
    WithTVProps,
} from "../../types/index.js";
import clsx from "clsx";
import { IconButton } from "../input/icon-button.js";
import { ListItem } from "./list-item.js";
import { mergeProps, populateProps } from "../../util/react.js";
import type { InputLikeProps } from "../input/types.js";
import { HiddenInput } from "../input/hidden-input.js";

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
            xl: "p-6",
            "2xl": "p-8",
            "3xl": "p-10",
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

export type ListProps<D = any> = WithTVProps<
    InputLikeProps<string[], { singleValue: string | undefined }> &
        StyleProps &
        RefProps<HTMLOListElement | HTMLUListElement> & {
            children?: ReactNode;
            items?: ListItemDef<D>[];
            onItemClick?: (item: ListItemDef<D>, e: MouseEvent) => void;
            activeItems?: string | string[] | ((item: ListItemDef<D>) => boolean);
            size?: "xs" | "sm" | "md" | "lg" | "xl";
            LinkComponent?: LinkComponent;
            loading?: boolean;
            variant?: "icons" | "default";
            iconButtonProps?: Partial<PropsOf<typeof IconButton>>;
            listItemProps?: Partial<PropsOf<typeof ListItem>>;
            activeListItemProps?: Partial<PropsOf<typeof ListItem>>;
            activeIconButtonProps?: Partial<PropsOf<typeof IconButton>>;
            /**
             * Use "ol" instead of "ul" for ordered lists.
             */
            ordered?: boolean;
            color?: PropsOf<typeof ListItem>["color"];
            multiple?: boolean;
            selectable?: boolean;
        },
    typeof list
>;

/**
 * Can be used as an input element!
 */
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
    ordered,
    iconButtonProps,
    listItemProps,
    elevate,
    gap,
    padding,
    ref,
    color,
    activeIconButtonProps,
    activeListItemProps,
    value,
    defaultValue,
    onChange,
    multiple,
    name,
    selectable,
    ...props
}: ListProps<D>) => {
    const selectedControlled = !!value;
    const [selectedItems, setSelectedItems] = useState<string[]>(value || []);
    const Comp: any = ordered ? "ol" : "ul";
    const _selectable = !!selectable || !!name || !!multiple || !!value || !!defaultValue;
    const globalItemProps: PartialPropsOf<typeof ListItem> = {
        LinkComponent,
        size,
        color,
        selectable: _selectable,
        ...listItemProps,
        selected: selectedItems,
        onSelectionChange: (selected, value) => {
            listItemProps?.onSelectionChange?.(selected, value);

            if (value !== undefined && _selectable) {
                let newSelection: string[];

                if (multiple) {
                    if (selected) {
                        newSelection = selectedItems.includes(value)
                            ? [...selectedItems.filter((n) => n !== value), value]
                            : [...selectedItems, value];
                    } else {
                        newSelection = selectedItems.filter((v) => v !== value);
                    }
                } else {
                    newSelection = selectedItems.includes(value) ? [] : [value];
                }

                if (!selectedControlled) {
                    setSelectedItems(newSelection);
                }

                onChange?.({ value: newSelection, singleValue: newSelection[0] });
            }
        },
    };
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

    useEffect(() => {
        if (value) {
            setSelectedItems(value);
        }
    }, [value]);

    return (
        <>
            {name && (
                <>
                    {JSON.stringify(selectedItems)}
                    <HiddenInput name={name} value={selectedItems} />
                </>
            )}
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
                {populateProps(children, globalItemProps, "left", (el) => el.type === ListItem)}
                {items?.map((item) => {
                    const active = isItemActive(item);

                    if (variant === "icons") {
                        const _buttonProps = mergeProps<PropsOf<typeof IconButton<"button">>>([
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
                            active && activeIconButtonProps,
                        ]);

                        return (
                            <IconButton {..._buttonProps} key={item.key}>
                                {item.props?.icon}
                            </IconButton>
                        );
                    }

                    const _itemProps = mergeProps<PropsOf<typeof ListItem>>([
                        { size: "md", active },
                        globalItemProps,
                        item.props,
                        item.listItemProps,
                        {
                            onClick: onItemClick
                                ? (e) => {
                                      onItemClick?.(item, e);
                                  }
                                : undefined,
                        },
                        active && activeListItemProps,
                    ]);

                    return (
                        <ListItem {..._itemProps} key={item.key}>
                            {item.label}
                        </ListItem>
                    );
                })}
            </Comp>
        </>
    );
};
