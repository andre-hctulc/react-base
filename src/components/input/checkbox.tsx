import { Checkbox as BaseCheckbox, Button as BaseButton } from "@headlessui/react";
import type { InputLikeProps } from "./input";

import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import React from "react";
import type { XStyleProps } from "../../types";

const checkbox = tv({
    base: "group rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white",
    variants: {
        size: {
            sm: "size-5 ",
            md: "size-6 ",
            lg: "size-8",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

interface CheckboxProps
    extends InputLikeProps<boolean>,
        VariantProps<typeof checkbox>,
        Omit<React.ComponentProps<typeof BaseCheckbox>, keyof InputLikeProps | "className" | "style">,
        XStyleProps {}

export const Checkbox: React.FC<CheckboxProps> = ({
    className,
    size,
    onChange,
    value,
    defaultValue,
    ...props
}) => {
    return (
        <BaseCheckbox
            checked={defaultValue}
            value={value}
            onChange={onChange}
            className={checkbox({ className, size })}
            {...props}
        >
            {"✓"}
        </BaseCheckbox>
    );
};
