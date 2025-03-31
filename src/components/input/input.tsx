"use client";

import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types/index.js";
import { type ChangeEvent } from "react";
import type { InputLikeProps, InputValue } from "./types.js";
import { inputEventToValue } from "../../util/react.js";

const input = tv({
    base: [
        "block w-full rounded-lg border-none bg-paper3 py-1.5 px-3",
        "transition outline-0 focus:outline-2 focus:outline-divider",
    ],
    variants: {
        size: {
            sm: "h-7 text-sm",
            md: "h-9 text-sm",
            lg: "h-11 text-base",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export interface InputProps<T extends InputValue = string>
    extends Omit<
            TVCProps<typeof input, "input">,
            "defaultValue" | "value" | "onChange" | "checked" | "defaultChecked"
        >,
        InputLikeProps<T, ChangeEvent<HTMLInputElement>> {}

export const Input = <T extends InputValue = string>({
    size,
    className,
    style,
    type,
    name,
    required,
    defaultValue,
    value,
    onChange,
    ref,
    ...props
}: InputProps<T>) => {
    return (
        <input
            required={required}
            ref={ref}
            value={value as any}
            defaultValue={defaultValue as any}
            className={input({ size, className })}
            name={name}
            type={type}
            onChange={(e) => {
                onChange?.({ ...e, value: inputEventToValue(e, type || "text") });
            }}
            {...props}
        />
    );
};
