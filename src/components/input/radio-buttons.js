"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { tv } from "tailwind-variants";
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
/**
 * ### Props
 * - `options` - The options to display in the dropdown
 * - `defaultChoiceValue` - The value of the option to be selected by default
 * - `choiceValue` - The value of the option to be selected (controlled)
 */
export const RadioButtons = ({ options, className, style, disabled, readOnly, required, value, defaultValue, onChange, name, orientation, }) => {
    const id = React.useId();
    // capture selected state to display in the button
    const [selected, setSelected] = React.useState(() => {
        if (value !== undefined || defaultValue !== undefined) {
            const val = value ?? defaultValue;
            const found = options.find(({ value }) => value === val);
            if (found)
                return found;
        }
        return null;
    });
    React.useEffect(() => {
        if (value) {
            const newOption = options.find(({ value: val }) => val === value);
            if (newOption)
                setSelected(newOption);
        }
    }, [value, options]);
    return (_jsx("div", { className: radioButtons({ className, orientation }), style: style, children: options.map((option, i) => {
            const itemId = `${id}_${i}`;
            const active = selected?.value === option.value;
            return (_jsxs("div", { children: [_jsx("input", { checked: active, type: "radio", id: itemId, value: option.value, onChange: (e) => onChange?.({ ...e, value: option.value, option }), readOnly: readOnly, disabled: disabled, required: required, name: name }), _jsxs("div", { children: [option.icon && _jsx(Icon, { className: "mb-2", children: option.icon }), _jsx("label", { className: "text-t2", htmlFor: itemId, children: option.label })] })] }, option.value));
        }) }));
};
