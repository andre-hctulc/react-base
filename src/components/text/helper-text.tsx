import { tv } from "tailwind-variants";
import React from "react";
import type { ELEMENT, RichAsProps, WithTVProps } from "../../types/index.js";

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
        disabled: {
            true: "text-t3",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

type HelperTextProps<T extends ELEMENT = "p"> = WithTVProps<
    RichAsProps<T> & {
        children?: React.ReactNode;
        as?: any;
    },
    typeof helperText
>;

export const HelperText = <T extends ELEMENT = "p">({
    children,
    className,
    italic,
    variant,
    as,
    ref,
    disabled,
    ...props
}: HelperTextProps<T>) => {
    const Comp: any = as || "p";

    return (
        <Comp ref={ref} className={helperText({ className, italic, variant, disabled })} {...props}>
            {children}
        </Comp>
    );
};
