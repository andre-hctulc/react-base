"use client";

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { InputLikeProps } from "./input";
import type { LabeledChoice, StyleProps } from "../../types";
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
    extends InputLikeProps<LabeledChoice<V>>,
        VariantProps<typeof radioButtons>,
        StyleProps {
    options: LabeledChoice<V>[];
    defaultChoiceValue?: string;
    choiceValue?: string;
}

/**
 * ### Props
 * - `options` - The options to display in the dropdown
 * - `defaultChoiceValue` - The value of the option to be selected by default
 * - `choiceValue` - The value of the option to be selected (controlled)
 */
export const RadioButtons = <V,>({
    options,
    className,
    style,
    disabled,
    readOnly,
    required,
    defaultChoiceValue,
    choiceValue,
    value,
    defaultValue,
    onChange,
    name,
    orientation,
}: RadioButtonsProps<V>) => {
    const id = React.useId();
    // capture selected state to display in the button
    const [selected, setSelected] = React.useState<LabeledChoice<V> | null>(() => {
        if (defaultChoiceValue !== undefined || choiceValue !== undefined) {
            const val = choiceValue ?? defaultChoiceValue;
            const found = options.find(({ value }) => value === val);
            if (found) return found;
        }
        return value || defaultValue || null;
    });

    React.useEffect(() => {
        if (choiceValue) {
            const newOption = options.find(({ value: key }) => key === choiceValue);
            if (newOption) setSelected(newOption);
        }
    }, [choiceValue, options]);

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
