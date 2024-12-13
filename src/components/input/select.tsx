"use client";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { InputLikeProps } from "./input";
import type { PropsOf, XStyleProps } from "../../types";
import { ChevronDownIcon } from "../icons/chevron-down";
import { Chip } from "../data-display/chip";
import { Checkbox } from "./checkbox";
import { WheelX } from "../shadow/wheel-x";

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

interface SelectProps<V = string>
    extends InputLikeProps<SelectOption<V>[]>,
        VariantProps<typeof select>,
        Omit<PropsOf<typeof Listbox>, keyof InputLikeProps | "className" | "style" | "color">,
        XStyleProps {
    options: SelectOption<V>[];
    icon?: React.ReactNode;
    placeholder?: React.ReactNode;
    multiple?: boolean;
    renderSelected?: (selected: SelectOption<V>[]) => React.ReactNode;
    loading?: boolean;
    defaultSelectedKeys?: string[];
    selectedKeys?: string[];
    /**
     * @default "Loading..."
     */
    loadingText?: string;
}

export interface SelectOption<D = any> {
    key: string;
    label: string;
    data?: D;
}

/**
 * ### Props
 * - `options` - The options to display in the dropdown
 * - `defaultSelectedKeys` - The keys of the options to be selected by default
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
    defaultSelectedKeys,
    selectedKeys,
    value,
    defaultValue,
    onChange,
    ...props
}: SelectProps<V>) => {
    const controlled = value !== undefined || selectedKeys !== undefined;
    // capture selected state to display in the button
    const [selected, setSelected] = React.useState<SelectOption<V>[]>(() => {
        if (defaultSelectedKeys) {
            const set = new Set(defaultSelectedKeys);
            return options.filter(({ key }) => set.has(key));
        }
        return value || defaultValue || [];
    });

    const selectedEl = renderSelected ? (
        renderSelected(selected)
    ) : (
        <>
            {selected.map((sel) => {
                if (multiple)
                    return (
                        <Chip size="sm" key={sel.key} className="!bg-2">
                            {sel.label}
                        </Chip>
                    );
                return <span key={sel.key}></span>;
            })}
        </>
    );

    const loadingEl = <span className="text-3">{loadingText ?? "Loading..."}</span>;

    const placeholderEl =
        typeof placeholder === "string" ? <span className="text-3">{placeholder}</span> : placeholder;

    React.useEffect(() => {
        if (selectedKeys) {
            const set = new Set(selectedKeys);
            setSelected(options.filter(({ key }) => set.has(key)));
        }
    }, [selectedKeys, options]);

    React.useEffect(() => {
        if (value) {
            setSelected(value || []);
        }
    }, [value]);

    return (
        <div className={select({ className, size })} style={style}>
            <Listbox
                value={selected}
                onChange={(option) => {
                    // multiple is handled by the checkboxes
                    if (multiple) return;

                    if (!controlled) setSelected(option);
                    onChange?.({ value: option });
                }}
                name={props.name}
            >
                <ListboxButton disabled={loading || readOnly || disabled} className={selectButton({ size })}>
                    <WheelX hideScrollbar>
                        <div className="w-full h-full box-border overflow-x-auto flex items-center gap-1.5">
                            {loading ? loadingEl : selected.length ? selectedEl : placeholderEl}
                        </div>
                    </WheelX>
                    <span className="absolute translate-y-[-50%] top-[50%] right-3 text-2 text-base">
                        {props.icon || <ChevronDownIcon />}
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
                            if (multiple) {
                                let newSelected: SelectOption<V>[];

                                const checked = selected.some(({ key }) => key === option.key);

                                if (!checked) newSelected = [...selected, option];
                                else newSelected = selected.filter(({ key }) => key !== option.key);

                                if (controlled) setSelected(newSelected);
                                onChange?.({ value: newSelected });
                            }
                        };

                        return (
                            <ListboxOption
                                onClick={(e) => {
                                    if (multiple) {
                                        // prevents closing the dropdown
                                        e.preventDefault();
                                        toggle();
                                    }
                                }}
                                key={option.key}
                                value={option}
                                className={clsx(
                                    "group flex gap-2.5 cursor-default items-center rounded py-1.5 px-3 select-none data-[focus]:bg-3"
                                )}
                            >
                                {multiple && (
                                    <Checkbox
                                        onClick={() => toggle()}
                                        value={selected.some(({ key }) => option.key === key)}
                                    />
                                )}
                                <span className="text-sm/6">{option.label}</span>
                            </ListboxOption>
                        );
                    })}
                </ListboxOptions>
            </Listbox>
        </div>
    );
};
