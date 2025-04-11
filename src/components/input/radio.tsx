"use client";

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { InputLikeProps } from "./types.js";
import type { Choice, StyleProps } from "../../types/index.js";
import { HiddenInput } from "./hidden-input.js";

const radio = tv({
    base: "",
    variants: {
        orientation: {
            vertical: "",
            horizontal: "flex gap-3",
        },
    },
    defaultVariants: {},
});

export interface RadioRenderParams<V = string, D = any> {
    option: Choice<V, D>;
    active: boolean;
    readOnly: boolean;
    disabled: boolean;
    activate: () => void;
}

export interface RadioProps<V = string, D = any>
    extends InputLikeProps<V, { option: Choice<V, D> }>,
        VariantProps<typeof radio>,
        StyleProps {
    options: Choice<V, D>[];
    icon?: React.ReactNode;
    renderOption: (option: RadioRenderParams<V, D>) => React.ReactNode;
}

/**
 * ### Props
 * - `options` - The options to display in the dropdown
 * - `renderOption` - Renders the options
 */
export const Radio = <V, D>({
    options,
    className,
    style,
    disabled,
    readOnly,
    value,
    defaultValue,
    onChange,
    required,
    name,
    renderOption,
}: RadioProps<V, D>) => {
    const controlled = value !== undefined;
    // capture selected state to display in the button
    const [selected, setSelected] = React.useState<Choice<V, D> | null>(() => {
        if (defaultValue !== undefined || value !== undefined) {
            const val = value ?? defaultValue;
            const found = options.find(({ value }) => value === val);
            if (found) return found;
        }
        return null;
    });

    const activate = (option: Choice<V, D>) => {
        if (!controlled) setSelected(option);
        onChange?.({ value: option.value, option });
    };

    React.useEffect(() => {
        if (value !== undefined) {
            const newOption = options.find(({ value: key }) => key === value);
            if (newOption) {
                setSelected(newOption);
            }
        }
    }, [value, options]);

    return (
        <div className={radio({ className })} style={style}>
            {/* form compatibility */}
            {name && <HiddenInput name={name} value={String(selected?.value || "")} required={required} />}
            {options.map((option) => {
                const canActivate = !disabled && !readOnly && !option.disabled;

                return renderOption({
                    option,
                    activate: () => {
                        if (!canActivate) return;
                        activate(option);
                    },
                    active: selected?.value === option.value,
                    readOnly: !!readOnly,
                    disabled: disabled || !!option.disabled,
                });
            })}
        </div>
    );
};
