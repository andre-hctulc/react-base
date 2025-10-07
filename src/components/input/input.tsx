"use client";

import { tv } from "tailwind-variants";
import { type ChangeEvent } from "react";
import type { InputLikeProps } from "./types.js";
import { inputEventToValue } from "../../util/react.js";
import type { PropsOf, WithTVProps } from "../../types/index.js";

const input = tv({
    base: ["block w-full rounded-lg py-1.5 px-3 transition outline-0"],
    variants: {
        size: {
            sm: "h-7 text-sm",
            md: "h-9 text-sm",
            lg: "h-11 text-base",
        },
        variant: {
            outlined: "border border-divider bg-paper focus:outline-2 focus:outline-divider",
            filled: "bg-paper2 border-none focus:outline-2 focus:outline-divider",
            ghost: "border-none focus:outline-0",
        },
    },
    defaultVariants: {
        size: "md",
        variant: "filled",
    },
});

export type InputProps<T = string> = WithTVProps<
    Omit<PropsOf<"input">, "defaultValue" | "value" | "onChange" | "checked" | "defaultChecked"> &
        InputLikeProps<T, ChangeEvent<HTMLInputElement>>,
    typeof input
>;

export const Input = <T = string,>({
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
    variant,
    ...props
}: InputProps<T>) => {
    return (
        <input
            required={required}
            ref={ref}
            value={value as any}
            defaultValue={defaultValue as any}
            className={input({ size, className, variant })}
            name={name}
            type={type}
            onChange={(e) => {
                onChange?.({ ...e, value: inputEventToValue(e, type || "text") });
            }}
            {...props}
        />
    );
};
