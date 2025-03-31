"use client";

import { tv } from "tailwind-variants";
import React, { type FC } from "react";
import type { TVCProps } from "../../types/index.js";
import type { InputLikeProps } from "./types.js";

const textarea = tv({
    base: [
        "transition block w-full rounded-lg border-none bg-paper3 py-1.5 px-3",
        "focus:outline-hidden focus:outline-2 focus:-outline-offset-2 focus:outline-divider",
    ],
    variants: {
        size: {
            sm: "h-7 text-sm",
            md: "h-9 text-sm",
            lg: "h-20 text-sm",
            xl: "h-32 text-sm",
            "2xl": "h-44 text-sm",
        },
    },
    defaultVariants: {
        size: "lg",
    },
});

export interface TextareaProps
    extends Omit<TVCProps<typeof textarea, "textarea">, "defaultValue" | "value" | "onChange">,
        InputLikeProps<string, React.ChangeEvent<HTMLTextAreaElement>> {}

export const Textarea: FC<TextareaProps> = ({
    size,
    className,
    style,
    name,
    required,
    defaultValue,
    value,
    onChange,
    ref,
    ...props
}) => {
    return (
        <textarea
            required={required}
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            className={textarea({ size, className })}
            name={name}
            onChange={(e) => {
                onChange?.({ value: e.target.value, ...e });
            }}
            {...props}
        />
    );
};
