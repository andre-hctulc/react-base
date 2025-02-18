import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const inputWidth = tv({
    base: "",
    variants: {
        variant: {
            none: "",
            auto: "w-auto",
            sm: "w-32",
            md: "w-44",
            lg: "w-56",
            grow: "grow",
            full: "w-full",
        },
    },
    defaultVariants: {
        variant: "none",
    },
});

interface InputWidthProps extends VariantProps<typeof inputWidth> {
    children: React.ReactElement<{ className?: string }>;
}

/**
 * Define consistent widths for input components.
 */
export const InputWidth: React.FC<InputWidthProps> = ({ variant, children }) => {
    return React.cloneElement(children, { className: inputWidth({ variant }) });
};
