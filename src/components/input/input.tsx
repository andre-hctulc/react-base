"use client";

import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import React from "react";
import type { TVCProps } from "../../types";

const input = tv({
    base: [
        "transition block w-full rounded-lg border-none bg-3 py-1.5 px-3",
        "focus:outline-none focus:outline-2 focus:-outline-offset-2 focus:outline-divider",
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

export interface InputLikeProps<T = any, E extends object = {}> {
    defaultValue?: T;
    value?: T;
    onChange?: (value: { value: T } & E) => void;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    id?: string;
}

interface InputProps
    extends Omit<
            TVCProps<typeof input, "input">,
            "defaultValue" | "value" | "onChange" | "checked" | "defaultChecked"
        >,
        InputLikeProps<string, React.ChangeEvent<HTMLInputElement>> {
    type?: "text" | "password" | "email" | "number" | "tel" | "url";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ size, className, style, type, name, required, defaultValue, value, onChange, ...props }, ref) => {
        return (
            <input
                required={required}
                ref={ref}
                value={value}
                defaultValue={defaultValue}
                className={input({ size, className })}
                name={name}
                type={type}
                onChange={(e) => {
                    onChange?.({ value: e.target.value, ...e });
                }}
                {...props}
            />
        );
    }
);

Input.displayName = withPrefix("Input");
