"use client";

import { tv } from "tailwind-variants";
import React, { type FC } from "react";
import type { InputLikeProps } from "./types.js";
import type { PropsOf, WithTVProps } from "../../types/index.js";

const textarea = tv({
    base: ["transition block w-full rounded-lg py-1.5 px-3"],
    variants: {
        size: {
            sm: "h-7 text-sm",
            md: "h-9 text-sm",
            lg: "h-20 text-sm",
            xl: "h-32 text-sm",
            "2xl": "h-44 text-sm",
        },
        variant: {
            outlined: "border border-divider bg-paper focus:outline-2 focus:outline-divider",
            filled: "bg-paper2 border-none focus:outline-2 focus:outline-divider",
        },
    },
    defaultVariants: {
        size: "lg",
        variant: "filled",
    },
});

type TextareaProps = WithTVProps<
    PropsOf<"textarea"> & InputLikeProps<string, React.ChangeEvent<HTMLTextAreaElement>>,
    typeof textarea
>;

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
    variant,
    ...props
}) => {
    return (
        <textarea
            required={required}
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            className={textarea({ size, className, variant })}
            name={name}
            onChange={(e) => {
                onChange?.({ value: e.target.value, ...e });
            }}
            {...props}
        />
    );
};
