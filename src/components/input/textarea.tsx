"use client";

import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import React from "react";
import type { TVCProps } from "../../types";
import type { InputLikeProps } from "./input";

const textarea = tv({
    base: [
        "transition block w-full rounded-lg border-none bg-3 py-1.5 px-3",
        "focus:outline-none focus:outline-2 focus:-outline-offset-2 focus:outline-divider",
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

interface TextareaProps
    extends Omit<TVCProps<typeof textarea, "textarea">, "defaultValue" | "value" | "onChange">,
        InputLikeProps<string, React.ChangeEvent<HTMLTextAreaElement>> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ size, className, style, name, required, defaultValue, value, onChange, ...props }, ref) => {
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
    }
);

Textarea.displayName = withPrefix("Textarea");
