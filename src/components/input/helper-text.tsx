import { tv } from "tailwind-variants";
import React, { type FC } from "react";
import type { TVCProps, StyleProps } from "../../types/index.js";

const helperText = tv({
    base: "",
    variants: {
        italic: {
            true: "italic",
        },
        variant: {
            default: "text-sm text-t2 leading-4",
            secondary: "text-xs text-t2 leading-4",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

interface HelperTextProps extends Omit<TVCProps<typeof helperText, "p">, "className">, StyleProps {
    children?: React.ReactNode;
    as?: any;
}

export const HelperText: FC<HelperTextProps> = ({
    children,
    className,
    italic,
    variant,
    as,
    ref,
    ...props
}) => {
    const Comp = as || "p";

    return (
        <Comp ref={ref} className={helperText({ className, italic, variant })} {...props}>
            {children}
        </Comp>
    );
};
