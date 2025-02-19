"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { tv } from "tailwind-variants";
import { HiddenInput } from "./hidden-input";
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
/**
 * ### Props
 * - `options` - The options to display in the dropdown
 * - `renderOption` - Renders the options
 */
export const Radio = ({ options, className, style, disabled, readOnly, value, defaultValue, onChange, required, name, renderOption, }) => {
    const controlled = value !== undefined;
    // capture selected state to display in the button
    const [selected, setSelected] = React.useState(() => {
        if (defaultValue !== undefined || value !== undefined) {
            const val = value ?? defaultValue;
            const found = options.find(({ value }) => value === val);
            if (found)
                return found;
        }
        return null;
    });
    const activate = (option) => {
        if (!controlled)
            setSelected(option);
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
    return (_jsxs("div", { className: radio({ className }), style: style, children: [name && _jsx(HiddenInput, { name: name, value: selected?.value || "", required: required }), options.map((option) => {
                const canActivate = !disabled && !readOnly && !option.disabled;
                return renderOption({
                    option,
                    activate: () => {
                        if (!canActivate)
                            return;
                        activate(option);
                    },
                    active: selected?.value === option.value,
                    readOnly: !!readOnly,
                    disabled: disabled || !!option.disabled,
                });
            })] }));
};
