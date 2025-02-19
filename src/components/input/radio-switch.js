"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { tv } from "tailwind-variants";
import clsx from "clsx";
import { HiddenInput } from "./hidden-input";
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
export const RadioSwitch = ({ options, className, style, disabled, readOnly, value, defaultValue, onChange, required, name, }) => {
    const controlled = value !== undefined;
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
    const activate = (option) => {
        if (!controlled)
            setSelected(option);
        onChange?.({ value: option.value, option });
    };
    React.useEffect(() => {
        if (value) {
            const newOption = options.find(({ value: val }) => val === value);
            if (newOption) {
                setSelected(newOption);
            }
        }
    }, [value, options]);
    return (_jsxs("div", { className: radioSwitch({ className }), style: style, children: [name && _jsx(HiddenInput, { name: name, value: selected?.value || "" }), options.map((option, i) => {
                const canActivate = !disabled && !readOnly && !option.disabled;
                const active = selected?.value === option.value;
                const last = i === options.length - 1;
                return (_jsxs("button", { onClick: () => {
                        activate(option);
                    }, disabled: !canActivate, className: clsx("text-center flex items-center gap-2 px-4 transition", !active && "text-t2!", !last && "border-r", canActivate && "hover:bg-transparent1 active:bg-transparent2"), children: [option.icon, option.label] }, option.value));
            })] }));
};
