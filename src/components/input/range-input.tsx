"use client";

import { tv } from "tailwind-variants";
import React, { type FC } from "react";
import type { TVCProps } from "../../types/index.js";
import type { InputLikeProps } from "./types.js";

const rangeInput = tv({
    base: "",
    variants: {},
    defaultVariants: {},
});

interface RangeInputProps
    extends Omit<TVCProps<typeof rangeInput, "input">, "defaultValue" | "value" | "type" | "onChange">,
        InputLikeProps<number, React.ChangeEvent<HTMLInputElement>> {}

export const RangeInput: FC<RangeInputProps> = ({
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
        <input
            type="range"
            required={required}
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            className={rangeInput({ className })}
            name={name}
            onChange={(e) => {
                onChange?.({ value: e.target.valueAsNumber, ...e });
            }}
            {...props}
        />
    );
};
