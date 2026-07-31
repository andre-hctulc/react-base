"use client";

import React, { type ComponentProps } from "react";
import { cn } from "@/util/cn.js";
import type { Choice } from "../../types/index.js";
import { HiddenInput } from "./hidden-input.js";
import type { IconLike } from "../icons/icon.js";
import type { InputLikeProps } from "./types.js";

export interface RadioRenderParams<V = string, D = any> {
    option: Choice<V, D>;
    active: boolean;
    readOnly: boolean;
    disabled: boolean;
    activate: () => void;
}

export interface RadioLikeProps<V = string, D = any>
    extends Omit<ComponentProps<"div">, keyof InputLikeProps>, InputLikeProps<V> {
    options: Choice<V, D>[];
    icon: IconLike;
    orientation?: "vertical" | "horizontal";
    renderOption: (option: RadioRenderParams<V, D>) => React.ReactNode;
}

/**
 * ### Props
 * - `options` - The options to display in the dropdown
 * - `renderOption` - Renders the options
 */
export const RadioLike = <V = string, D = any>(props: RadioLikeProps<V, D>) => {
    const {
        orientation,
        className,
        value,
        defaultValue,
        onChange,
        options,
        name,
        disabled,
        readOnly,
        renderOption,
        required,
        ...rootProps
    } = props;
    const controlled = value !== undefined;
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
            if (newOption) setSelected(newOption);
        }
    }, [value, options]);

    return (
        <div className={cn(orientation === "horizontal" && "flex gap-3", className)} {...rootProps}>
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
