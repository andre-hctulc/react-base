"use client";

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { InputLikeProps } from "./input";
import type { LabeledChoice, StyleProps } from "../../types";
import clsx from "clsx";

const radioSwitch = tv({
    base: "rounded-full flex border overflow-hidden",
    variants: {
        size: {
            sm: "text-sm h-6",
            md: "text-base h-8",
            lg: "text-lg h-10",
        },
        color: {
            primary: "text-primary",
            secondary: "text-secondary",
            error: "text-error",
            success: "text-success",
            warning: "text-warning",
            info: "text-info",
            neutral: "text-neutral",
        },
    },
    defaultVariants: {
        color: "primary",
        size: "md",
    },
});

interface RadioSwitchProps<D = any>
    extends InputLikeProps<LabeledChoice<D>>,
        VariantProps<typeof radioSwitch>,
        StyleProps {
    options: LabeledChoice<D>[];
    defaultChoiceValue?: string;
    choiceValue?: string;
}

export const RadioSwitch = <D,>({
    options,
    className,
    style,
    disabled,
    readOnly,
    defaultChoiceValue,
    choiceValue,
    value,
    defaultValue,
    onChange,
    required,
    name,
}: RadioSwitchProps<D>) => {
    const controlled = choiceValue !== undefined || value !== undefined;
    // capture selected state to display in the button
    const [selected, setSelected] = React.useState<LabeledChoice<D> | null>(() => {
        if (defaultChoiceValue !== undefined || choiceValue !== undefined) {
            const val = choiceValue ?? defaultChoiceValue;
            const found = options.find(({ value }) => value === val);
            if (found) return found;
        }
        return value || defaultValue || null;
    });

    const activate = (option: LabeledChoice<D>) => {
        if (!controlled) setSelected(option);
        onChange?.({ value: option });
    };

    React.useEffect(() => {
        if (choiceValue) {
            const newOption = options.find(({ value: key }) => key === choiceValue);
            if (newOption) {
                setSelected(newOption);
            }
        }
    }, [choiceValue, options]);

    React.useEffect(() => {
        if (value) {
            setSelected(value);
        }
    }, [value]);

    return (
        <div className={radioSwitch({ className })} style={style}>
            {/* form compatibility */}
            {name && <input type="hidden" name={name} value={selected?.value || ""} required={required} />}
            {options.map((option, i) => {
                const canActivate = !disabled && !readOnly && !option.disabled;
                const active = selected?.value === option.value;
                const last = i === options.length - 1;

                return (
                    <button
                        onClick={() => {
                            activate(option);
                        }}
                        disabled={!canActivate}
                        key={option.value}
                        className={clsx(
                            "text-center flex items-center gap-2 px-4 transition",
                            !active && "!text-2",
                            !last && "border-r",
                            canActivate && "hover:bg-transparent-1 active:bg-transparent-2"
                        )}
                    >
                        {option.icon}
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
};
