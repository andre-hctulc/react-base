import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import React from "react";
import type { TVCProps } from "../../types";

const label = tv({
    base: "",
    variants: {},
    defaultVariants: {},
});

interface LabelProps extends Omit<TVCProps<typeof label, "label">, "className"> {
    className?: ClassValue;
    children?: React.ReactNode;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <label ref={ref} className={label({ className })} {...props}>
                {children}
            </label>
        );
    }
);

Label.displayName = withPrefix("Label");
