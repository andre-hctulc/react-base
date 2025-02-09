"use client";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { InputLikeProps } from "./types";
import type { LabeledChoice, StyleProps } from "../../types";
import { ChevronDownIcon } from "../icons/chevron-down";
import { Chip } from "../data-display/chip";
import { Checkbox } from "./checkbox";
import { XScroll } from "../shadow/x-scroll";

const select = tv({
    base: "min-w-32  max-w-full",
    variants: {
        size: {
            sm: "h-7 text-sm",
            md: "h-9 text-base",
            lg: "h-11",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

const selectButton = tv({
    base: [
        "rounded-lg bg-3  text-left text-sm",
        "flex relative",
        "h-full w-full",
        "py-1.5 pr-9 pl-3 gap-3",
        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2",
    ],
    variants: {
        size: {
            sm: "text-sm",
            md: "text-sm",
            lg: "text-base",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export interface RenderSelectedParams<D = any> {
    selected: SelectOption<D>[];
}

interface SelectProps<D = any>
    extends InputLikeProps<string[], { options: SelectOption<D>[] }>,
        VariantProps<typeof select>,
        StyleProps {
    options: SelectOption<D>[];
    icon?: React.ReactNode;
    placeholder?: React.ReactNode;
    multiple?: boolean;
    renderSelected?: (params: RenderSelectedParams<D>) => React.ReactNode;
    loading?: boolean;
    /**
     * @default "Loading..."
     */
    loadingText?: string;
}

export interface SelectOption<D = any> extends LabeledChoice<D> {
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
export const Select = <V,>({
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
}: SelectProps<V>) => {
    const controlled = value !== undefined;
    // capture selected state to display in the button
    const [selected, setSelected] = React.useState<SelectOption<V>[]>(() => {
        if (defaultValue || value) {
            const set = new Set(defaultValue || value);
            return options.filter(({ value: key }) => set.has(key));
        }
        return value || defaultValue || [];
    });

    const selectedEl = renderSelected ? (
        renderSelected({ selected })
    ) : multiple ? (
        <>
            {selected.map((sel) => {
                if (multiple)
                    return (
                        <Chip size="sm" key={sel.value} className="!bg-2">
                            {sel.label}
                        </Chip>
                    );
                return <span key={sel.value}></span>;
            })}
        </>
    ) : (
        <span className="truncate">{selected[0]?.label}</span>
    );

    const loadingEl = <span className="text-3 truncate">{loadingText ?? "Loading..."}</span>;

    const placeholderEl =
        typeof placeholder === "string" ? <span className="text-3">{placeholder}</span> : placeholder;

    React.useEffect(() => {
        if (value) {
            const set = new Set(value);
            setSelected(options.filter(({ value: key }) => set.has(key)));
        }
    }, [value, options]);

    return (
        <div className={select({ className, size })} style={style} onClick={(e) => e.stopPropagation()}>
            <Listbox
                value={selected}
                onChange={(options) => {
                    // multiple is handled by the checkboxes exclusively
                    if (multiple) return;

                    if (!controlled) setSelected(options);
                    onChange?.({ value: options.map(({ value }) => value), options: options });
                }}
                name={name}
            >
                <ListboxButton disabled={loading || readOnly || disabled} className={selectButton({ size })}>
                    <XScroll hideScrollbar>
                        <div className="w-full h-full box-border overflow-x-auto flex items-center gap-1.5">
                            {loading ? loadingEl : selected.length ? selectedEl : placeholderEl}
                        </div>
                    </XScroll>
                    <span className="absolute translate-y-[-50%] top-[50%] right-3 text-2 text-base">
                        {icon || <ChevronDownIcon />}
                    </span>
                </ListboxButton>
                <ListboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                        "shadow bg-2 bg-opacity-100",
                        "rounded-lg border border-white/5",
                        "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 focus:outline-none",
                        "z-50 w-[var(--button-width)] p-1 [--anchor-gap:var(--spacing-1)]"
                    )}
                >
                    {options.map((option) => {
                        const toggle = () => {
                            if (option.disabled) return;

                            if (multiple) {
                                let newSelected: SelectOption<V>[];

                                const checked = selected.some(({ value: key }) => key === option.value);

                                if (checked) {
                                    newSelected = selected.filter(({ value: key }) => key !== option.value);
                                } else {
                                    newSelected = [...selected, option];
                                }

                                if (!controlled) {
                                    setSelected(newSelected);
                                }

                                onChange?.({
                                    value: newSelected.map(({ value }) => value),
                                    options: newSelected,
                                });
                            }
                        };

                        return (
                            <ListboxOption
                                disabled={option.disabled}
                                onClick={(e) => {
                                    if (multiple) {
                                        // prevents closing the dropdown
                                        e.preventDefault();
                                        toggle();
                                    }
                                }}
                                key={option.value}
                                value={option}
                                className={clsx(
                                    "group flex gap-2.5 cursor-default items-center rounded py-1.5 px-3 select-none data-[focus]:bg-3",
                                    disabled && "cursor-not-allowed"
                                )}
                            >
                                {multiple && (
                                    <Checkbox
                                        defaultValue={option.defaultChecked}
                                        disabled={option.disabled}
                                        onClick={() => toggle()}
                                        value={selected.some(({ value: key }) => option.value === key)}
                                    />
                                )}
                                <span className={clsx("text-sm/6", option.disabled && "text-3")}>
                                    {option.label}
                                </span>
                            </ListboxOption>
                        );
                    })}
                </ListboxOptions>
            </Listbox>
        </div>
    );
};
