"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useEffect, useState } from "react";
import { IconButton } from "./button";
import { withPrefix } from "../../util/system";
import { HiddenInput } from "./hidden-input";
export const ToggleIconButton = forwardRef(({ className, style, defaultValue, value, onChange, children, size, disabled, readOnly, required, color, name, id, }, ref) => {
    const controlled = value !== undefined;
    const [active, setActive] = useState(value ?? defaultValue ?? false);
    useEffect(() => {
        if (controlled) {
            setActive(value);
        }
    }, [value]);
    return (_jsxs(_Fragment, { children: [name && _jsx(HiddenInput, { id: id, checked: active, name: name, required: required }), _jsx(IconButton, { ref: ref, style: style, className: className, size: size, variant: active ? "filled" : "outlined", color: color, disabled: disabled || readOnly, onClick: () => {
                    const newValue = !active;
                    if (!controlled)
                        setActive(newValue);
                    onChange?.({ value: newValue });
                }, children: children })] }));
});
ToggleIconButton.displayName = withPrefix("ToggleIconButton");
