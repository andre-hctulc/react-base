"use client";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { InputLikeProps } from "./input";
import type { PropsOf, XStyleProps } from "../../types";

const select = tv({
    base: "",
});

interface SelectProps
    extends InputLikeProps<SelectOption>,
        VariantProps<typeof select>,
        Omit<PropsOf<typeof Listbox>, keyof InputLikeProps | "className" | "style" | "color">,
        XStyleProps {
    options: SelectOption[];
    icon?: React.ReactNode;
}

export interface SelectOption {
    key: string;
    label: string;
}

export const Select: React.FC<SelectProps> = ({
    options,
    className,
    style,
    disabled,
    readOnly,
    ...props
}) => {
    // capture selected state to display in the button
    const [selected, setSelected] = React.useState<SelectOption>(
        () => props.value || props.defaultValue || options[0]
    );

    return (
        <div className={select({ className })} style={style}>
            <Listbox
                value={props.value}
                defaultValue={props.defaultValue}
                onChange={(option) => {
                    setSelected(option);
                    props.onChange?.(option);
                }}
                name={props.name}
            >
                <ListboxButton
                    disabled={readOnly || disabled}
                    className={clsx(
                        "relative block w-full rounded-lg bg-elevated-2 py-1.5 pr-8 pl-3 text-left text-sm/6",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2"
                    )}
                >
                    {selected.label}
                    <span className="absolute translate-y-[-50%] top-[50%] right-3 text-2">
                        {props.icon || "▼"}
                    </span>
                </ListboxButton>
                <ListboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                        "bg-opacity-100 z-50 w-[var(--button-width)] rounded-xl border border-white/5 bg-elevated p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
                        "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                    )}
                >
                    {options.map((option) => (
                        <ListboxOption
                            key={option.label}
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
