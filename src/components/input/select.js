"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { tv } from "tailwind-variants";
import { ChevronDownIcon } from "../icons/chevron-down";
import { Chip } from "../data-display/chip";
import { Checkbox } from "./checkbox";
import { XScroll } from "../shadow/x-scroll";
const select = tv({
    base: "min-w-32  max-w-full",
    variants: {
        size: {
            sm: "h-7 text-sm",
            md: "h-9 text-base",
            lg: "h-11",
        },
    },
    defaultVariants: {
        size: "md",
    },
});
const selectButton = tv({
    base: [
        "rounded-lg bg-paper3  text-left text-sm",
        "flex relative",
        "h-full w-full",
        "py-1.5 pr-9 pl-3 gap-3",
        "focus:outline-hidden data-focus:outline-2 data-focus:-outline-offset-2",
    ],
    variants: {
        size: {
            sm: "text-sm",
            md: "text-sm",
            lg: "text-base",
        },
    },
    defaultVariants: {
        size: "md",
    },
});
/**
 * ### Props
 * - `options` - The options to display in the dropdown
 * - `values` - The values of the options to be selected (controlled)
 * - `placeholder` - The placeholder to display when no option is selected
 * - `multiple` - Allow multiple options to be selected
 * - `renderSelected` - Custom render function for the selected options
 * - `loading` - Show a loading text
 * - `loadingText` - The text to display when loading
 */
export const Select = ({ options, className, style, disabled, readOnly, placeholder, size, multiple, required, renderSelected, loadingText, loading, value, defaultValue, onChange, icon, name, id, }) => {
    const controlled = value !== undefined;
    // capture selected state to display in the button
    const [selected, setSelected] = React.useState(() => {
        if (defaultValue || value) {
            const set = new Set(defaultValue || value);
            return options.filter(({ value: key }) => set.has(key));
        }
        return value || defaultValue || [];
    });
    const selectedEl = renderSelected ? (renderSelected({ selected })) : multiple ? (_jsx(_Fragment, { children: selected.map((sel) => {
            if (multiple)
                return (_jsx(Chip, { size: "sm", className: "bg-paper2!", children: sel.label }, sel.value));
            return _jsx("span", {}, sel.value);
        }) })) : (_jsx("span", { className: "truncate", children: selected[0]?.label }));
    const loadingEl = _jsx("span", { className: "text-t3 truncate", children: loadingText ?? "Loading..." });
    const placeholderEl = typeof placeholder === "string" ? _jsx("span", { className: "text-t3", children: placeholder }) : placeholder;
    React.useEffect(() => {
        if (value) {
            const set = new Set(value);
            setSelected(options.filter(({ value: key }) => set.has(key)));
        }
    }, [value, options]);
    return (_jsx("div", { className: select({ className, size }), style: style, onClick: (e) => e.stopPropagation(), children: _jsxs(Listbox, { value: selected, onChange: (options) => {
                // multiple is handled by the checkboxes exclusively
                if (multiple)
                    return;
                if (!controlled)
                    setSelected(options);
                onChange?.({ value: options.map(({ value }) => value), options: options });
            }, name: name, children: [_jsxs(ListboxButton, { disabled: loading || readOnly || disabled, className: selectButton({ size }), children: [_jsx(XScroll, { hideScrollbar: true, children: _jsx("div", { className: "w-full h-full box-border overflow-x-auto flex items-center gap-1.5", children: loading ? loadingEl : selected.length ? selectedEl : placeholderEl }) }), _jsx("span", { className: "absolute translate-y-[-50%] top-[50%] right-3 text-2 text-base", children: icon || _jsx(ChevronDownIcon, {}) })] }), _jsx(ListboxOptions, { anchor: "bottom", transition: true, className: clsx("shadow-sm bg-paper2 bg-opacity-100", "rounded-lg border border-white/5", "transition duration-100 ease-in data-leave:data-closed:opacity-0 focus:outline-hidden", "z-50 w-[var(--button-width)] p-1 [--anchor-gap:var(--spacing-1)]"), children: options.map((option) => {
                        const toggle = () => {
                            if (option.disabled)
                                return;
                            if (multiple) {
                                let newSelected;
                                const checked = selected.some(({ value: key }) => key === option.value);
                                if (checked) {
                                    newSelected = selected.filter(({ value: key }) => key !== option.value);
                                }
                                else {
                                    newSelected = [...selected, option];
                                }
                                if (!controlled) {
                                    setSelected(newSelected);
                                }
                                onChange?.({
                                    value: newSelected.map(({ value }) => value),
                                    options: newSelected,
                                });
                            }
                        };
                        return (_jsxs(ListboxOption, { disabled: option.disabled, onClick: (e) => {
                                if (multiple) {
                                    // prevents closing the dropdown
                                    e.preventDefault();
                                    toggle();
                                }
                            }, value: option, className: clsx("group flex gap-2.5 cursor-default items-center rounded-sm py-1.5 px-3 select-none data-focus:bg-paper3", disabled && "cursor-not-allowed"), children: [multiple && (_jsx(Checkbox, { defaultValue: option.defaultChecked, disabled: option.disabled, onClick: () => toggle(), value: selected.some(({ value: key }) => option.value === key) })), _jsx("span", { className: clsx("text-sm/6", option.disabled && "text-t3"), children: option.label })] }, option.value));
                    }) })] }) }));
};
