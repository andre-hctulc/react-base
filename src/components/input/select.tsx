"use client";

import { useEffect, useMemo, useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { InputLikeProps } from "./types.js";
import type { LabeledChoice, PartialPropsOf, StyleProps } from "../../types/index.js";
import { ChevronDownIcon } from "../icons/chevron-down.js";
import { Chip } from "../data-display/chip.js";
import { XScroll } from "../shadow/x-scroll.js";
import { Icon } from "../icons/icon.js";
import { Popover } from "../dialog/popover.js";
import { List, type ListItemDef } from "../containers/list.js";
import { HiddenInput } from "./hidden-input.js";
import { Card } from "../containers/card.js";

const select = tv({
    base: [
        "w-full rounded-lg bg-paper3 text-left text-sm cursor-pointer",
        "flex relative",
        "h-full w-full",
        "py-1.5 pr-9 pl-3 gap-3",
        "focus:outline-hidden data-focus:outline-2 data-focus:-outline-offset-2",
    ],
    variants: {
        size: {
            sm: "h-7 text-sm",
            md: "h-9 text-sm",
            lg: "h-11text-base",
        },
        disabled: {
            true: "cursor-not-allowed text-t3",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export interface RenderSelectedParams<V = string, D = any> {
    selected: SelectOption<V, D>[];
}

export interface SelectProps<V = string, D = any>
    extends InputLikeProps<V[], { options: SelectOption<V, D>[] }>,
        VariantProps<typeof select>,
        StyleProps {
    options: SelectOption<V, D>[];
    icon?: React.ReactNode;
    placeholder?: React.ReactNode;
    multiple?: boolean;
    renderSelected?: (params: RenderSelectedParams<V, D>) => React.ReactNode;
    loading?: boolean;
    /**
     * @default "Loading..."
     */
    loadingText?: string;
    popoverProps?: PartialPropsOf<typeof Popover>;
}

export interface SelectOption<V = string, D = any> extends LabeledChoice<V, D> {
    defaultChecked?: boolean;
}

/**
 * ### Props
 * - `options` - The options to display in the dropdown
 * - `values` - The values of the options to be selected (controlled)
 * - `placeholder` - The placeholder to display when no option is selected
 * - `multiple` - Allow multiple options to be selected
 * - `renderSelected` - Custom render function for the selected options
 * - `loading` - Show a loading text
 * - `loadingText` - The text to display when loading
 */
export const Select = <V = string, D = any>({
    options,
    className,
    style,
    disabled,
    readOnly,
    placeholder,
    size,
    multiple,
    required,
    renderSelected,
    loadingText,
    loading,
    value,
    defaultValue,
    onChange,
    icon,
    name,
    id,
    popoverProps,
}: SelectProps<V, D>) => {
    const [root, setRoot] = useState<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const controlled = value !== undefined;
    // capture selected state to display in the button
    const [selected, setSelected] = useState<SelectOption<V, D>[]>(() => {
        if (defaultValue || value) {
            const set = new Set(value || defaultValue);
            return options.filter(({ value: key }) => set.has(key));
        }
        return [];
    });
    const firstSelected: SelectOption<V, D> | undefined = selected[0];
    const selectedEl = renderSelected ? (
        renderSelected({ selected })
    ) : multiple ? (
        <>
            {selected.map((sel) => {
                return (
                    <Chip size="sm" key={String(sel.value)} className="bg-paper2!" icon={sel.icon}>
                        {sel.label}
                    </Chip>
                );
            })}
        </>
    ) : (
        <span className="truncate inline-flex items-center">
            {firstSelected?.icon && (
                <Icon color="neutral" className="mr-2">
                    {firstSelected?.icon}
                </Icon>
            )}
            {firstSelected?.label}
        </span>
    );
    const val = useMemo(() => {
        return selected.map(({ value }) => String(value));
    }, [selected]);

    const loadingEl = <span className="text-t3 truncate">{loadingText ?? "Loading..."}</span>;

    const placeholderEl =
        typeof placeholder === "string" ? <span className="text-t3">{placeholder}</span> : placeholder;
    const _disabled = loading || readOnly || !!disabled;

    useEffect(() => {
        if (value) {
            const set = new Set(value);
            setSelected(options.filter(({ value: key }) => set.has(key)));
        }
    }, [value, options]);

    const getListItems = (options: SelectOption<V, D>[]) => {
        return options.map<ListItemDef<SelectOption<V, D>>>((option) => {
            return {
                label: option.label,
                listItemProps: {
                    disabled: option.disabled,
                    icon: option.icon,
                    ...option.listItemProps,
                    // TODO optimize
                    active: multiple && selected.some((s) => s.value === option.value),
                },
                key: String(option.value),
                data: option,
            };
        });
    };

    return (
        <div className={className} style={style} ref={setRoot}>
            <HiddenInput id={id} name={name} value={val} required={required} />
            <button
                type="button"
                disabled={_disabled}
                onClick={() => setOpen(true)}
                className={select({ size, disabled: _disabled })}
            >
                <XScroll hideScrollbar>
                    <div className="w-full h-full box-border overflow-x-auto flex items-center gap-1.5">
                        {loading ? loadingEl : selected.length ? selectedEl : placeholderEl}
                    </div>
                </XScroll>
                <span className="absolute translate-y-[-50%] top-[50%] right-3 text-t2 text-base">
                    {icon || <ChevronDownIcon />}
                </span>
            </button>
            <Popover
                width="anchor"
                portal={false}
                anchor={root}
                open={open}
                onClose={() => setOpen(false)}
                position="bottom"
                gap={1}
                {...popoverProps}
            >
                <Card variant="custom" shadow="md">
                    <List
                        padding="sm"
                        items={getListItems(options)}
                        onItemClick={(listItem) => {
                            const option: SelectOption<V, D> = listItem.data;

                            if (!option || option.disabled) return;

                            let newValue: SelectOption<V, D>[];

                            if (multiple) {
                                newValue = selected.some((s) => s.value === option.value)
                                    ? selected.filter((s) => s.value !== option.value)
                                    : [...selected, option];
                            } else {
                                newValue = [option];
                                setOpen(false);
                            }

                            if (!controlled) {
                                setSelected(newValue);
                            }

                            onChange?.({ value: newValue.map((s) => s.value), options });
                        }}
                    />
                </Card>
            </Popover>
        </div>
    );
};
