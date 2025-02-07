"use client";

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { InputLikeProps } from "./input";
import type { Choice, PropsOf, StyleProps } from "../../types";
import { Card } from "../containers";

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

export interface RadioRenderParams<D = any> {
    option: Choice<D>;
    active: boolean;
    readOnly: boolean;
    disabled: boolean;
    activate: () => void;
}

interface RadioProps<D = any> extends InputLikeProps<Choice<D>>, VariantProps<typeof radio>, StyleProps {
    options: Choice<D>[];
    icon?: React.ReactNode;
    defaultChoiceValue?: string;
    choiceValue?: string;
    renderOption: (option: RadioRenderParams<D>) => React.ReactNode;
}

/**
 * ### Props
 * - `options` - The options to display in the dropdown
 * - `choiceValue` - The value of the option to be selected (controlled)
 * - `defaultChoiceValue` - The value of the option to be selected by default
 * - `renderOption` - Renders the options
 */
export const Radio = <D,>({
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
    renderOption,
}: RadioProps<D>) => {
    const controlled = choiceValue !== undefined || value !== undefined;
    // capture selected state to display in the button
    const [selected, setSelected] = React.useState<Choice<D> | null>(() => {
        if (defaultChoiceValue) {
            const found = options.find(({ value: key }) => key === defaultChoiceValue);
            if (found) return found;
        }
        return value || defaultValue || null;
    });

    const activate = (option: Choice<D>) => {
        if (!controlled) setSelected(option);
        onChange?.({ value: option });
    };

    React.useEffect(() => {
        if (choiceValue !== undefined) {
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
        <div className={radio({ className })} style={style}>
            {/* form compatibility */}
            {name && <input type="hidden" name={name} value={selected?.value || ""} required={required} />}
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

const radioCard = tv({
    base: "transition border-[1.5px]",
    variants: {
        active: {
            true: "border-primary outline-0",
            false: "outline-primary",
        },
        disabled: {
            true: "opacity-50",
            false: "",
        },
        readOnly: {
            true: "",
        },
    },
    compoundVariants: [
        {
            disabled: false,
            readOnly: false,
            active: false,
            className: "hover:outline-offset-2 hover:outline cursor-pointer",
        },
        { disabled: false, readOnly: false, className: "hover:bg-neutral/5" },
    ],
    defaultVariants: {
        active: false,
        disabled: false,
        readOnly: false,
    },
});

interface RadioCardProps extends PropsOf<typeof Card> {
    children?: React.ReactNode;
    params?: Partial<RadioRenderParams>;
}

/**
 * A helper component to render a card as a radio option
 */
export const RadioCard: React.FC<RadioCardProps> = ({ params, className, children, ...props }) => {
    const p: RadioRenderParams = {
        option: { value: "", data: { label: "<option-not-defined>" } },
        active: false,
        activate: () => {},
        disabled: false,
        readOnly: false,
        ...params,
    };

    return (
        <Card
            {...props}
            key={p.option.value}
            className={radioCard({ className, active: p.active, disabled: p.disabled, readOnly: p.readOnly })}
            onClick={(e) => {
                p.activate();
                props.onClick?.(e);
            }}
        >
            {children}
        </Card>
    );
};
