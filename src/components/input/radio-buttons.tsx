"use client";

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { InputLikeProps } from "./input";
import type { XStyleProps } from "../../types";
import type { SelectOption } from "./select";
import { Icon } from "../icons";

const radioButtons = tv({
    base: "",
    variants: {
        orientation: {
            vertical: "",
            horizontal: "flex gap-3",
        },
    },
    defaultVariants: {},
});

interface RadioButtonsProps<V = string>
    extends InputLikeProps<SelectOption<V>>,
        VariantProps<typeof radioButtons>,
        XStyleProps {
    options: SelectOption<V>[];
    defaultSelectedKey?: string;
    selectedKey?: string;
}

/**
 * ### Props
 * - `options` - The options to display in the dropdown
 * - `defaultSelectedKey` - The key of the option to be selected by default
 * - `selectedKey` - The key of the option to be selected (controlled)
 */
export const RadioButtons = <V,>({
    options,
    className,
    style,
    disabled,
    readOnly,
    required,
    defaultSelectedKey,
    selectedKey,
    value,
    defaultValue,
    onChange,
    name,
    orientation,
}: RadioButtonsProps<V>) => {
    const id = React.useId();
    // capture selected state to display in the button
    const [selected, setSelected] = React.useState<SelectOption<V> | null>(() => {
        if (defaultSelectedKey) {
            const found = options.find(({ value: key }) => key === defaultSelectedKey);
            if (found) return found;
        }
        return value || defaultValue || null;
    });

    React.useEffect(() => {
        if (selectedKey) {
            const newOption = options.find(({ value: key }) => key === selectedKey);
            if (newOption) setSelected(newOption);
        }
    }, [selectedKey, options]);

    React.useEffect(() => {
        if (value) {
            setSelected(value);
        }
    }, [value]);

    return (
        <div className={radioButtons({ className, orientation })} style={style}>
            {options.map((option, i) => {
                const itemId = `${id}_${i}`;
                const active = selected?.value === option.value;

                return (
                    <div key={option.value}>
                        <input
                            checked={active}
                            type="radio"
                            id={itemId}
                            value={option.value}
                            onChange={(e) => onChange?.({ ...e, value: option })}
                            readOnly={readOnly}
                            disabled={disabled}
                            required={required}
                            name={name}
                        />
                        <div>
                            {option.icon && <Icon className="mb-2">{option.icon}</Icon>}
                            <label className="text-2" htmlFor={itemId}>
                                {option.label}
                            </label>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
