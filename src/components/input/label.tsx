import { tv, type ClassValue } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import React from "react";
import type { TVCProps } from "../../types";

const label = tv({
    base: "inline-block",
    variants: {
        variant: {
            plain: "",
            margin_sm: "mt-2 mb-1",
            margin: "mt-3 mb-2",
            margin_md: "mt-4 mb-3",
        },
        mb: {
            none: "mb-0",
            sm: "mb-1",
            md: "mb-2",
            lg: "mb-3",
        },
        mt: {
            none: "mt-0",
            sm: "mt-1",
            md: "mt-2",
            lg: "mt-3",
        },
    },
    defaultVariants: {
        variant: "margin",
    },
});

interface LabelProps extends Omit<TVCProps<typeof label, "label">, "className"> {
    className?: ClassValue;
    children?: React.ReactNode;
    requiredHint?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ children, className, requiredHint, variant, mb, mt, ...props }, ref) => {
        return (
            <label ref={ref} className={label({ className, variant, mb, mt })} {...props}>
                {children}
                {requiredHint && <span>{" *"}</span>}
            </label>
        );
    }
);

Label.displayName = withPrefix("Label");
