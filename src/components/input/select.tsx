"use client";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { InputLikeProps } from "./input";
import type { PropsOf, XStyleProps } from "../../types";
import { ChevronDownIcon } from "../icons/chevron-down";

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
        "h-full relative block w-full rounded-lg bg-elevated-2 py-1.5 pr-9 pl-3 text-left text-sm",
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
    extends InputLikeProps<SelectOption<V>>,
        VariantProps<typeof select>,
        Omit<PropsOf<typeof Listbox>, keyof InputLikeProps | "className" | "style" | "color">,
        XStyleProps {
    options: SelectOption<V>[];
    icon?: React.ReactNode;
    placeholder?: string;
}

export interface SelectOption<V = string, D = any> {
    value: V;
    label: string;
    data?: D;
}

export const Select = <V,>({
    options,
    className,
    style,
    disabled,
    readOnly,
    placeholder,
    size,
    ...props
}: SelectProps<V>) => {
    // capture selected state to display in the button
    const [selected, setSelected] = React.useState<SelectOption<V> | undefined>(
        () => props.value || props.defaultValue
    );

    return (
        <div className={select({ className, size })} style={style}>
            <Listbox
                value={props.value}
                defaultValue={props.defaultValue}
                onChange={(option) => {
                    setSelected(option);
                    props.onChange?.(option);
                }}
                name={props.name}
            >
                <ListboxButton disabled={readOnly || disabled} className={selectButton({ size })}>
                    {selected ? selected.label : <span className="text-3">{placeholder}</span>}
                    <span className="absolute translate-y-[-50%] top-[50%] right-3 text-2 text-base">
                        {props.icon || <ChevronDownIcon />}
                    </span>
                </ListboxButton>
                <ListboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                        "shadow bg-opacity-100 z-50 w-[var(--button-width)] rounded-xl border border-white/5 bg-elevated p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
                        "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                    )}
                >
                    {options.map((option) => (
                        <ListboxOption
                            key={option.value + ""}
                            value={option}
                            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-elevated-2"
                        >
                            <div className="text-sm/6">{option.label}</div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </div>
    );
};
